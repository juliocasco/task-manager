// ══════════════════════════════════════════════════════
// FILE: src/app/layout.js
// PURPOSE: Root layout for the entire Task Manager app.
//          Imports global Tailwind CSS and sets up basic
//          HTML structure + metadata. This is a Server
//          Component (no interactivity needed here).
// TYPE: Server Component
// ══════════════════════════════════════════════════════

import './globals.css';

export const metadata = {
  title: 'Task Manager 2.0',
  description: 'Module 10 Coding Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}