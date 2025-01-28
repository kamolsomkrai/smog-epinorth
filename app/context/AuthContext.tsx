// app/context/AuthContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  getUser: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const res = await fetch("/api/getUser", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
