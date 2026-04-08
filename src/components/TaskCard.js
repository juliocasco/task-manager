// src/components/TaskCard.js
'use client';

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="task-card bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex items-center gap-4 group">
      <input
        type="checkbox"
        checked={task?.completed ?? false}     // ← Safe check added
        onChange={() => onToggle(task?.id)}
        className="w-6 h-6 accent-white cursor-pointer mt-0.5"
      />

      <span
        className={`flex-1 text-lg transition-all duration-200 ${
          task?.completed ? 'line-through text-zinc-500' : 'text-white'
        }`}
      >
        {task?.text || 'Untitled task'}
      </span>

      <button
        onClick={() => onDelete(task?.id)}
        className="text-red-500 opacity-40 hover:opacity-100 transition-all text-xl px-3 py-1 hover:scale-110"
      >
        ✕
      </button>
    </div>
  );
}