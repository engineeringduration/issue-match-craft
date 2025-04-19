
import { Bell, GitPullRequest, Plus } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";

export const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="container flex h-16 items-center px-4">
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
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
