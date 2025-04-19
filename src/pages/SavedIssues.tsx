
import { useState } from "react";
import { Bookmark, ExternalLink, GitPullRequest, List, LayoutGrid, Tag, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/providers/AuthProvider";
import { ChatbotBubble } from "@/components/layout/ChatbotBubble";

// Mock saved issues data
const mockSavedIssues = [
  {
    id: "1",
    title: "Add dark mode support to dashboard components",
    repository: "react-ui-library",
    owner: "open-source-org",
    url: "#",
    labels: ["enhancement", "good first issue", "ui"],
    matchScore: 95,
    language: "TypeScript",
    createdAt: "2023-04-15",
  },
  {
    id: "2",
    title: "Fix pagination in data table component",
    repository: "react-components",
    owner: "ui-frameworks",
    url: "#",
    labels: ["bug", "priority", "needs-review"],
    matchScore: 87,
    language: "JavaScript",
    createdAt: "2023-04-12",
  },
  {
    id: "3",
    title: "Implement responsive design for mobile views",
    repository: "frontend-toolkit",
    owner: "web-devs",
    url: "#",
    labels: ["enhancement", "responsive", "mobile"],
    matchScore: 82,
    language: "CSS",
    createdAt: "2023-04-10",
  },
  {
    id: "4",
    title: "Create documentation for new API endpoints",
    repository: "api-docs",
    owner: "backend-tools",
    url: "#",
    labels: ["documentation", "good first issue"],
    matchScore: 79,
    language: "Markdown",
    createdAt: "2023-04-08",
  },
  {
    id: "5",
    title: "Optimize image loading performance",
    repository: "performance-utils",
    owner: "web-optimizers",
    url: "#",
    labels: ["performance", "optimization"],
    matchScore: 75,
    language: "JavaScript",
    createdAt: "2023-04-05",
  },
];

export default function SavedIssues() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter issues based on search query
  const filteredIssues = mockSavedIssues.filter(issue => 
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Saved Issues</h1>
            <p className="text-muted-foreground mt-1">
              GitHub issues you've saved for later contribution
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search saved issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Issues Grid/List */}
        {filteredIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved issues found</h3>
            <p className="text-muted-foreground max-w-md">
              {searchQuery ? "No issues match your search query. Try different keywords." : "You haven't saved any issues yet. Browse recommended issues to find ones that match your skills."}
            </p>
            <Button className="mt-6 github-button">
              Browse Recommended Issues
            </Button>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredIssues.map((issue) => (
              viewMode === "grid" ? (
                <IssueCard key={issue.id} issue={issue} />
              ) : (
                <IssueListItem key={issue.id} issue={issue} />
              )
            ))}
          </div>
        )}
      </div>
      
      <ChatbotBubble />
    </DashboardLayout>
  );
}

// Issue Card Component for Grid View
function IssueCard({ issue }: { issue: any }) {
  return (
    <Card className="github-card hover-scale">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            <span>{issue.owner}/</span>
            <span className="font-medium">{issue.repository}</span>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {issue.matchScore}% Match
          </Badge>
        </div>
        <CardTitle className="text-base line-clamp-2">{issue.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {issue.labels.map((label: string) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            {issue.language}
          </div>
          <span>Added {issue.createdAt}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="gap-1">
          <GitPullRequest className="h-3.5 w-3.5" />
          Contribute
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Issue List Item Component for List View
function IssueListItem({ issue }: { issue: any }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
          <span>{issue.owner}/</span>
          <span className="font-medium">{issue.repository}</span>
        </div>
        <h3 className="font-medium mb-2">{issue.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {issue.labels.map((label: string) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
        <Badge variant="outline" className="bg-primary/10">
          {issue.matchScore}% Match
        </Badge>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <GitPullRequest className="h-3.5 w-3.5" />
            Contribute
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
