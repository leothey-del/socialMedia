import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Blog from "../pages/Blog";
import Post from "../pages/Post";
import Feed from "../pages/Feed";
import Login from "../pages/Login"; // Import your LoginPage component
import MyFeed from "../pages/MyFeed";
import SinglePost from "../pages/SinglePost";

// ProtectedRoute component to handle the redirect logic
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken"); // Check login status (example with localStorage)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route for login */}
      <Route path={"/login"} element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/project"
        element={
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        }
      />

      <Route
        path="/myfeed"
        element={
          <ProtectedRoute>
            <MyFeed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post/:id"
        element={
          <ProtectedRoute>
            <SinglePost />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route to redirect everything to /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
