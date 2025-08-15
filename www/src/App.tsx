import "./App.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import HomePage from "./routes/home";
import RootLayout from "./routes/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import CalendarPage from "./components/CalendarPage";
import './calendar-tailwind.css';

const queryClient = new QueryClient();

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
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
  {
    path: "/calendar",
    element: <RootLayout />,
    children: [
      { path: ":session_uuid", element: <CalendarPage /> },
    ],
  }
]);

const App = () => {
  return (
    <MantineProvider>
      <ToastContainer />
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </MantineProvider>
  );
};

export default App;
