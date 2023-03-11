import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

// Find an element to render the application on
const element = document.getElementById("root");

// Create a root element to use it to render the application
const root = ReactDOM.createRoot(element);

// Render the application
root.render(<App />);