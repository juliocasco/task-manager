// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Displays one task row with controls to toggle
// completion or delete that task.
// TYPE: Client Component
// PROPS:
// - id: unique identifier for the task
// - title: task text to display
// - done: boolean that tells whether the task is complete
// - onToggle: callback from TaskBoard that flips the task's
//   completion state in the parent component
// - onDelete: callback from TaskBoard that removes the task
//   from the parent component's state
// ══════════════════════════════════════════════════════

'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  // This class is derived from the done prop rather than stored
  // in state because the visual style can be calculated directly
  // from existing data each render.
  const textClass = done ? 'line-through text-zinc-500' : 'text-white';

  return (
    <div className="task-card flex items-center gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 group">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
        className="mt-0.5 h-6 w-6 cursor-pointer accent-white"
      />

      <span className={`flex-1 text-lg transition-all duration-200 ${textClass}`}>
        {title}
      </span>

      <button
        onClick={() => onDelete(id)}
        className="px-3 py-1 text-xl text-red-500 opacity-40 transition-all hover:scale-110 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}