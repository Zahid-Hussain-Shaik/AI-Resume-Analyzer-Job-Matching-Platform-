import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
      } catch (err) {
        console.error("Failed to parse auth user:", err);
      }
    }
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return {
    user,
    token,
    isAuthenticated: !!token || !!user,
    login,
    logout,
  };
}
