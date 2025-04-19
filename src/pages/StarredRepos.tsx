
import { useAuth } from "@/providers/AuthProvider";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, GitFork, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StarredRepos() {
  const { user } = useAuth();
  
  // Mock data for starred repos - replace with actual API data later
  const starredRepos = [
    {
      id: 1,
      name: "react",
      description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      stars: 203000,
      forks: 42300,
      watchers: 6700,
      language: "JavaScript",
      url: "https://github.com/facebook/react"
    },
    {
      id: 2,
      name: "typescript",
      description: "TypeScript is a superset of JavaScript that compiles to clean JavaScript output.",
      stars: 92400,
      forks: 12100,
      watchers: 3200,
      language: "TypeScript",
      url: "https://github.com/microsoft/typescript"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Starred Repositories</h2>
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            {starredRepos.length} Stars
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {starredRepos.map((repo) => (
            <Card key={repo.id} className="hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                  <a 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {repo.name}
                  </a>
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4" />
                    {repo.stars.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="mr-1 h-4 w-4" />
                    {repo.forks.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    {repo.watchers.toLocaleString()}
                  </div>
                  <div className="flex-1 text-right">
                    <span className="px-2 py-1 text-xs rounded-full bg-muted">
                      {repo.language}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
