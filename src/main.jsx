import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import App from "./App.jsx";

/**
 * Render app
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Register Service Worker (PWA)
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // ⚠️ uniquement en production
    if (import.meta.env.PROD) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("✅ Service Worker enregistré");
        })
        .catch((err) => {
          console.error("❌ Erreur Service Worker :", err);
        });
    } else {
      console.log("ℹ️ Service Worker désactivé en dev");
    }
  });
}