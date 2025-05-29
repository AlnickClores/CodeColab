import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./pages/Homepage.jsx";
import Roompage from "./pages/Roompage.jsx";
import { StrictMode } from "react";
import { ThemeProvider } from "./context/ThemeContext";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/room", element: <Roompage /> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
