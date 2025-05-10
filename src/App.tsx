
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/landing" element={<Landing />} />
                
                {/* Route to handle the root - redirects to dashboard if authenticated, else to landing */}
                <Route path="/" element={
                  <ProtectedRoute fallback={<Landing />}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
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
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
