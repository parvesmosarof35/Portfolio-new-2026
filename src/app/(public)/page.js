"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  CheckCircle,
  Award,
  Briefcase,
  Users,
  Zap,
  Eye,
  Calendar,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import {
  useGetProfileQuery,
  useGetProjectsQuery,
  useGetServicesQuery,
  useGetExperiencesQuery,
} from "@/store/apiSlice";

const Typewriter = ({ texts, speed = 80, delayBetween = 2500 }) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timer;
    const fullText = texts[currentTextIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, delayBetween]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-550 dark:from-purple-400 dark:via-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent font-extrabold">
        {currentText}
      </span>
      <span className="inline-block w-[3px] h-[0.9em] bg-purple-500 dark:bg-purple-400 ml-1.5 translate-y-[1px] animate-[pulse_1s_infinite]"></span>
    </span>
  );
};

const parseStatValue = (value) => {
  const stringValue = String(value || "").trim();
  const match = stringValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { target: stringValue, suffix: "" };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] || "",
  };
};

const CountUp = ({ value }) => {
  const { target, suffix } = parseStatValue(value);
  const [displayValue, setDisplayValue] = React.useState(
    typeof target === "number" ? 0 : value,
  );

  React.useEffect(() => {
    if (typeof target !== "number" || Number.isNaN(target)) {
      setDisplayValue(String(value));
      return;
    }

    let frame = 0;
    const duration = 1200;
    const interval = 30;
    const steps = Math.max(1, Math.ceil(duration / interval));
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      frame += 1;
      current += increment;

      if (frame >= steps) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, value]);

  return (
    <span>
      {displayValue}
      {typeof target === "number" ? suffix : ""}
    </span>
  );
};

