"use client";

import { Authenticated, AuthLoading } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/dashboard" className="text-lg font-semibold text-neutral-100">Todo List</Link>
        <div className="flex items-center gap-2">
          <AuthLoading>
            <span className="text-sm text-neutral-500">Loading…</span>
          </AuthLoading>
          <Authenticated>
            <UserButton afterSignOutUrl="/" />
          </Authenticated>
        </div>
      </div>
    </header>
  );
}
