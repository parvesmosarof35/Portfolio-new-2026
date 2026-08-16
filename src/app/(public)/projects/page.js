import React from "react";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/getPublicData";

const Projects = async () => {
  const projects = (await getProjects()) || [];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            A comprehensive catalog of applications, automation tools, and services I have built.
          </p>
        </div>

        {/* Interactive Filter & Projects List */}
        <ProjectList initialProjects={projects} />
      </div>
    </div>
  );
};

export default Projects;