const Home = () => {
  const { data: profileData } = useGetProfileQuery();
  const { data: projectsData } = useGetProjectsQuery();
  const { data: servicesData } = useGetServicesQuery();
  const { data: experiencesData } = useGetExperiencesQuery();

  const profile = profileData || {};
  const featuredProjects = (projectsData || []).slice(0, 4);
  const services = (servicesData || []).slice(0, 3);
  const experiences = experiencesData || [];

  const stats = [
    {
      value: profile.stats?.experienceYears || "5+",
      label: "Years of Experience",
    },
    {
      value:
        profile.stats?.projectsCompleted || `${projectsData?.length || 0}+`,
      label: "Projects Completed",
    },
    {
      value: profile.stats?.happyClients || "30+",
      label: "Happy Clients",
    },
    {
      value: profile.stats?.successRate || "99%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pb-28">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Info Column */}
            <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl lg:max-w-none animate-slide-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Zap size={12} className="fill-purple-500" /> Available for Hire
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 text-transparent bg-clip-text">
                  {profile.name}
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-355 min-h-[40px]">
                <Typewriter
                  texts={
                    profile.title
                      ? profile.title
                          .split(",")
                          .map((r) => r.trim())
                          .filter(Boolean)
                      : [
                          "Full-Stack Developer",
                          "React Native Developer",
                          "DevOps Expert",
                          "Software Engineer",
                          "MERN Stack Developer",
                        ]
                  }
                />
              </h2>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                {profile.shortBio}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Hire Me
                  <ArrowRight size={16} />
                </Link>
                {profile.resumeUrl && (
                  <>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Eye
                        size={16}
                        className="text-purple-600 dark:text-purple-400"
                      />
                      View Resume
                    </a>
                    <a
                      href={
                        profile.resumeUrl.includes("cloudinary.com")
                          ? profile.resumeUrl.replace(
                              "/upload/",
                              "/upload/fl_attachment/",
                            )
                          : `${profile.resumeUrl}?download=true`
                      }
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-850 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download size={16} />
                      Download CV
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Avatar Column */}
            <div className="flex-1 flex justify-center items-center relative animate-fade-in w-full min-h-[420px] sm:min-h-[520px] py-12">
              {/* Soft Ambient Background Blur Glow */}
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 blur-3xl pointer-events-none z-0" />

              {/* Composition Container */}
              <div className="relative w-64 h-72 sm:w-80 sm:h-[360px] flex justify-center items-center">
                {/* Layer 1: Spin Glow Ring (Neon Aura) */}
                <div className="absolute inset-[-8px] sm:inset-[-12px] rounded-[3.25rem] bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 blur-xl opacity-50 dark:opacity-40 animate-[spin_15s_linear_infinite] z-0" />

                {/* Layer 2: Outer Rotating Dashed Orbit Ring */}
                <div className="absolute w-[112%] h-[112%] rounded-[3.5rem] border border-dashed border-purple-500/20 dark:border-purple-400/25 animate-[spin_50s_linear_infinite] z-0 pointer-events-none" />

                {/* Layer 3: Tech Grid Dot Matrix Backdrop */}
                <div
                  className="absolute w-40 h-40 sm:w-56 sm:h-56 -right-6 sm:-right-10 -top-6 sm:-top-8 z-0 opacity-30 dark:opacity-15 text-indigo-500 dark:text-indigo-400"
                  style={{
                    backgroundImage:
                      "radial-gradient(currentColor 2px, transparent 2px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Layer 4: Interactive Floating Tech Badges */}
                {/* Badge 1: Top-Left (Full-Stack Badge with Pulsing Light) */}
                <div className="absolute -left-10 sm:-left-16 top-[20%] z-20 px-4 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex items-center gap-2 animate-[float_5s_ease-in-out_infinite] pointer-events-none">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
                    ⚡ Full-Stack
                  </span>
                </div>

                {/* Badge 2: Bottom-Right (Creative Interactive Badge) */}
                <div className="absolute -right-8 sm:-right-14 bottom-[20%] z-20 px-4 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl flex items-center gap-1.5 animate-[float-reverse_6s_ease-in-out_infinite] pointer-events-none">
                  <span className="text-xs">🚀</span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 tracking-wide whitespace-nowrap">
                    Interactive Dev
                  </span>
                </div>

                {/* Layer 5: Main Avatar Card (Squircle Card Layout) */}
                <div className="relative z-10 w-full h-full rounded-[2.75rem] overflow-hidden border-[6px] border-slate-50 dark:border-slate-950 shadow-2xl hover:scale-[1.03] hover:rotate-1 transition-all duration-500 group cursor-pointer bg-slate-100 dark:bg-slate-900">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name || "Avatar"}
                      fill
                      sizes="(max-width: 640px) 256px, 320px"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  )}
                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm py-10 border-y border-slate-200/50 dark:border-slate-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-4 pt-0 md:pt-4"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                  <CountUp value={stat.value} />
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                A selection of personal creations and client solutions I've
                developed.
              </p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group cursor-pointer"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section preview */}
      <section className="py-20 sm:py-24 bg-white/50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Professional Services
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400">
              I provide high-quality services to help businesses and start-ups
              scale their technical operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:shadow-xl hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
                  <Zap size={22} className="fill-purple-500/10" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-1 leading-relaxed">
                  {service.description}
                </p>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-4 block">
                  {service.price}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all cursor-pointer"
              suppressHydrationWarning={true}
            >
              See Detailed Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors border-t border-slate-200/50 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Professional Experience
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400">
              A brief timeline of my professional roles and journey.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-10">
            {experiences.map((item) => (
              <div key={item.id} className="relative pl-6 sm:pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-50 dark:border-slate-950 shadow" />

                <div className="space-y-1 text-left">
                  <span className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-bold">
                    <Calendar size={12} />
                    {item.period}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {item.role}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <Briefcase size={13} />
                    {item.company}
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer"
              suppressHydrationWarning={true}
            >
              Learn More About Me
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Collaboration Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Have a project in mind? Let's build it together.
          </h2>
          <p className="text-slate-350 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            I am currently accepting freelance contracts and consulting
            engagements. Reach out to discuss how I can help bring your ideas to
            life.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-white text-purple-900 hover:bg-slate-100 hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-xl shadow-black/25"
              suppressHydrationWarning={true}
            >
              Start a Conversation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
