// ══════════════════════════════════════════════════════
// COMPONENT: Home Page
// PURPOSE: Server Component that renders the TaskBoard.
// It does not manage interactive state itself.
// TYPE: Server Component
// PROPS: None
// ══════════════════════════════════════════════════════

import TaskBoard from '../components/TaskBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <TaskBoard />
    </main>
  );
}