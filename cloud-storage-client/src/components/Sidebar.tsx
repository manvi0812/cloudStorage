'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Upload, Home, LogInIcon, Inbox } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: <Home className="w-4 mr-2 h-4" /> },
    { href: '/upload', label: 'Upload', icon: <Upload className="w-4  mr-2 h-4" /> },
    { href: '/login', label: 'Login', icon: <LogInIcon className="w-4  mr-2 h-4" /> },
    { href: '/register', label: 'Register', icon: <Inbox className="w-4  mr-2 h-4" /> },
  ];

  return (
    <div className="h-screen w-full border border-gray-300 p-3">
      <p className="font-sans text-primary-color font-bold text-2xl">FileStore</p>
      <nav className="flex flex-col gap-1 mt-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-xl text-sm flex hover:bg-gray-500 hover:text-background transition ${
              pathname === link.href ? 'bg-gray-700 text-background' : ''
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
