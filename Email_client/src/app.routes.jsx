import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protect from "./features/auth/components/Protect";
import Home from "./features/interviewReport/pages/Home";
import Interview from "./features/interviewReport/pages/Interview";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path:"/" , element: <Home />  },
  // { path:"/" , element:<Protect> <Home /> </Protect>  },
  {path:`/interview/:interviewId`, element:<Interview/>}
]);
