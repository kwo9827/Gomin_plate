import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateHasUnread } from '../store/slices/notificationSlice';
import { EventSource } from 'eventsource';

export const useNotificationSSE = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
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
      console.log("알림 수신: ", data.hasUnread);
      dispatch(updateHasUnread(data.hasUnread));
    });

    eventSourceRef.current.addEventListener('hhhhh', (event) => {
      console.log('알림 Heartbeat received:', event.data);
    });

    eventSourceRef.current.onopen = () => {
      console.log('SSE 연결 성공');
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('SSE Error:', error.message, 'Code:', error.code);
      
      // 인증 에러 처리
      if (error.code === 401 || error.code === 403) {
        console.log('Authentication failed, attempting to reconnect...');
      }

      eventSourceRef.current.close();
      eventSourceRef.current = null;

      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('SSE 재연결 시도...');
          connectSSE();
          reconnectTimeoutRef.current = null;
        }, 3000);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    connectSSE();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('페이지 포커스 감지, SSE 재연결 시도');
        connectSSE();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connectSSE]);
};