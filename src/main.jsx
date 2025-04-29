import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/_auth/SignUp.jsx";
import Login from "./pages/_auth/Login.jsx";
import Home from "./pages/_root/Home.jsx";
import Recovery from "./pages/_auth/Recovery.jsx";
import GlobalContext from "./components/context/GlobalContext.jsx";
import EditProfile from "./pages/_root/EditProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <SignUp />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/recovery",
        element: <Recovery />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GlobalContext>
    <RouterProvider router={router} />
  </GlobalContext>
);
