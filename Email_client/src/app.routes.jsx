import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protect from "./features/auth/components/Protect";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path:"/" , element:<Protect> <h1>Home page ...</h1> </Protect>  }
]);
