// ══════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE: Displays live task counts and provides a
// button to clear all completed tasks.
// TYPE: Client Component
// PROPS:
// - total: total number of tasks
// - active: number of unfinished tasks
// - completed: number of finished tasks
// - onClearCompleted: callback from TaskBoard that removes
//   every completed task from the parent state
// ══════════════════════════════════════════════════════

'use client';

export default function TaskStats({
  total,
  active,
  completed,
  onClearCompleted,
}) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-4">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-center">
        <p className="text-sm uppercase tracking-wide text-zinc-500">Total</p>
        <p className="mt-2 text-3xl font-bold text-white">{total}</p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-center">
        <p className="text-sm uppercase tracking-wide text-zinc-500">Active</p>
        <p className="mt-2 text-3xl font-bold text-white">{active}</p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-center">
        <p className="text-sm uppercase tracking-wide text-zinc-500">Done</p>
        <p className="mt-2 text-3xl font-bold text-emerald-400">{completed}</p>
      </div>

      <button
        onClick={onClearCompleted}
        className="rounded-3xl border border-red-900/40 bg-red-950/40 p-5 font-semibold text-red-300 transition hover:bg-red-900/30"
      >
        Clear Completed
      </button>
    </div>
  );
}