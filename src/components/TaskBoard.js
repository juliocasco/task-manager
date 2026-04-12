// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE: Main state owner for the task manager. This
// component stores the task list and current filter,
// then passes data down to child components.
// TYPE: Client Component
// PROPS: None
// ══════════════════════════════════════════════════════

'use client';

import { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // tasks belongs in state because the list changes over time
  // in response to user actions like add, toggle, delete, and clear.
  // Since the UI depends on this changing value, React state is needed.
  const [tasks, setTasks] = useState(() => {
    // This lazy initializer reads localStorage only during the
    // initial render setup instead of on every render.
    // The typeof window guard prevents errors during server-side
    // rendering because localStorage only exists in the browser.
    if (typeof window === 'undefined') return [];

    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // filter is separate state because it controls which subset
  // of tasks is visible. It changes independently from the task
  // data itself, so it should not be merged into the tasks array.
  const [filter, setFilter] = useState('all');

  // This effect synchronizes React state with localStorage,
  // which is an external browser system. The dependency array
  // is [tasks] because saving only needs to happen when tasks change.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // These counts are derived values, so they should not be stored
  // in state. They can always be recalculated from the single source
  // of truth: the tasks array.
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;
  const activeTasks = totalTasks - completedTasks;

  // visibleTasks is also derived instead of state because it depends
  // entirely on the current tasks array and selected filter.
  // Storing it separately would create duplicate data and possible bugs.
  const visibleTasks =
    filter === 'all'
      ? tasks
      : filter === 'active'
      ? tasks.filter((task) => !task.done)
      : tasks.filter((task) => task.done);

  function handleAddTask(title) {
    // Spread syntax creates a new array instead of mutating the old one.
    // React relies on a new reference to detect state changes correctly.
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        done: false,
      },
    ]);
  }

  function handleToggleTask(id) {
    // map() returns a brand-new array, which keeps the update immutable.
    // Direct mutation would make state changes harder for React to track.
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDeleteTask(id) {
    // filter() creates a new array without the selected task.
    // This is the standard immutable pattern for removing items.
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    // This removes all completed tasks at once by keeping only active ones.
    setTasks(tasks.filter((task) => !task.done));
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-6xl font-bold tracking-tight">Task Manager 2.0</h1>
        <p className="text-xl text-zinc-400">Stay focused. Get things done.</p>
      </div>

      <AddTaskForm onAdd={handleAddTask} />

      <TaskStats
        total={totalTasks}
        active={activeTasks}
        completed={completedTasks}
        onClearCompleted={handleClearCompleted}
      />

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-2xl px-5 py-2 font-medium transition ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter('active')}
          className={`rounded-2xl px-5 py-2 font-medium transition ${
            filter === 'active'
              ? 'bg-white text-black'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter('done')}
          className={`rounded-2xl px-5 py-2 font-medium transition ${
            filter === 'done'
              ? 'bg-white text-black'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          Done
        </button>
      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </section>
  );
}