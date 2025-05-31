import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./pages/Homepage.jsx";
import Roompage from "./pages/Roompage.jsx";
import { StrictMode } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/ui/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Homepage />
      </Layout>
    ),
  },
  {
    path: "/room/:roomId",
    element: (
      <Layout>
        <Roompage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <h1>404 Not Found</h1>
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
