import React from "react";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getServices } from "@/lib/getPublicData";

const Services = async () => {
  const services = (await getServices()) || [];

  const renderIcon = (iconName) => {
    const IconComp = Icons[iconName];
    if (IconComp) {
      return <IconComp className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
    }
    return <Icons.HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
  };

  const serviceBullets = {
    "serv-1": [
      "Responsive layout for mobile, tablets and desktops",
      "SEO friendly coding practices",
      "Modern State management (Redux / Zustand)",
      "API integrations & dynamic data loading",
    ],
    "serv-2": [
      "Real-time chart rendering (Chart.js / Recharts)",
      "Role-based authentication & route security",
      "Responsive sidebar configurations",
      "CRUD operations & CSV/Excel export features",
    ],
    "serv-3": [
      "Structured MVC / Clean Architecture APIs",
      "JWT and Session authentication",
      "Middleware validations & custom error logs",
      "Background worker & Redis caching systems",
    ],
    "serv-4": [
      "Pixel-perfect translation of Figma designs",
      "Clean CSS transitions and interactions",
      "Reusable UI components system",
      "Fluid typography and grid spacing",
    ],
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-955 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Professional Web Services
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            I offer reliable development and implementation services designed to scale your technical platforms. Below are the areas I specialize in.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id || service._id}
              className="flex flex-col p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md hover:border-purple-500/20 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
                  {renderIcon(service.iconName)}
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-200/10">
                  {service.price}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-5">
                {service.title}
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* Bullet details */}
              <ul className="mt-6 space-y-2.5 flex-grow border-t border-slate-105 dark:border-slate-800/50 pt-5">
                {(serviceBullets[service.id] || [
                  "Custom development tailored to metrics",
                  "Cross-browser responsive styling tests",
                  "Optimized clean code standards",
                  "Detailed technical review",
                ]).map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/5 hover:bg-purple-500/10 dark:bg-purple-400/5 dark:hover:bg-purple-400/10 border border-purple-500/10 hover:border-purple-500/20 transition-all cursor-pointer"
                >
                  Inquire About This Service
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl border border-purple-500/10 p-8 text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-extrabold">Need a Custom Work Solution?</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            If your requirements don't fit into these categories, we can negotiate a custom contract. I can build tailored dashboards, scrapers, automated workflows, and more.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-purple-600 hover:bg-purple-550 shadow transition-all cursor-pointer"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
