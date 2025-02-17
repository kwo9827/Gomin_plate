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
  const connectionTimeoutRef = useRef(null);
  const initialDelayTimeoutRef = useRef(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 10;

  const connectSSE = useCallback(async () => {
    if (retryCountRef.current >= MAX_RETRIES) {
      console.error(
        `SSE connection failed - exceeded maximum retries (${MAX_RETRIES})`
      );
      setIsConnected(false);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found for SSE connection");
      setIsConnected(false);
      return;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    try {
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

      // 이전 타임아웃 제거
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }

      connectionTimeoutRef.current = setTimeout(() => {
        // 연결이 아직 성공하지 않은 경우에만 타임아웃 처리
        if (es === eventSourceRef.current && es.readyState !== 1) {
          console.error("SSE initial connection timeout");
          if (es === eventSourceRef.current) {
            es.close();
            eventSourceRef.current = null;
          }
          setIsConnected(false);
          retryCountRef.current += 1;

          if (
            retryCountRef.current < MAX_RETRIES &&
            !reconnectTimeoutRef.current
          ) {
            console.log(
              `Retrying SSE connection (${retryCountRef.current}/${MAX_RETRIES})`
            );
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectTimeoutRef.current = null;
              connectSSE();
            }, 3000);
          }
        }
      }, 5000);

      es.addEventListener("notification", (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateHasUnread(data.hasUnread));
      });

      es.addEventListener("likeCount", (event) => {
        const data = JSON.parse(event.data);
        dispatch(updateLikesReceived(data.totalLikes));
      });

      es.addEventListener("shutdown", async () => {
        if (es === eventSourceRef.current) {
          setIsConnected(false);
          es.close();
          eventSourceRef.current = null;
        }

        const checkServerAndReconnect = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/health`
            );
            const health = await response.json();

            if (health.status === "UP") {
              window.location.reload();
            } else {
              setTimeout(checkServerAndReconnect, 1000);
            }
          } catch (error) {
            setTimeout(checkServerAndReconnect, 1000);
          }
        };

        setTimeout(checkServerAndReconnect, 5000);
      });

      es.onopen = () => {
        // 현재 이벤트 소스가 유효한 경우에만 연결 성공 처리
        if (es === eventSourceRef.current) {
          console.log("SSE connection successful");
          if (connectionTimeoutRef.current) {
            clearTimeout(connectionTimeoutRef.current);
            connectionTimeoutRef.current = null;
          }
          setIsConnected(true);
          retryCountRef.current = 0;
        }
      };

      es.onerror = () => {
        // 현재 이벤트 소스가 유효한 경우에만 에러 처리
        if (es === eventSourceRef.current) {
          console.error("SSE connection error");
          es.close();
          eventSourceRef.current = null;
          setIsConnected(false);
          retryCountRef.current += 1;

          if (
            retryCountRef.current < MAX_RETRIES &&
            !reconnectTimeoutRef.current
          ) {
            console.log(
              `Attempting SSE reconnection (${retryCountRef.current}/${MAX_RETRIES})`
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
      setIsConnected(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [dispatch]);

  useEffect(() => {
    initialDelayTimeoutRef.current = setTimeout(() => {
      connectSSE();
    }, initialDelay);

    return () => {
      retryCountRef.current = 0;
      setIsConnected(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
    };
  }, [connectSSE, initialDelay]);

  return isConnected;
};
