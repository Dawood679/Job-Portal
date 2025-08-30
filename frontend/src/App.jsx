import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Button } from "./components/ui/button";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import AdminJobs   from "../src/components/admin/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import Jobdescription from "./components/Jobdescription";
import Campanies from "./components/admin/Campanies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import Postjob from "./components/admin/Postjob";
import Applicants from "./components/admin/Applicants";
import ProtecetedRoute from "./components/admin/ProtecetedRoute";

const App = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Home></Home> },
    { path: "/login", element: <Login></Login> },
    { path: "/signup", element: <Signup></Signup> },
    {
      path: "/jobs",
      element: <Jobs></Jobs>,
    },
    {
      path: "/browse",
      element: <Browse></Browse>,
    },
    {
      path: "/profile",
      element: <Profile></Profile>,
    },
    {
      path: "/description/:id",
      element: <Jobdescription></Jobdescription>,
    },

    // admin k liye hn ye
    {
      path: "/admin/companies",
      element:<ProtecetedRoute><Campanies></Campanies></ProtecetedRoute> ,
    },
    {
      path: "/admin/companies/create",
      element:<ProtecetedRoute><CompanyCreate></CompanyCreate></ProtecetedRoute> ,
    },
    {
      path: "/admin/companies/:id",
      element:<ProtecetedRoute><CompanySetup></CompanySetup></ProtecetedRoute> ,
    },
    {
      path: "/admin/jobs",
      element:<ProtecetedRoute><AdminJobs></AdminJobs></ProtecetedRoute> ,
    },
    {
      path: "/admin/job/post",
      element:<ProtecetedRoute><Postjob></Postjob></ProtecetedRoute> ,
    },
    {
      path: "/admin/jobs/:id/applicants",
      element:<ProtecetedRoute><Applicants></Applicants></ProtecetedRoute> ,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default App;
