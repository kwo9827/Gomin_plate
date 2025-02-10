import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateLikesReceived } from '../store/slices/memberSlice';
import { EventSource } from 'eventsource';

export const useLikeCountSSE = () => {
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
      `${import.meta.env.VITE_API_BASE_URL}/api/user/my-like/subscribe`,
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

    eventSourceRef.current.addEventListener('likeCount', (event) => {
      const data = JSON.parse(event.data);
      console.log("좋아요 수신: ", data.totalLikes);
      dispatch(updateLikesReceived(data.totalLikes));
    });

    eventSourceRef.current.addEventListener('hhhhh', (event) => {
      console.log('좋아요 Heartbeat received:', event.data);
    });

    eventSourceRef.current.onopen = () => {
      console.log('좋아요 SSE 연결 성공');
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('좋아요 SSE Error:', error.message, 'Code:', error.code);
      
      if (error.code === 401 || error.code === 403) {
        console.log('Authentication failed, attempting to reconnect...');
      }

      eventSourceRef.current.close();
      eventSourceRef.current = null;

      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('좋아요 SSE 재연결 시도...');
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
        console.log('페이지 포커스 감지, 좋아요 SSE 재연결 시도');
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