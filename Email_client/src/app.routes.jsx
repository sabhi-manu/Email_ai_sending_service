import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protect from "./features/auth/components/Protect";
import Home from "./features/interviewReport/pages/ReportAi";
import Interview from "./features/interviewReport/pages/Interview";
import HomePage from "./features/home/pages/HomePage";
import JobApply from "./features/job apply/pages/JobApply";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path:"/ai-reports" , element:<Protect><Home /></Protect>  },
 
  {path:`/interview/:interviewId`, element:<Protect><Interview/></Protect>},
  {path:"/", element:<Protect><HomePage/></Protect> },
  {path:"/job-apply", element:<Protect><JobApply/></Protect>},
  {path:"*" , element: <h1>404 Not Found</h1>}
]);
