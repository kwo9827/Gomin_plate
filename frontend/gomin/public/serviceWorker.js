// src/serviceWorker.js
const CACHE_VERSION = (new Date()).toISOString().slice(0, 10); // 날짜 기반 버전 (매일 캐시 갱신)
const CACHE_NAME = `pwa-cache-${CACHE_VERSION}`;
const urlsToCache = ["/", "/index.html"];

// 설치 단계 - 캐시 생성 및 파일 저장
self.addEventListener("install", (event) => {
  console.log('Service Worker installing...');
  
  // 새 서비스 워커가 즉시 활성화되도록 함
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// 활성화 단계 - 이전 캐시 삭제
self.addEventListener("activate", (event) => {
  console.log('Service Worker activating...');
  
  // 활성화 즉시 모든 페이지 제어
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // 현재 버전의 캐시를 제외한 모든 이전 캐시 삭제
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 가로채기
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // 네트워크 우선 전략(Network First)으로 변경
    fetch(event.request)
      .then((response) => {
        // 성공적인 응답만 캐시에 저장
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            console.log('Caching new resource:', event.request.url);
            cache.put(event.request, responseToCache);
          });
          
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 제공
        console.log('Fetching from cache:', event.request.url);
        return caches.match(event.request);
      })
  );
});

// 메시지 수신 - 클라이언트에서 메시지로 강제 업데이트 가능
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Skip waiting and activate immediately');
    self.skipWaiting();
  }
});