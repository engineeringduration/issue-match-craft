
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import { 
  BookOpen, 
  GitFork, 
  Home, 
  LogOut, 
  Bookmark, 
  User, 
  GitCommit,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <GitFork className="h-6 w-6 text-primary" />
          <span className="font-semibold">OSContrib</span>
        </Link>

        <div className="flex flex-col items-center mb-6 pt-2">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col items-center p-2 rounded-md bg-muted/40">
            <span className="text-lg font-semibold">{user.followers}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-md bg-muted/40">
            <span className="text-lg font-semibold">{user.repositories}</span>
            <span className="text-xs text-muted-foreground">Repos</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          <li>
            <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/contributions" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <GitCommit className="h-5 w-5" />
              <span>Contributions</span>
            </Link>
          </li>
          <li>
            <Link to="/contributions" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <GitCommit className="h-5 w-5" />
              <span>Recommanded Issues</span>
            </Link>
          </li>
          <li>
            <Link to="/saved" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <Bookmark className="h-5 w-5" />
              <span>Saved Issues</span>
            </Link>
          </li>
          <li>
            <Link to="/starred" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50 text-foreground/80 hover:text-foreground transition-colors">
              <Star className="h-5 w-5" />
              <span>Starred Repos</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
