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