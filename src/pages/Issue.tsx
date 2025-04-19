import { useState } from "react";
import {
  BellRing,
  Filter,
  GitMerge,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Search as SearchIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatbotBubble } from "@/components/layout/ChatbotBubble";
import { IssueCard, Issue } from "@/components/dashboard/IssueCard";
import { mockIssues } from "@/components/dashboard/IssueGrid";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredIssues = mockIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
 
    <div className="min-h-screen bg-background flex">
    <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

    <div className="flex flex-col flex-1">
      <DashboardHeader />

      {/* Top Search and Filter Section */}
      {/* <div className="border-b border-border/40 sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex w-full items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                {/* <Filter className="h-4 w-4" /> */}
              {/* </Button> */} 

              

              {/* <div className="border-l border-border h-6 mx-1 hidden md:block" /> */}

              {/* <div className="flex bg-muted/40 p-0.5 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setViewMode('list')}
                  >
                  <List className="h-4 w-4" />
                </Button>
      //         </div> */}
      {/* //       </div>
      //     </div> */}
      {/* //   </div>
      // </div> */}

      {/* Main Issue Section */}
      <main className="flex-1">
        <div className="container py-8 px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold tracking-tight">
                Recommended Issues
              </h1>
              <Badge variant="outline">{filteredIssues.length} matches</Badge>
            </div>
            <p className="text-muted-foreground">
              Based on your skills, these issues might be a good fit for you.
            </p>
          </div>

          {filteredIssues.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredIssues.map((issue: Issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No issues found.</p>
          )}
        </div>
      </main>
    </div>

    <ChatbotBubble />
  </div>
);
}