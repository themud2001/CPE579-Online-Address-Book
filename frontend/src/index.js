import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import App from "./components/App";
import { store } from "./store";

import "./custom.scss";

// Find an element to render the application on
const element = document.getElementById("root");

// Create a root element to use it to render the application
const root = createRoot(element);

// Render the application
root.render(
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider>
);