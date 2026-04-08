// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      },
    ]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold tracking-tight mb-3">Task Manager</h1>
          <p className="text-zinc-400 text-xl">Stay focused. Get things done.</p>
        </div>

        <form onSubmit={addTask} className="mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done today?"
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-white/50 placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="bg-white hover:bg-zinc-100 text-black font-semibold px-8 rounded-2xl transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-16 text-center">
              <p className="text-zinc-500 text-lg">No tasks yet.</p>
              <p className="text-zinc-600 mt-2">Add one above to get started</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleComplete}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="mt-10 text-center text-sm text-zinc-500">
            {completedCount} of {tasks.length} completed
            {completedCount === tasks.length && tasks.length > 0 && (
              <span className="text-emerald-400 ml-2">🎉 All done!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}