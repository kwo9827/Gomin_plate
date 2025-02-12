import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateHasUnread } from '../store/slices/notificationSlice';
import { EventSource } from 'eventsource';

export const useNotificationSSE = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectSSE = useCallback(async () => {
    // 기존 연결이 있다면 정리
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      // 연결 해제가 완료될 때까지 짧게 대기
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const token = localStorage.getItem("accessToken");
    
    eventSourceRef.current = new EventSource(
      `${import.meta.env.VITE_API_BASE_URL}/api/notification/subscribe`,
      {
        fetch: (input, init) => fetch(input, {
          ...init,
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
          credentials: 'include'
        })
      }
    );

    eventSourceRef.current.addEventListener('notification', (event) => {
      const data = JSON.parse(event.data);
      // console.log("알림 수신: ", data.hasUnread);
      dispatch(updateHasUnread(data.hasUnread));
    });

    eventSourceRef.current.addEventListener('shutdown', (event) => {
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
          // 서버가 아직 준비되지 않은 경우
          setTimeout(checkServerAndReconnect, 1000);
        }
      };
    
      setTimeout(checkServerAndReconnect, 5000);
    });

    eventSourceRef.current.onopen = () => {
      console.log('SSE 연결 성공');
    };

    // eventSourceRef.current.addEventListener('heartbeat', (event) => {
    //   console.log('알림 Heartbeat received:', event.data);
    // });

    eventSourceRef.current.onerror = (error) => {
      // console.error('알림 SSE Error:', error);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      // 재연결 시도
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
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
    };
  }, [connectSSE]);
};