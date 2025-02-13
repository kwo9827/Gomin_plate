import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateHasUnread } from "../store/slices/notificationSlice";
import { updateLikesReceived } from "../store/slices/memberSlice";
import { EventSource } from "eventsource";

export const useSSE = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const connectionTimeoutRef = useRef(null);

  const connectSSE = useCallback(async () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const token = localStorage.getItem("accessToken");

    eventSourceRef.current = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/api/sse/subscribe`, {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
          credentials: "include",
        }),
    });

    // 초기 연결 타임아웃 체크 추가
    connectionTimeoutRef.current = setTimeout(() => {
      if (!eventSourceRef.current || eventSourceRef.current.readyState !== 1) {
        console.error("SSE 초기 연결 실패 - 타임아웃");
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        // 이미 재연결이 예약되어 있지 않은 경우에만 재연결 (onError에서 재연결 예약할 수도 있음)
        if (!reconnectTimeoutRef.current) {
          console.log("초기 연결 실패로 인한 sse 재연결 시도");
          connectSSE();
        }
      }
    }, 5000);

    // 알림 이벤트 리스너
    eventSourceRef.current.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateHasUnread(data.hasUnread));
    });

    // 좋아요 카운트 이벤트 리스너
    eventSourceRef.current.addEventListener("likeCount", (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateLikesReceived(data.totalLikes));
    });

    // 서버 셧다운 이벤트 처리
    eventSourceRef.current.addEventListener("shutdown", (event) => {
      eventSourceRef.current.close();

      const checkServerAndReconnect = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/health`);
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

    // 연결 시
    eventSourceRef.current.onopen = () => {
      console.log("SSE 연결 성공");
    };

    // 연결 에러 시
    eventSourceRef.current.onerror = (error) => {
      console.error("SSE 에러발생");
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("SSE 재연결 시도");
          connectSSE();
          reconnectTimeoutRef.current = null;
        }, 3000);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    connectSSE().catch(console.error);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef);
      }
    };
  }, [connectSSE]);
};
