import Cookies from "js-cookie";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Builder,
  ChannelPartner,
  ChannelPartnerDetails,
  Clients,
  Dashboard,
  Leads,
  Login,
  MyProfile,
  NotFound,
  Notifications,
  Projects,
  ProjectsDetails,
  Users,
  Team,
  Content,
  Integration,
} from "../Pages/Exports";
import Layout from "../Layout/Layout";

// Check if user is authenticated
const isAuthenticated = () => {
  const accessToken = Cookies.get("access_token");
  return accessToken ? true : false;
};

// Check if the user is an admin
const isAdmin = () => {
  return Cookies.get("user_type") === "admin";
};

// Check if the user is a channel partner
const isChannelPartner = () => {
  return Cookies.get("user_type") === "channelpartner";
};

// Protected Route Component to manage authentication and role-based access
const ProtectedRoute = ({ component, componentType }: any) => {
  const isAuth = isAuthenticated();
  const userIsAdmin = isAdmin();
  const userIsChannelPartner = isChannelPartner();

  const channelPartnerRoutes = ["clients", "team", "content", "integration"];

  if (isAuth) {
    if (componentType === "login") {
      return <Navigate to="/clients" replace />;
    }

    if (userIsAdmin) {
      // Admin can access all routes
      return component;
    }

    if (userIsChannelPartner) {
      // Channel partner has restricted access
      if (channelPartnerRoutes.includes(componentType)) {
        return component;
      } else {
        // Redirect channel partner to /clients if accessing restricted routes
        return <Navigate to="/clients" replace />;
      }
    }

    // Non-channel partner and non-admin users are redirected to /clients
    return <Navigate to="/clients" replace />;
  } else {
    // User is not authenticated
    Cookies.remove("access_token");
    localStorage.clear();
    if (componentType === "login") {
      return component;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
};

// Define routes for the app
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <NotFound />, // Custom 404 page
  },
  {
    path: "/login",
    element: <ProtectedRoute componentType={"login"} component={<Login />} />,
  },
  {
    element: <Layout />, // Common layout for all pages
    children: [
      {
        path: "/dashboard",
        element: <ProtectedRoute componentType={"admin_dashboard"} component={<Dashboard />} />,
      },
      {
        path: "/clients",
        element: <ProtectedRoute componentType={"clients"} component={<Clients />} />,
      },
      {
        path: "/clients/:type",
        element: <ProtectedRoute componentType={"clients"} component={<Clients />} />,
      },

      {
        path: "/leads",
        element: <ProtectedRoute componentType={"leads"} component={<Leads />} />,
      },
      {
        path: "/builders",
        element: <ProtectedRoute componentType={"builders"} component={<Builder />} />,
      },
      {
        path: "/projects",
        element: <ProtectedRoute componentType={"projects"} component={<Projects />} />,
      },
      {
        path: "/projects/:id",
        element: <ProtectedRoute componentType={"projects_details"} component={<ProjectsDetails />} />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute componentType={"profile"} component={<MyProfile />} />,
      },
      {
        path: "/channelpartner",
        element: <ProtectedRoute componentType={"channelpartner"} component={<ChannelPartner />} />,
      },
      {
        path: "/channelpartner/:id",
        element: <ProtectedRoute componentType={"channelpartner_details"} component={<ChannelPartnerDetails />} />,
      },
      {
        path: "/notifications",
        element: <ProtectedRoute componentType={"admin_notifications"} component={<Notifications />} />,
      },
      // Admin-Only Routes
      {
        path: "/users",
        element: <ProtectedRoute componentType={"admin_users"} component={<Users />} />,
      },
      // Channel Partner-Specific Routes
      {
        path: "/team",
        element: <ProtectedRoute componentType={"team"} component={<Team />} />,
      },
      {
        path: "/content",
        element: <ProtectedRoute componentType={"content"} component={<Content />} />,
      },
      {
        path: "/content/:type",
        element: <ProtectedRoute componentType={"content"} component={<Content />} />,
      },
      {
        path: "/integrations",
        element: <ProtectedRoute componentType={"integration"} component={<Integration />} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Catch-all for undefined routes
  },
]);

export default router;
