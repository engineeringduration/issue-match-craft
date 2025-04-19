
import { Link } from "react-router-dom";
import { Bell, GitPullRequest, Plus, Search } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
        {/* Logo and Primary Navigation */}
        <div className="flex items-center space-x-6 mr-6">
          <Link to="/dashboard" className="font-semibold text-lg flex items-center gap-2">
            <GitPullRequest className="h-5 w-5 text-primary" />
            <span>Issue Match</span>
          </Link>
          
          {/* Main Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/dashboard" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Dashboard</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">View your personalized dashboard</p>
                    </Link>
                    <Link to="/contributions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Contributions</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Track your open source activity</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/starred" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Starred</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">View your starred repositories</p>
                    </Link>
                    <Link to="/saved" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Saved Issues</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Browse your saved issues</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 flex gap-x-4">
          <div className="w-full max-w-lg relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search issues..."
              className="pl-10 h-9 w-full bg-muted/40"
            />
          </div>
        </div>
        
        {/* Action Items */}
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Issue</span>
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <img 
                src={user?.avatar} 
                alt={user?.name} 
                className="h-6 w-6 rounded-full"
              />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
