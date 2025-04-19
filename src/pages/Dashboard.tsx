import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitMerge, GitPullRequest } from "lucide-react";
import { IssueGrid } from "@/components/dashboard/IssueGrid";
import { ChatbotBubble } from "@/components/layout/ChatbotBubble";
import axios from "axios";

interface Issue {
  id: string;
  title: string;
  repo: {
    name: string;
    owner: string;
    stars: number;
  };
  tags: string[];
  matchScore: number;
  createdAt: string;
  language: string;
}

interface Repo {
  id: string;
  name: string;
  owner: string;
  stars: number;
}

export default function Dashboard() {
  const { userg } = useAuth(); // From AuthProvider
  const [skills, setSkills] = useState<string>("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingIssues, setLoadingIssues] = useState<boolean>(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/user-languages", { withCredentials: true })
      .then((res) => setLanguages(res.data))
      .catch((err) => console.error("Failed to load languages:", err.message));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/repos", { withCredentials: true })
      .then((res) => setRepos(res.data))
      .catch((err) => {
        console.error("Failed to load repositories:", err.message);
        setRepos([]);
      });
  }, []);

  useEffect(() => {
    if (!selectedLang) return;

    axios
      .get(`http://localhost:4000/api/issues?language=${selectedLang}`, { withCredentials: true })
      .then((res) => setIssues(res.data))
      .catch((err) => {
        console.error("Failed to load issues:", err.message);
        setIssues([]);
      });
  }, [selectedLang]);

  const fetchMatchedIssues = async () => {
    try {
      setLoadingIssues(true);
      const res = await axios.post(
        "http://localhost:4000/api/match",
        { skills },
        { withCredentials: true }
      );
      setIssues(res.data);
    } catch (err) {
      console.error("Issue fetch error:", err.message);
      setIssues([]);
    } finally {
      setLoadingIssues(false);
    }
  };

  const fetchTopIssues = async () => {
    try {
      setLoadingIssues(true);
      const res = await axios.get("http://localhost:4000/api/issues", { withCredentials: true });
      setIssues(res.data);
    } catch (err) {
      console.error("Top issues fetch error:", err.message);
      setIssues([]);
    } finally {
      setLoadingIssues(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/auth/logout", { withCredentials: true });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  if (!userg) return null;

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{userg?.bio || "No bio available"}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{userg?.repositories || 0}</span>
                  <span className="text-xs text-muted-foreground">Repositories</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{userg?.stars || 0}</span>
                  <span className="text-xs text-muted-foreground">Stars</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{userg?.followers || 0}</span>
                  <span className="text-xs text-muted-foreground">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{userg?.following || 0}</span>
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
          {loadingIssues ? (
            <p>Loading issues...</p>
          ) : (
            <IssueGrid issues={issues} />
          )}
        </div>
      </div>

      <ChatbotBubble />
    </DashboardLayout>
  );
}