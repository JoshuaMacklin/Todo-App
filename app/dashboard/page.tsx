import { Header } from "@/components/Header";
import { TodoList } from "@/components/TodoList";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <TodoList />
      </main>
    </div>
  );
}
