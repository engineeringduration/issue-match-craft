
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
