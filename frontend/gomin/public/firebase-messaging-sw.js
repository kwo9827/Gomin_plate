// importScripts(
//   "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
// );

// // Firebase 초기화
// firebase.initializeApp({
//   apiKey: "AIzaSyA9el-mfOMSicZC-vCFqmkLRa05IjsBdok",
//   authDomain: "gomination-670fd.firebaseapp.com",
//   projectId: "gomination-670fd",
//   storageBucket: "gomination-670fd.firebasestorage.app",
//   messagingSenderId: "160751898514",
//   appId: "1:160751898514:web:49e535605e12e559a0fb4b",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: "/pushlogo.png",
//     data: {
//       url: payload.data.url || "https://www.gomin.my/", // 기본값으로 메인 페이지 URL 설정
//     },
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // 알림 클릭 이벤트 처리 추가
// self.addEventListener("notificationclick", (event) => {
//   event.notification.close(); // 알림 닫기

//   // 클릭 시 해당 URL로 이동
//   const urlToOpen = event.notification.data.url;

//   // 이미 열린 탭이 있는지 확인하고, 없으면 새 탭 열기
//   event.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//         includeUncontrolled: true,
//       })
//       .then((windowClients) => {
//         // 이미 열린 탭이 있는지 확인
//         for (let client of windowClients) {
//           if (client.url === urlToOpen && "focus" in client) {
//             return client.focus();
//           }
//         }
//         // 열린 탭이 없으면 새 탭 열기
//         if (clients.openWindow) {
//           return clients.openWindow(urlToOpen);
//         }
//       })
//   );
// });

// firebase-messaging-sw.js

// 먼저 iOS 인앱브라우저 체크 함수
const isIOSInAppBrowser = () => {
  // Service Worker 컨텍스트에서는 navigator.userAgent 대신 self.navigator.userAgent 사용
  const ua = self.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isInApp = /kakaotalk|instagram|naver\(inapp|fb(ios|an)/.test(ua);
  return isIOS && isInApp;
};

// iOS 인앱브라우저가 아닐 때만 Firebase 초기화
if (!isIOSInAppBrowser()) {
  importScripts(
    "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
    "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
  );

  firebase.initializeApp({
    apiKey: "AIzaSyA9el-mfOMSicZC-vCFqmkLRa05IjsBdok",
    authDomain: "gomination-670fd.firebaseapp.com",
    projectId: "gomination-670fd",
    storageBucket: "gomination-670fd.firebasestorage.app",
    messagingSenderId: "160751898514",
    appId: "1:160751898514:web:49e535605e12e559a0fb4b",
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "/pushlogo.png",
      data: {
        url: payload.data.url || "https://www.gomin.my/",
      },
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
      clients
        .matchAll({
          type: "window",
          includeUncontrolled: true,
        })
        .then((windowClients) => {
          for (let client of windowClients) {
            if (client.url === urlToOpen && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  });
}

// PWA 캐싱 기능은 모든 브라우저에서 실행
const CACHE_NAME = "pwa-cache-v10";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
