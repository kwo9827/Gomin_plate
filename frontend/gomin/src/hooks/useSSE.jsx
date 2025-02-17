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
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 10;

  const connectSSE = useCallback(() => {
    console.log("connectSSE called, starting connection process...");

    if (retryCountRef.current >= MAX_RETRIES) {
      console.error(`SSE connection failed after ${MAX_RETRIES} retries`);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    console.log("Token found, length:", token.length);

    if (eventSourceRef.current) {
      console.log("Cleaning up existing connection");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }

    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/sse/subscribe`;
      console.log("Attempting to connect to:", url);

      const es = new EventSource(url, {
        fetch: (input, init) => {
          console.log("Fetch called with headers:", Object.keys(init.headers));
          return fetch(input, {
            ...init,
            headers: {
              Authorization: `Bearer ${token}`,
              "Cache-Control": "no-cache",
            },
            credentials: "include",
          });
        },
      });

      console.log("EventSource instance created");
      eventSourceRef.current = es;

      es.addEventListener("notification", (event) => {
        console.log("Notification event received");
        const data = JSON.parse(event.data);
        dispatch(updateHasUnread(data.hasUnread));
      });

      es.addEventListener("likeCount", (event) => {
        console.log("LikeCount event received");
        const data = JSON.parse(event.data);
        dispatch(updateLikesReceived(data.totalLikes));
      });

      es.addEventListener("shutdown", () => {
        console.log("Shutdown event received");
        setIsConnected(false);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        const checkServer = async () => {
          console.log("Checking server health");
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_BASE_URL}/api/health`
            );
            const health = await response.json();
            if (health.status === "UP") {
              console.log("Server is back up, reloading page");
              window.location.reload();
            } else {
              setTimeout(checkServer, 1000);
            }
          } catch (error) {
            console.log("Health check failed:", error);
            setTimeout(checkServer, 1000);
          }
        };

        setTimeout(checkServer, 5000);
      });

      es.onopen = () => {
        console.log("SSE connection opened successfully");
        setIsConnected(true); // 연결 성공하면 바로 상태 변경
        retryCountRef.current = 0;
      };

      es.onerror = (error) => {
        console.error("SSE connection error:", error);
        setIsConnected(false);

        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        if (!reconnectTimeoutRef.current) {
          retryCountRef.current += 1;
          console.log(
            `Scheduling reconnection attempt ${retryCountRef.current}/${MAX_RETRIES}`
          );
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connectSSE();
          }, 3000);
        }
      };
    } catch (error) {
      console.error("Error while setting up EventSource:", error);
      setIsConnected(false);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(
      `Setting up initial SSE connection with delay: ${initialDelay}ms`
    );

    const timer = setTimeout(() => {
      console.log("Initial delay completed, attempting connection");
      connectSSE();
    }, initialDelay);

    return () => {
      console.log("Cleaning up SSE hook");
      clearTimeout(timer);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [connectSSE, initialDelay]);

  useEffect(() => {
    console.log("Connection status changed:", isConnected);
  }, [isConnected]);

  return isConnected;
};
