"use client";
import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import { Github, Linkedin, Facebook, Whatsapp } from "./BrandIcons";
import { useGetProfileQuery } from "../store/apiSlice";

const Footer = () => {
  const { data: profileData } = useGetProfileQuery();
  const profile = profileData || {};

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const githubUrl = profile?.github || "#";
  const linkedinUrl = profile?.linkedin || "#";
  const facebookUrl = profile?.facebook || "#";
  const whatsappUrl = profile?.whatsapp || "#";
  const emailUrl = profile?.email ? `mailto:${profile.email}` : "#";

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="text-center md:text-left">
            <span className="font-bold text-lg text-slate-800 dark:text-white">
              {profile?.name || "Portfolio"}
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Building responsive, high-performance web products.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:text-purple-500 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm"
              aria-label="GitHub"
              suppressHydrationWarning={true}
            >
              <Github size={18} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:text-purple-500 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm"
              aria-label="LinkedIn"
              suppressHydrationWarning={true}
            >
              <Linkedin size={18} />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:text-purple-500 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm"
              aria-label="Facebook"
              suppressHydrationWarning={true}
            >
              <Facebook size={18} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:text-purple-500 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm"
              aria-label="WhatsApp"
              suppressHydrationWarning={true}
            >
              <Whatsapp size={18} />
            </a>
            <a
              href={emailUrl}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:text-purple-500 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm"
              aria-label="Email"
              suppressHydrationWarning={true}
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Quick links & Back to Top */}
          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
            <span>
              &copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}. All rights reserved.
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
