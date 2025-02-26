import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function detectBrowserEnvironment() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isWKWebView = window.webkit && window.webkit.messageHandlers;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isKakaoTalk = /KAKAOTALK/i.test(ua);
  const isNaver = /NAVER\(inapp/i.test(ua);
  const isInstagram = /Instagram/i.test(ua);
  const isFacebook = /FBAN|FBAV/i.test(ua);
  const isLine = /Line/i.test(ua);
  const isStandalone = window.navigator.standalone === true;
  let isIOSInAppBrowser = false;
  if (isIOS) {
    isIOSInAppBrowser =
      isWKWebView ||
      isKakaoTalk ||
      isNaver ||
      isInstagram ||
      isFacebook ||
      isLine ||
      (!isSafari && !isStandalone);
  }
  return isIOSInAppBrowser;
}

let app, messaging;
if (!detectBrowserEnvironment()) {
  app = initializeApp(firebaseConfig);
  messaging = typeof window !== "undefined" ? getMessaging(app) : null;
} else {
  console.log(
    "iOS 인앱 브라우저에서는 Firebase Messaging을 초기화하지 않습니다."
  );
  messaging = null;
}

export { messaging };
