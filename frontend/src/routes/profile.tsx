import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockProfile } from "@/constants/mock-data";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · AI Resume Analyzer & Job Match Platform" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [p, setP] = useState(mockProfile);
  const initials = p.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <AppShell title="Profile">
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 shadow-elegant">
                <AvatarFallback className="gradient-primary text-lg font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display text-lg font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.title}</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Change avatar
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={p.name}
                  onChange={(e) => setP({ ...p, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={p.email}
                  onChange={(e) => setP({ ...p, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job title</Label>
                <Input
                  id="title"
                  value={p.title}
                  onChange={(e) => setP({ ...p, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={p.location}
                  onChange={(e) => setP({ ...p, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                value={p.bio}
                onChange={(e) => setP({ ...p, bio: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setP(mockProfile)}>
                Reset
              </Button>
              <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
