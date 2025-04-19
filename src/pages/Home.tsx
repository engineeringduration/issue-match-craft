import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { IssueCard, type Issue } from "@/components/dashboard/IssueCard";
import { BookOpen, GitFork, History, MessageSquare } from "lucide-react";

// Mock data - replace with real data from your API
const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Add dark mode support",
    repo: {
      name: "react-ui",
      owner: "acme",
      stars: 1200
    },
    tags: ["feature", "ui", "dark-mode"],
    matchScore: 95,
    createdAt: "2024-04-10T10:00:00Z",
    matchReasons: [
      "Matches your React experience",
      "Similar to your previous contributions",
      "Aligns with your interests in UI development"
    ],
    language: "TypeScript",
    experience: "intermediate"
  },
  {
    id: "2",
    title: "Fix memory leak in useEffect",
    repo: {
      name: "utils",
      owner: "acme",
      stars: 800
    },
    tags: ["bug", "hooks", "memory"],
    matchScore: 88,
    createdAt: "2024-04-12T15:30:00Z",
    matchReasons: [
      "Matches your React hooks expertise",
      "Similar to issues you've solved before",
      "Complexity level matches your profile"
    ],
    language: "JavaScript",
    experience: "advanced"
  },
  {
    id: "3",
    title: "Improve accessibility in Button component",
    repo: {
      name: "components",
      owner: "acme",
      stars: 2400
    },
    tags: ["accessibility", "a11y", "components"],
    matchScore: 92,
    createdAt: "2024-04-15T09:15:00Z",
    matchReasons: [
      "Matches your accessibility experience",
      "Aligns with your component library contributions",
      "Complexity level matches your profile"
    ],
    language: "TypeScript",
    experience: "intermediate"
  }
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <GitFork className="h-6 w-6 text-primary" />
            <span className="font-semibold">OSContrib</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}! 👋</h1>
            <p className="text-muted-foreground mt-1">Here are your top matched issues for today</p>
          </div>
        </div>
        
        {/* Issue Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
        
        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Recent Activity</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Issues viewed this week</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Contributions</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">PRs submitted this month</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">Match Score</h3>
            </div>
            <p className="mt-2 text-2xl font-bold">92%</p>
            <p className="text-sm text-muted-foreground">Average match accuracy</p>
          </div>
        </div>
      </main>
    </div>
  );
}
