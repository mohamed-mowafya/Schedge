import "./App.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import HomePage from "./routes/home";
import RootLayout from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />;
    </MantineProvider>
  );
};

export default App;
