
import { useState } from "react";
import { Link } from "react-router-dom";
import { GitFork, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Toggle for mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:container md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GitFork className="h-6 w-6 text-accent mr-2" />
              <span className="text-lg font-semibold hidden sm:inline-block">OSContrib</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:items-center md:space-x-4">
              <Link to="/" className="text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
                    Profile
                  </Link>
                  <Link to="/contributions" className="text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
                    Contributions
                  </Link>
                  <Link to="/saved" className="text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
                    Saved Issues
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Right Side Elements */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="default" className="gap-2 hidden sm:flex">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <Button onClick={login} className="github-button gap-2">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline-block">Sign in with GitHub</span>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 animate-fade-in">
          <div className="space-y-1 px-4 py-3">
            <Link to="/" 
              className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" 
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link to="/profile" 
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link to="/contributions" 
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contributions
                </Link>
                <Link to="/saved" 
                  className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Saved Issues
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => {
                  login();
                  setIsOpen(false);
                }}
              >
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
