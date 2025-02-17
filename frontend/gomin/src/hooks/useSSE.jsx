import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateHasUnread } from "../store/slices/notificationSlice";
import { updateLikesReceived } from "../store/slices/memberSlice";
import { EventSource } from "eventsource";

export const useSSE = (initialDelay = 3000) => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const initialDelayTimeoutRef = useRef(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 10;

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      console.log("Cleaning up SSE connection");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const connectSSE = useCallback(async () => {
    if (retryCountRef.current >= MAX_RETRIES) {
      console.error(
        `SSE connection failed - exceeded maximum retries (${MAX_RETRIES})`
      );
      cleanup();
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found for SSE connection");
      cleanup();
      return;
    }

    // 기존 연결이 있다면 정리
    if (eventSourceRef.current) {
      cleanup();
      // 연결 정리 후 약간의 지연
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
      console.log("Initiating new SSE connection");
      const es = new EventSource(
        `${import.meta.env.VITE_API_BASE_URL}/api/sse/subscribe`,
        {
          fetch: (input, init) =>
            fetch(input, {
              ...init,
              headers: {
                Authorization: `Bearer ${token}`,
                "Cache-Control": "no-cache",
              },
              credentials: "include",
            }),
        }
      );

      eventSourceRef.current = es;

      const handleNotification = (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateHasUnread(data.hasUnread));
      };

      const handleLikeCount = (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateLikesReceived(data.totalLikes));
      };

      const handleShutdown = async () => {
        cleanup();
        await new Promise((resolve) => setTimeout(resolve, 5000));

        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/health`
          );
          const health = await response.json();
          if (health.status === "UP") {
            window.location.reload();
          }
        } catch (error) {
          console.error("Health check failed:", error);
        }
      };

      es.addEventListener("notification", handleNotification);
      es.addEventListener("likeCount", handleLikeCount);
      es.addEventListener("shutdown", handleShutdown);

      es.onopen = () => {
        console.log("SSE connection successful");
        if (es === eventSourceRef.current) {
          // 현재 활성 연결인지 확인
          setIsConnected(true);
          retryCountRef.current = 0;
        }
      };

      es.onerror = (error) => {
        console.error("SSE connection error:", error);
        if (es === eventSourceRef.current) {
          // 현재 활성 연결인지 확인
          cleanup();

          // 이미 재연결이 예약되어 있지 않은 경우에만
          if (!reconnectTimeoutRef.current) {
            retryCountRef.current += 1;
            console.log(
              `Scheduling SSE reconnection (${retryCountRef.current}/${MAX_RETRIES})`
            );
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectTimeoutRef.current = null;
              connectSSE();
            }, 3000);
          }
        }
      };
    } catch (error) {
      console.error("Error creating EventSource:", error);
      cleanup();
      retryCountRef.current += 1;
    }
  }, [dispatch, cleanup]);

  useEffect(() => {
    console.log("Initializing SSE with delay:", initialDelay);
    initialDelayTimeoutRef.current = setTimeout(() => {
      connectSSE();
    }, initialDelay);

    return () => {
      console.log("Cleaning up SSE hook");
      cleanup();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
        initialDelayTimeoutRef.current = null;
      }
    };
  }, [connectSSE, initialDelay, cleanup]);

  return isConnected;
};
