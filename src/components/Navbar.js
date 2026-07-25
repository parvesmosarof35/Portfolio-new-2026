"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdmin(sessionStorage.getItem('admin_authenticated') === 'true');
    }
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/20 bg-white/70 dark:bg-slate-950/70 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white group" suppressHydrationWarning={true}>
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text font-black group-hover:opacity-80 transition-opacity">
              &lt;A/&gt;
            </span>
            <span className="hover:text-purple-500 transition-colors">Parves</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors hover:text-purple-500 ${
                  isActive(link.path)
                    ? 'text-purple-600 dark:text-purple-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                suppressHydrationWarning={true}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 rounded-full animate-fade-in" />
                )}
              </Link>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            {/* Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden border-t border-slate-200/10 bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
              suppressHydrationWarning={true}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              suppressHydrationWarning={true}
            >
              <LayoutDashboard size={18} />
              Dashboard Panel
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
