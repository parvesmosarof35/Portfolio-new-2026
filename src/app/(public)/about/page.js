"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Briefcase,
  GraduationCap,
  Code,
  Server,
  Wrench,
} from "lucide-react";
import { useGetProfileQuery, useGetExperiencesQuery } from "@/store/apiSlice";

const About = () => {
  const { data: profileData } = useGetProfileQuery();
  const { data: experiencesData } = useGetExperiencesQuery();

  const profile = profileData || {};
  const experience = experiencesData || [];

  const skillGroups = [
    {
      title: "Frontend Development",
      icon: <Code size={20} className="text-purple-500" />,
      skills: profile.skillsFrontend
        ? profile.skillsFrontend
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [
            "React.js",
            "Next.js",
            "Tailwind CSS",
            "Redux Toolkit",
            "Zustand",
            "HTML5 & CSS3",
            "TypeScript",
          ],
    },
    {
      title: "Backend & Databases",
      icon: <Server size={20} className="text-indigo-500" />,
      skills: profile.skillsBackend
        ? profile.skillsBackend
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [
            "Node.js",
            "Express.js",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "RESTful APIs",
            "GraphQL",
          ],
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench size={20} className="text-emerald-500" />,
      skills: profile.skillsDevops
        ? profile.skillsDevops
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [
            "Git & GitHub",
            "Docker",
            "Linux Terminal",
            "Vercel / Render",
            "Postman",
            "CI/CD",
            "Figma",
          ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Management Studies (BMS)",
      institution: "Dhaka College",
      period: "2021 - 2026",
      description:
        "Completed my honors degree with a CGPA of 3.05. Gained strong analytical and management skills alongside pursuing a self-taught, intensive journey into full-stack software development.",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Kabi Nazrul Government College",
      period: "2018 - 2020",
      description:
        "Successfully completed with a GPA of 4.83.",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Sobuj Biddya Pith High School",
      period: "2016 - 2018",
      description:
        "Successfully completed with a GPA of 4.83.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
        {/* Intro Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-purple-500/20 mb-4 relative">
              {profile?.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name || "Avatar"}
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              )}
            </div>
            <h1 className="text-2xl font-black">{profile.name}</h1>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
              {profile.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {profile.location}
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              About Me
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile.aboutMe}
            </p>
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-250">
                Work Style & Philosophy
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {profile.workPhilosophy ||
                  "I believe in writing clear, maintainable code rather than clever hacks. I prioritize communication and transparency, making sure my clients are fully updated via regular check-ins and demo builds."}
              </p>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Technical Toolkit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/65 dark:border-slate-850 bg-white dark:bg-slate-900/40 shadow-sm space-y-4 hover:border-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  {group.icon}
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/50 text-slate-700 dark:text-slate-350 border border-slate-200/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Work Experience
          </h2>
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 space-y-8">
            {experience.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-50 dark:border-slate-955" />
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-bold">
                    <Calendar size={12} />
                    {item.period}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    {item.role}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Briefcase size={12} />
                    {item.company}
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Timeline */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Education
          </h2>
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-slate-50 dark:border-slate-950" />
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                    <Calendar size={12} />
                    {edu.period}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">
                    {edu.degree}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <GraduationCap size={12} />
                    {edu.institution}
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
