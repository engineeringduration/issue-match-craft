
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitMerge, GitPullRequest, Star } from "lucide-react";
import { IssueGrid } from "@/components/dashboard/IssueGrid";
import { ChatbotBubble } from "@/components/layout/ChatbotBubble";

// Mock contribution data
const contributionData = [
  { day: '2023-01-01', count: 4 },
  { day: '2023-01-02', count: 1 },
  { day: '2023-01-03', count: 0 },
  { day: '2023-01-04', count: 2 },
  { day: '2023-01-05', count: 5 },
  // Add more data as needed
];

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{user.bio || "No bio available"}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{user.repositories}</span>
                  <span className="text-xs text-muted-foreground">Repositories</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{user.stars}</span>
                  <span className="text-xs text-muted-foreground">Stars</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{user.followers}</span>
                  <span className="text-xs text-muted-foreground">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{user.following}</span>
                  <span className="text-xs text-muted-foreground">Following</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contributions</CardTitle>
              <GitCommit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">Contributions in the last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Open PRs across all repositories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <GitMerge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Issues contributed to</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Matched Issues Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Recommended Issues for You</h2>
          <IssueGrid />
        </div>
      </div>
      
      <ChatbotBubble />
    </DashboardLayout>
  );
}
