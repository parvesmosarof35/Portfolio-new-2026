import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      "https://portfolio-backend-silk-eight.vercel.app/api"
    );
  }
};

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Profile", "Services", "Projects", "Experiences", "Messages"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
    }),

    // Profile endpoints
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "profile" }),
          });
        } catch {}
      },
    }),

    // Services endpoints
    getServices: builder.query({
      query: () => "/services",
      providesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Services"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "services" }),
          });
        } catch {}
      },
    }),
    updateService: builder.mutation({
      query: ({ id, ...serviceData }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: serviceData,
      }),
      invalidatesTags: ["Services"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "services" }),
          });
        } catch {}
      },
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "services" }),
          });
        } catch {}
      },
    }),

    // Projects endpoints
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Projects"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "projects" }),
          });
        } catch {}
      },
    }),
    updateProject: builder.mutation({
      query: ({ id, ...projectData }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: projectData,
      }),
      invalidatesTags: ["Projects"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "projects" }),
          });
        } catch {}
      },
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "projects" }),
          });
        } catch {}
      },
    }),

    // Experiences endpoints
    getExperiences: builder.query({
      query: () => "/experiences",
      providesTags: ["Experiences"],
    }),
    createExperience: builder.mutation({
      query: (experienceData) => ({
        url: "/experiences",
        method: "POST",
        body: experienceData,
      }),
      invalidatesTags: ["Experiences"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "experiences" }),
          });
        } catch {}
      },
    }),
    updateExperience: builder.mutation({
      query: ({ id, ...experienceData }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: experienceData,
      }),
      invalidatesTags: ["Experiences"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "experiences" }),
          });
        } catch {}
      },
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          fetch("/api/revalidate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: "experiences" }),
          });
        } catch {}
      },
    }),

    // Messages endpoints
    getMessages: builder.query({
      query: () => "/messages",
      providesTags: ["Messages"],
    }),
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "/messages",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["Messages"],
    }),
    markMessageRead: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),

    // File upload endpoints
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useMarkMessageReadMutation,
  useDeleteMessageMutation,
  useUploadFileMutation,
} = portfolioApi;
