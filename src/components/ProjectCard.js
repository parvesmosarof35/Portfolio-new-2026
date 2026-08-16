import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Monitor, Briefcase, FileCode, Video } from 'lucide-react';
import { Github } from './BrandIcons';

import { optimizeImage } from '@/lib/optimizeImage';

const ProjectCard = ({ project }) => {
  const { title, description, type, category, techStack, liveUrl, githubUrl, imageUrl, videoUrl, status } = project;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1">
      {/* Glow Effect behind card on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-indigo-500/0 rounded-2xl group-hover:from-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-700 -z-10" />

      {/* Image container */}
      <Link 
        href={`/project/${project.id}`} 
        className="relative h-48 sm:h-52 w-full overflow-hidden block" 
        aria-label={`View details for ${title}`}
        suppressHydrationWarning={true}
      >
        <Image
          src={optimizeImage(imageUrl, 600) || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"}
          alt={title || 'Project'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Blur overlay on hover */}
        <div className="absolute inset-0 bg-slate-955/20 dark:bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {/* Project Type */}
          <span className={`flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm ${
            type === 'client'
              ? 'bg-amber-500/90 dark:bg-amber-500/20 text-white dark:text-amber-300 border border-amber-500/30'
              : 'bg-indigo-600/90 dark:bg-indigo-600/20 text-white dark:text-indigo-300 border border-indigo-500/30'
          }`}>
            {type === 'client' ? (
              <>
                <Briefcase size={10} /> Client
              </>
            ) : (
              <>
                <Monitor size={10} /> Personal
              </>
            )}
          </span>

          {/* Project Category */}
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-900/80 dark:bg-slate-800/80 text-white border border-slate-700/50 shadow-sm">
            {category}
          </span>

          {/* Video Badge */}
          {videoUrl && (
            <span className="flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-purple-600/90 text-white border border-purple-400/40 shadow-sm">
              <Video size={11} /> Video Demo
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm ${
            status === 'Completed'
              ? 'bg-emerald-500 text-white'
              : status === 'In Progress'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-500 text-white'
          }`}>
            {status}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <Link href={`/project/${project.id}`} aria-label={`${title} overview`} className="block group/title" suppressHydrationWarning={true}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover/title:text-purple-500 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-200/20"
            >
              <FileCode size={10} className="text-slate-400" />
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 text-xs">
          <Link
            href={`/project/${project.id}`}
            aria-label={`Read case study for ${title}`}
            className="font-bold text-purple-650 hover:text-purple-550 dark:text-purple-400 dark:hover:text-purple-300 transition-colors shrink-0"
            suppressHydrationWarning={true}
          >
            Case Study
          </Link>
          
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group/link cursor-pointer ml-auto"
              suppressHydrationWarning={true}
            >
              <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              Demo
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group/link cursor-pointer"
              suppressHydrationWarning={true}
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
