
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Card className="w-full md:w-72">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
              
              <div className="mt-6 w-full">
                <h3 className="text-sm font-medium mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">
                  {user.bio || "No bio available"}
                </p>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-lg font-bold">{user.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user.repositories}</p>
                  <p className="text-xs text-muted-foreground">Repositories</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{user.stars}</p>
                  <p className="text-xs text-muted-foreground">Stars</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <Tabs defaultValue="repositories">
              <TabsList className="mb-4">
                <TabsTrigger value="repositories">Repositories</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="repositories">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Repositories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You have {user.repositories} repositories.
                    </p>
                    <div className="mt-4 space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <h3 className="font-medium">Project {i+1}</h3>
                          <p className="text-sm text-muted-foreground">Description of the project</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs bg-muted/40 px-2 py-1 rounded">JavaScript</span>
                            <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="starred">
                <Card>
                  <CardHeader>
                    <CardTitle>Starred Repositories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You have starred {user.stars} repositories.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contributions">
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Your contribution activity over time.
                    </p>
                    <div className="h-40 bg-muted/40 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Contribution graph would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
