// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Renders the current visible list of tasks.
// It does not own task state; it only receives already-
// filtered task data from TaskBoard.
// TYPE: Client Component
// PROPS:
// - tasks: array of task objects to display
// - onToggle: callback passed to each TaskCard to toggle
//   that task's completion status
// - onDelete: callback passed to each TaskCard to delete
//   that task from the parent state
// ══════════════════════════════════════════════════════

'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="space-y-3">
      {/* This conditional render shows an empty-state message
          when there are no tasks in the current filtered view. */}
      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-16 text-center">
          <p className="text-lg text-zinc-500">No tasks found.</p>
          <p className="mt-2 text-zinc-600">Try adding a task or changing the filter.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}