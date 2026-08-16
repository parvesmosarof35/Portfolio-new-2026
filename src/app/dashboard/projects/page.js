"use client";
import React, { useState, useEffect } from 'react';
import { 
  useGetProjectsQuery, 
  useCreateProjectMutation, 
  useUpdateProjectMutation, 
  useDeleteProjectMutation,
  useUploadFileMutation
} from '@/store/apiSlice';
import { Plus, Edit2, Trash2, X, ExternalLink, Monitor, Briefcase, Video } from 'lucide-react';
import { Github } from '@/components/BrandIcons';
import toast from 'react-hot-toast';

const ManageProjects = () => {
  const { data: projectsData } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const projects = projectsData || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'personal',
    category: 'Frontend',
    techStackString: '',
    liveUrl: '',
    githubUrl: '',
    githubBackendUrl: '',
    imageUrl: '',
    imagesString: '',
    videoUrl: '',
    status: 'Completed',
    date: ''
  });

  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      title: '',
      description: '',
      type: 'personal',
      category: 'Frontend',
      techStackString: '',
      liveUrl: '',
      githubUrl: '',
      githubBackendUrl: '',
      imageUrl: '',
      imagesString: '',
      videoUrl: '',
      status: 'Completed',
      date: new Date().toISOString().substring(0, 7)
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      type: project.type,
      category: project.category,
      techStackString: project.techStack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      githubBackendUrl: project.githubBackendUrl || '',
      imageUrl: project.imageUrl || '',
      imagesString: project.images ? project.images.join(', ') : project.imageUrl,
      videoUrl: project.videoUrl || '',
      status: project.status,
      date: project.date || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id).unwrap();
        toast.success('Project deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete project.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    let newUrls = [];
    
    for (const file of files) {
      const isImage = file.type.startsWith('image/') || file.name.toLowerCase().match(/\.(heic|heif|jpg|jpeg|png|gif|webp)$/);
      if (!isImage) {
        toast.error(`File ${file.name} is not an image.`);
        continue;
      }
      
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Max size is 20MB.`);
        continue;
      }
      
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      try {
        const response = await uploadFile(formDataUpload).unwrap();
        newUrls.push(response.url);
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
    
    if (newUrls.length > 0) {
      toast.success(`${newUrls.length} image(s) uploaded successfully!`);
      setFormData(prev => {
        const currentImages = prev.imagesString ? prev.imagesString.split(',').map(u => u.trim()).filter(Boolean) : [];
        const combined = [...currentImages, ...newUrls].join(', ');
        return { ...prev, imagesString: combined };
      });
    }
    
    e.target.value = '';
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/') || file.name.toLowerCase().match(/\.(mp4|webm|ogg|mov|mkv|avi)$/);
    if (!isVideo) {
      toast.error(`File ${file.name} is not a valid video.`);
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error(`Video file ${file.name} is too large. Max size is 100MB.`);
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    const toastId = toast.loading('Uploading video file...');
    try {
      const response = await uploadFile(formDataUpload).unwrap();
      setFormData(prev => ({ ...prev, videoUrl: response.url }));
      toast.success('Video uploaded successfully!', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload video', { id: toastId });
    }

    e.target.value = '';
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const techStack = formData.techStackString
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);

    const images = formData.imagesString
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const mainImageUrl = images[0] || formData.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60';

    const projectData = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      techStack,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      githubBackendUrl: formData.githubBackendUrl,
      imageUrl: mainImageUrl,
      images: images.length > 0 ? images : [mainImageUrl],
      videoUrl: formData.videoUrl,
      status: formData.status,
      date: formData.date
    };

    try {
      if (currentProject) {
        await updateProject({ id: currentProject.id, ...projectData }).unwrap();
        toast.success('Project updated successfully!');
      } else {
        await createProject(projectData).unwrap();
        toast.success('Project created successfully!');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to save project: ' + (err?.data?.message || 'Server error'));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Project Manager</h1>
          <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Configure project cards dynamically featured on your homepage and portfolio.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-650 hover:bg-purple-550 shadow-md shadow-purple-500/10 cursor-pointer transition-all"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Projects List Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400">
            <thead className="text-[10px] uppercase font-bold text-slate-450 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type / Category</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-855">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200/20">
                        <img src={project.imageUrl || null} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-250 block">{project.title}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-550">{project.date}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        project.type === 'client' 
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {project.type === 'client' ? <Briefcase size={10} /> : <Monitor size={10} />}
                        {project.type}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-505">{project.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-150 dark:bg-slate-800 text-[10px] text-slate-650 dark:text-slate-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      project.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : project.status === 'In Progress'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-505/10 text-slate-600 dark:text-slate-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-1.5 rounded-lg text-slate-450 hover:text-purple-600 hover:bg-slate-105 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-lg text-slate-450 hover:text-red-650 hover:bg-slate-105 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl p-6 rounded-2xl border border-slate-200/50 dark:border-slate-805 bg-white dark:bg-slate-900 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto z-10 animate-slide-up">
            
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800 pb-3">
              <h2 className="text-base font-black text-slate-800 dark:text-white">
                {currentProject ? 'Edit Project Details' : 'Add New Portfolio Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 hover:bg-slate-105 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors"
                  placeholder="e.g. SpeedRing Core Engine"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors resize-none"
                  placeholder="Brief description summarizing key results..."
                />
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Project Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                  >
                    <option value="personal">Personal Project</option>
                    <option value="client">Client Project</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                  >
                    <option value="Frontend">Frontend Dev</option>
                    <option value="Backend">Backend Dev</option>
                    <option value="Fullstack">Full-Stack Dev</option>
                    <option value="UI/UX">UI/UX Layout</option>
                  </select>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 dark:text-slate-400">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  name="techStackString"
                  value={formData.techStackString}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors"
                  placeholder="e.g. React, Node.js, Express, Postgres, Docker"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Frontend / Main Repo</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Backend Repo (Optional)</label>
                  <input
                    type="url"
                    name="githubBackendUrl"
                    value={formData.githubBackendUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* Images Array Field (comma-separated URLs) */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="font-bold text-slate-500 dark:text-slate-400">Showcase Image Gallery</label>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Image #1 will automatically be used as the Main Cover Image.</p>
                  </div>
                  <label className="cursor-pointer text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                    {isUploading ? (
                      <span className="animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <Plus size={12} /> Upload Images
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </>
                    )}
                  </label>
                </div>
                {/* Visual Preview with Ordering & Main Cover Controls */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {formData.imagesString ? (() => {
                    const imgList = formData.imagesString.split(',').map(u => u.trim()).filter(Boolean);
                    if (imgList.length === 0) return null;
                    return imgList.map((url, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 w-28 h-28 bg-slate-100 dark:bg-slate-900 shadow-sm">
                        <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {/* Number Badge */}
                        <span className={`absolute top-1.5 left-1.5 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md z-10 ${
                          idx === 0 
                            ? 'bg-amber-500 text-white' 
                            : 'bg-slate-900/80 text-white border border-slate-700'
                        }`}>
                          {idx === 0 ? '★ Cover (#1)' : `#${idx + 1}`}
                        </span>

                        {/* Control Overlay */}
                        <div className="absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 z-20">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...imgList];
                                const [target] = list.splice(idx, 1);
                                list.unshift(target);
                                setFormData(prev => ({ ...prev, imagesString: list.join(', ') }));
                              }}
                              className="text-[9px] font-extrabold px-2 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors w-full text-center"
                            >
                              Make Cover (#1)
                            </button>
                          )}

                          <div className="flex items-center gap-1">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...imgList];
                                  const temp = list[idx];
                                  list[idx] = list[idx - 1];
                                  list[idx - 1] = temp;
                                  setFormData(prev => ({ ...prev, imagesString: list.join(', ') }));
                                }}
                                className="px-2 py-1 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-white rounded"
                                title="Move Left"
                              >
                                ←
                              </button>
                            )}

                            {idx < imgList.length - 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const list = [...imgList];
                                  const temp = list[idx];
                                  list[idx] = list[idx + 1];
                                  list[idx + 1] = temp;
                                  setFormData(prev => ({ ...prev, imagesString: list.join(', ') }));
                                }}
                                className="px-2 py-1 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-white rounded"
                                title="Move Right"
                              >
                                →
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const list = imgList.filter((_, i) => i !== idx);
                              setFormData(prev => ({ ...prev, imagesString: list.join(', ') }));
                            }}
                            className="flex items-center gap-1 text-[9px] font-bold text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    ));
                  })() : (
                    <div className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400">
                      <p className="text-sm">No images uploaded yet</p>
                      <p className="text-xs mt-1">Click "Upload Images" to add to gallery</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Video (Optional) */}
              <div className="space-y-2 pt-2 border-t border-slate-200/50 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Video size={14} className="text-purple-500" />
                      Project Video Demo (Optional)
                    </label>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      Upload an MP4/WebM video or paste a video URL.
                    </p>
                  </div>
                  <label className="cursor-pointer text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1 rounded-full transition-colors flex items-center gap-1">
                    {isUploading ? (
                      <span className="animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <Plus size={12} /> Upload Video
                        <input 
                          type="file" 
                          accept="video/*" 
                          className="hidden" 
                          onChange={handleVideoUpload}
                          disabled={isUploading}
                        />
                      </>
                    )}
                  </label>
                </div>

                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-purple-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-655 transition-colors"
                  placeholder="https://example.com/demo.mp4 or uploaded video URL"
                />

                {formData.videoUrl && (
                  <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-black max-h-48 group">
                    <video
                      src={formData.videoUrl}
                      controls
                      className="w-full max-h-48 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow-md z-10"
                      title="Remove Video"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Project Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white dark:focus:bg-slate-900"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 dark:text-slate-400">Date (YYYY-MM)</label>
                  <input
                    type="month"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-550/5 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-705 dark:text-slate-350 hover:bg-slate-105 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-white bg-purple-650 hover:bg-purple-550 shadow cursor-pointer font-bold"
                >
                  {currentProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageProjects;
