import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  Briefcase,
  Monitor,
  CheckCircle,
  FileCode,
} from "lucide-react";
import { Github } from "@/components/BrandIcons";
import ProjectGallery from "@/components/ProjectGallery";
import { getProjectById } from "@/lib/getPublicData";

const ProjectDetails = async ({ params }) => {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">
          Project Not Found
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          The project you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/projects"
          className="mt-6 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-purple-650 hover:bg-purple-550 shadow-md transition-all"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-left">
        {/* Back Button */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-505 dark:text-slate-400 hover:text-purple-500 transition-colors group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects List
          </Link>
        </div>

        {/* Title & Metadata Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full border shadow-sm ${
                project.type === "client"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
              }`}
            >
              {project.type === "client" ? (
                <Briefcase size={12} />
              ) : (
                <Monitor size={12} />
              )}
              {project.type} Project
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-slate-205 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-305 dark:border-slate-700/50 shadow-sm">
              <Tag size={12} />
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm">
              <CheckCircle size={12} />
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            {project.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                Release Date: {project.date}
              </span>
            )}
          </div>
        </div>

        {/* Showcase Gallery Component */}
        <ProjectGallery
          images={project.images}
          defaultImageUrl={project.imageUrl}
          title={project.title}
          videoUrl={project.videoUrl}
        />

        {/* Project Body Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-4">
          {/* Main Description (Left 2 Columns) */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-extrabold border-b border-slate-200 dark:border-slate-800 pb-2">
              Project Description & Overview
            </h2>
            <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 space-y-3 shadow-sm">
              <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                Technical Highlights
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This project represents a scalable production solution engineered with modern standards. Major highlights include writing clean semantic layout elements, responsive UI testing across platforms, optimizing assets weight for loading performance, and structuring clear decoupled data management patterns.
              </p>
            </div>
          </div>

          {/* Sidebar Info (Right 1 Column) */}
          <div className="md:col-span-1 space-y-6">
            {/* Tech Stack List */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack &&
                  project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-750 dark:text-slate-300 border border-slate-200/10 shadow-sm"
                    >
                      <FileCode size={11} className="text-slate-400" />
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Project Links
              </h3>
              <div className="flex flex-col gap-2 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-650 to-indigo-650 hover:from-purple-550 hover:to-indigo-550 transition-all text-center cursor-pointer shadow-sm"
                  >
                    <ExternalLink size={13} />
                    View Live Preview
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-350 hover:text-purple-600 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-205 dark:border-slate-800 transition-all text-center cursor-pointer"
                  >
                    <Github size={13} />
                    {project.githubBackendUrl
                      ? "Frontend Repository"
                      : "Source Repository"}
                  </a>
                )}
                {project.githubBackendUrl && (
                  <a
                    href={project.githubBackendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-350 hover:text-purple-600 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-205 dark:border-slate-800 transition-all text-center cursor-pointer"
                  >
                    <Github size={13} />
                    Backend Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
