"use client";

import { JWTPayloadType } from "@/lib/auth";
import { createContext, useContext } from "react";

type Session = JWTPayloadType | null;

const SessionContext = createContext<Session>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
}
