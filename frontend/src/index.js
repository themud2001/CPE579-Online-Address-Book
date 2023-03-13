import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/App";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { store } from "./store";

// Find an element to render the application on
const element = document.getElementById("root");

// Create a root element to use it to render the application
const root = createRoot(element);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "signin",
                element: <SignIn />
            }
        ]
    }
]);

// Render the application
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);