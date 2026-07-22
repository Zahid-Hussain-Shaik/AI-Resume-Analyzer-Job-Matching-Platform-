import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth-modal";
import { useAuth } from "@/hooks/use-auth";

const marketingLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNavbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const { user, isAuthenticated, logout } = useAuth();

  const handleOpenAuth = (tab: "login" | "register") => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="max-w-52 font-display text-sm font-bold leading-tight tracking-tight sm:max-w-none sm:text-base">
              AI Resume Analyzer & Job Match Platform
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {marketingLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === l.href && "text-foreground",
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-xs font-semibold text-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  {user?.name || user?.email || "User"}
                </span>

                <Button asChild variant="ghost" size="sm">
                  <Link to="/profile" className="flex items-center gap-1 font-medium">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </Button>

                <Button asChild variant="outline" size="sm">
                  <Link to="/dashboard" className="flex items-center gap-1 font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex cursor-pointer"
                  onClick={() => handleOpenAuth("login")}
                >
                  Sign in
                </Button>
                <Button
                  size="sm"
                  className="hidden sm:inline-flex cursor-pointer"
                  onClick={() => handleOpenAuth("register")}
                >
                  Get started
                </Button>
              </>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="mt-8 flex flex-col gap-4">
                  {marketingLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-base font-medium"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  ))}

                  {isAuthenticated ? (
                    <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                      <div className="flex items-center gap-2 rounded-lg bg-muted p-2 text-xs font-semibold">
                        <User className="h-4 w-4 text-primary" />
                        <span>{user?.name || user?.email || "User"}</span>
                      </div>
                      <Button asChild variant="outline" className="justify-start">
                        <Link to="/profile" onClick={() => setOpen(false)}>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button asChild className="justify-start">
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="justify-start cursor-pointer mt-2"
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setOpen(false);
                          handleOpenAuth("login");
                        }}
                      >
                        Sign in
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          handleOpenAuth("register");
                        }}
                      >
                        Get started
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authTab}
      />
    </>
  );
}
