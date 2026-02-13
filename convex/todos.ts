import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) return null;
    return todo;
  },
});

export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    return await ctx.db.insert("todos", {
      userId,
      text: args.text.trim(),
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("todos"),
    text: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) throw new Error("Todo not found");
    const { id, ...updates } = args;
    const patch: Record<string, unknown> = {};
    if (updates.text !== undefined) patch.text = updates.text.trim();
    if (updates.completed !== undefined) patch.completed = updates.completed;
    if (updates.order !== undefined) patch.order = updates.order;
    if (Object.keys(patch).length === 0) return id;
    await ctx.db.patch(id, patch);
    return id;
  },
});

export const toggleComplete = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) throw new Error("Todo not found");
    await ctx.db.patch(args.id, { completed: !todo.completed });
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== userId) throw new Error("Todo not found");
    await ctx.db.delete(args.id);
    return args.id;
  },
});
