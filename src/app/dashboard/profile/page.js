"use client";
import React, { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadFileMutation,
} from "@/store/apiSlice";
import { Save, User, CheckCircle2, ShieldAlert, Code } from "lucide-react";
import toast from "react-hot-toast";

const ManageProfile = () => {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    shortBio: "",
    aboutMe: "",
    workPhilosophy: "",
    skillsFrontend: "",
    skillsBackend: "",
    skillsDevops: "",
    email: "",
    phone: "",
    whatsapp: "",
    linkedin: "",
    facebook: "",
    github: "",
    location: "",
    resumeUrl: "",
    avatarUrl: "",
    stats: {
      experienceYears: "",
      projectsCompleted: "",
      happyClients: "",
      successRate: "",
    },
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profileData) {
      setProfile({
        name: profileData.name || "",
        title: profileData.title || "",
        shortBio: profileData.shortBio || "",
        aboutMe: profileData.aboutMe || "",
        workPhilosophy: profileData.workPhilosophy || "",
        skillsFrontend: profileData.skillsFrontend || "",
        skillsBackend: profileData.skillsBackend || "",
        skillsDevops: profileData.skillsDevops || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        whatsapp: profileData.whatsapp || "",
        linkedin: profileData.linkedin || "",
        facebook: profileData.facebook || "",
        github: profileData.github || "",
        location: profileData.location || "",
        resumeUrl: profileData.resumeUrl || "",
        avatarUrl: profileData.avatarUrl || "",
        stats: {
          experienceYears: profileData.stats?.experienceYears || "0",
          projectsCompleted: profileData.stats?.projectsCompleted || "0",
          happyClients: profileData.stats?.happyClients || "0",
          successRate: profileData.stats?.successRate || "0%",
        },
      });
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.");
      return;
    }

    if (file.size > 3.5 * 1024 * 1024) {
      toast.error("File is too large. Please upload a PDF under 3.5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (profile.resumeUrl) {
      formData.append("oldFileUrl", profile.resumeUrl);
    }

    try {
      const response = await uploadFile(formData).unwrap();
      const updatedProfile = { ...profile, resumeUrl: response.url };
      setProfile(updatedProfile);

      // Save directly to MongoDB immediately
      await updateProfile(updatedProfile).unwrap();
      toast.success("Resume uploaded and saved to database successfully!");
    } catch (err) {
      toast.error("Upload failed: " + (err?.data?.message || "Server error"));
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file only.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File is too large. Please upload an image under 50 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (profile.avatarUrl) {
      formData.append("oldFileUrl", profile.avatarUrl);
    }

    try {
      const response = await uploadFile(formData).unwrap();
      const updatedProfile = { ...profile, avatarUrl: response.url };
      setProfile(updatedProfile);

      // Save directly to MongoDB immediately
      await updateProfile(updatedProfile).unwrap();
      toast.success("Avatar image uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed: " + (err?.data?.message || "Server error"));
    }
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      stats: { ...prev.stats, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile).unwrap();
      toast.success("Profile updated successfully!");
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 5000);
    } catch (err) {
      toast.error(
        "Failed to save profile: " + (err?.data?.message || "Server error"),
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Profile Editor
        </h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">
          Customize your biography, coordinates, resume link, and technical
          credentials.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold animate-slide-up">
          <CheckCircle2 size={16} className="shrink-0" />
          Profile configuration updated successfully! View changes on the public
          pages.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Information Group */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User size={16} className="text-purple-500" /> Basic Bio Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Professional Titles (Comma separated)
              </label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                required
                placeholder="e.g. Full-Stack Developer, DevOps Expert"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-500 dark:text-slate-400">
              Short Bio (Hero section introduction)
            </label>
            <input
              type="text"
              name="shortBio"
              value={profile.shortBio}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-500 dark:text-slate-400">
              Long Story (About Me Page Content)
            </label>
            <textarea
              name="aboutMe"
              value={profile.aboutMe}
              onChange={handleInputChange}
              required
              rows="5"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Avatar Image Uploader */}
            <div className="md:col-span-2 space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Avatar Profile Image
              </label>
              <div className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-550/5 dark:bg-slate-900/30">
                {/* Avatar Preview */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm">
                  <img
                    src={profile.avatarUrl || null}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1 text-left">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-purple-500/10 file:text-purple-650 dark:file:bg-purple-500/20 dark:file:text-purple-400 hover:file:bg-purple-500/20 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-505">
                    Upload a square JPG, PNG, or WEBP image file directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1 self-stretch flex flex-col justify-end pb-1.5">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
                placeholder="e.g. Dhaka, Bangladesh"
              />
            </div>
          </div>
        </div>

        {/* About Details & Technical Toolkit */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Code size={16} className="text-purple-500" /> About Page &
            Technical Toolkit
          </h2>

          <div className="space-y-1">
            <label className="font-bold text-slate-500 dark:text-slate-400">
              Work Philosophy
            </label>
            <textarea
              name="workPhilosophy"
              value={profile.workPhilosophy}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900 resize-none"
              placeholder="e.g. I believe in writing clear, maintainable code rather than clever hacks..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Frontend Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skillsFrontend"
                value={profile.skillsFrontend}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                placeholder="React.js, Next.js, Tailwind CSS, TypeScript"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Backend Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skillsBackend"
                value={profile.skillsBackend}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                placeholder="Node.js, Express.js, PostgreSQL, MongoDB"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Tools & DevOps Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skillsDevops"
                value={profile.skillsDevops}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                placeholder="Git, Docker, Linux, Vercel, Figma"
              />
            </div>
          </div>
        </div>

        {/* Contact and Links Group */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <ShieldAlert size={16} className="text-indigo-500" /> Contact
            Channels & Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                WhatsApp Web Link
              </label>
              <input
                type="url"
                name="whatsapp"
                value={profile.whatsapp}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                LinkedIn Profile Link
              </label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Facebook Profile Link
              </label>
              <input
                type="url"
                name="facebook"
                value={profile.facebook}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                GitHub Link
              </label>
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <label className="font-bold text-slate-500 dark:text-slate-400">
              Professional Resume (PDF)
            </label>

            <div className="p-5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-550/5 dark:bg-slate-900/30 space-y-4">
              <span className="block text-xs font-bold text-slate-400 dark:text-slate-505 uppercase tracking-wider">
                Upload New Resume PDF
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="w-full text-xs text-slate-505 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-purple-500/10 file:text-purple-650 dark:file:bg-purple-500/20 dark:file:text-purple-400 hover:file:bg-purple-500/20 cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-505">
              Only PDF format is supported (Max 3.5 MB). The file will be stored
              securely on Cloudinary (or local server fallback) and saved
              directly to your MongoDB database. Remember to click "Save
              Changes" at the bottom of the page to apply changes.
            </p>
          </div>
        </div>

        {/* Counter Stats Group */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Save size={16} className="text-emerald-500" /> Stats Counters
            Metrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Experience (e.g. 5+)
              </label>
              <input
                type="text"
                name="experienceYears"
                value={profile.stats.experienceYears}
                onChange={handleStatsChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-center focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Projects Completed (e.g. 40+)
              </label>
              <input
                type="text"
                name="projectsCompleted"
                value={profile.stats.projectsCompleted}
                onChange={handleStatsChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-805 text-slate-800 dark:text-slate-200 text-center focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Happy Clients (e.g. 25+)
              </label>
              <input
                type="text"
                name="happyClients"
                value={profile.stats.happyClients}
                onChange={handleStatsChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-805 text-slate-805 dark:text-slate-200 text-center focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 dark:text-slate-400">
                Success Rate (e.g. 99%)
              </label>
              <input
                type="text"
                name="successRate"
                value={profile.stats.successRate}
                onChange={handleStatsChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-center focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 shadow-md shadow-purple-500/10 cursor-pointer hover:shadow-purple-550/20 active:scale-99 transition-all"
          >
            <Save size={16} />
            Save Profile Config
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageProfile;
