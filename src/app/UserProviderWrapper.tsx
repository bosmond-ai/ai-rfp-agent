"use client";
import { UserProvider } from '@auth0/nextjs-auth0';

export default function UserProviderWrapper({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
} 