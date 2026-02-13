"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TodoItem } from "./TodoItem";
import { AddTodo } from "./AddTodo";

function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="h-12 flex-1 animate-pulse rounded-xl border border-neutral-800 bg-neutral-900/50" />
        <div className="h-12 w-20 animate-pulse rounded-xl border border-neutral-800 bg-neutral-900/50" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-xl border border-neutral-800 bg-neutral-900/50 transition-opacity"
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 py-16 text-center transition-colors">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800/50 text-neutral-600">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="mt-4 font-medium text-neutral-400">No todos yet</p>
      <p className="mt-1 text-sm text-neutral-500">Add one using the field above.</p>
    </div>
  );
}

export function TodoList() {
  const todos = useQuery(api.todos.list);

  if (todos === undefined) return <Loading />;

  return (
    <div className="space-y-4">
      <AddTodo />
      {todos.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
