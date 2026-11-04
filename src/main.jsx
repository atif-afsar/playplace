import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Enables scroll-reveal styles only when JS is running (content stays visible otherwise).
document.documentElement.classList.add("js-reveal");

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs) → hydrate that HTML.
// In `npm run dev` the root is empty → render normally.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
