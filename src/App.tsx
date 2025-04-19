import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Contributions from "./pages/Contributions";
import SavedIssues from "./pages/SavedIssues";
import StarredRepos from "./pages/StarredRepos";
import Home from './pages/Home';
import Issue from "./pages/Issue";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication status (e.g., via localStorage or any other method)
    const checkAuth = () => {
      const user = localStorage.getItem('user'); // or your custom authentication check
      setIsAuthenticated(user !== null); // assuming 'user' means the user is authenticated
    };

    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Route to Home if authenticated, else redirect to Landing */}
                <Route path="/" element={isAuthenticated ? < Dashboard  />:<Landing/>} />
                <Route path="/landing" element={<Landing />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/contributions" element={<Contributions />} />
                  <Route path="/saved" element={<SavedIssues />} />
                  <Route path="/starred" element={<StarredRepos />} />
                  <Route path="/issue" element={<Issue />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
