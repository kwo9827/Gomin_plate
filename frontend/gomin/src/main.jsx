import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Provider 임포트
import App from "./App.jsx";
import { store } from "./store/index.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {" "}
        {/* Redux Provider로 전체 앱 감싸기 */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
