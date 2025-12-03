import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";
import "./index.css";
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopProvider>
      <App />
    </ShopProvider>
  </BrowserRouter>
);
