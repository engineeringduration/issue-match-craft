
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <Navigate to="/landing" replace /> 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If authenticated, render the children or outlet
  if (isAuthenticated) {
    return children ? <>{children}</> : <Outlet />;
  }
  
  // Not authenticated, render the fallback
  return <>{fallback}</>;
};
