import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { App } from "./App";
import { ErrorPage, Homepage } from "./Pages"
import { theme } from "./theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<><ColorModeScript initialColorMode={theme.config.initialColorMode} /><App /></>),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Homepage />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);