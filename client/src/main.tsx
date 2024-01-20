import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";

//root element will be inside index.html - all of our React code will complied as html and attached inside root
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDom.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
