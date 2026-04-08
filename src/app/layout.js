import './globals.css';

export const metadata = {
  title: 'Task Manager',
  description: 'Simple and clean task manager built with Next.js',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}