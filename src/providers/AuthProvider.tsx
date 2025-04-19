import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the user type
type GithubUser = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  stars: number;
  repositories: number;
};

type AuthContextType = {
  userg: GithubUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development
const mockUser: GithubUser = {
  id: "user123",
  name: "Jane Doe",
  username: "jane-dev",
  avatar: "https://github.com/ghost.png",
  bio: "Full-stack developer passionate about open source",
  followers: 120,
  following: 80,
  stars: 450,
  repositories: 32,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userg, setUserg] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUserg(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserg(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const logout = () => {
    setUserg(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userg, isAuthenticated: !!userg, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
