"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Link from "next/link";

export function Header() {
  const { signIn, signOut } = useAuthActions();

  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/dashboard" className="text-lg font-semibold text-neutral-100">Todo List</Link>
        <div className="flex items-center gap-2">
          <AuthLoading>
            <span className="text-sm text-neutral-500">Loading…</span>
          </AuthLoading>
          <Authenticated>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-200 transition duration-150 hover:bg-neutral-700 hover:text-white"
            >
              Sign out
            </button>
          </Authenticated>
        </div>
      </div>
    </header>
  );
}
