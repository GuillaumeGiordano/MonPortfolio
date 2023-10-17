"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState(session);

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  return (
    <AuthContext.Provider value={{ session: userSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
