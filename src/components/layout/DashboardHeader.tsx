
import { Link } from "react-router-dom";
import { Bell, GitPullRequest, Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";

export const DashboardHeader = () => {
  const { user } = useAuth();

  // TODO: GitHub API Integration Point
  // This component should fetch:
  // - User profile: GET /user
  // - User notifications: GET /notifications
  // - Pull requests: GET /user/pulls

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-6 mr-6">
          <Link to="/dashboard" className="font-semibold text-lg">
            Dashboard
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
            <Link to="/contributions" className="text-muted-foreground hover:text-foreground transition-colors">
              Contributions
            </Link>
            <Link to="/starred" className="text-muted-foreground hover:text-foreground transition-colors">
              Starred
            </Link>
            <Link to="/saved" className="text-muted-foreground hover:text-foreground transition-colors">
              Saved Issues
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 flex gap-x-4">
          <Input
            type="search"
            placeholder="Search issues..."
            className="w-[260px] h-9 md:w-[300px] lg:w-[400px] bg-muted/40"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <GitPullRequest className="h-5 w-5" />
          </Button>
          <NotificationDropdown />
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
