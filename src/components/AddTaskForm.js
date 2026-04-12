// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE: Controlled form that captures the user's new
// task text and sends it upward to TaskBoard.
// TYPE: Client Component
// PROPS:
// - onAdd: callback function from TaskBoard that receives
//   the new task title when the form is submitted
// ══════════════════════════════════════════════════════

'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  // This state belongs here because only this component needs
  // to track what the user is typing into the input field.
  // The parent does not need every keystroke.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // preventDefault stops the browser from doing its normal
    // form submission, which would refresh the page and wipe
    // out the current React app state.
    e.preventDefault();

    // trim() removes extra spaces so blank-looking input
    // does not get added as a task.
    if (!title.trim()) return;

    // The parent component owns the tasks array, so the new
    // task text must be passed upward through a callback prop.
    onAdd(title.trim());

    // Resetting the input after submission improves usability
    // because the user can immediately type the next task.
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done today?"
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/50"
        />

        <button
          type="submit"
          className="rounded-2xl bg-white px-8 font-semibold text-black transition-colors hover:bg-zinc-100"
        >
          Add
        </button>
      </div>
    </form>
  );
}