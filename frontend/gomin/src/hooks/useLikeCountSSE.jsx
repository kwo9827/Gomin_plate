import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateLikesReceived } from '../store/slices/memberSlice';
import { EventSource } from 'eventsource';

export const useLikeCountSSE = () => {
  const dispatch = useDispatch();
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectSSE = useCallback(async () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      // 연결 해제가 완료될 때까지 짧게 대기
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      dispatch(updateLikesReceived(data.totalLikes));
    });

    // eventSourceRef.current.addEventListener('heartbeat', (event) => {
    //   console.log('좋아요 Heartbeat received:', event.data);
    // });

    eventSourceRef.current.onopen = () => {
      // console.log('좋아요 SSE 연결 성공');
    };

    eventSourceRef.current.onerror = (error) => {
      // console.error('좋아요 SSE Error:', error);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connectSSE();
          reconnectTimeoutRef.current = null;
        }, 3000);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    connectSSE();

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