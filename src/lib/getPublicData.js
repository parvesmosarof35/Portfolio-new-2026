const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "https://portfolio-backend-silk-eight.vercel.app/api";
};

export async function getProfile() {
  try {
    const res = await fetch(`${getApiUrl()}/profile`, {
      next: { tags: ["profile"] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${getApiUrl()}/projects`, {
      next: { tags: ["projects"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id) {
  try {
    const res = await fetch(`${getApiUrl()}/projects/${id}`, {
      next: { tags: [`project-${id}`, "projects"] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

export async function getServices() {
  try {
    const res = await fetch(`${getApiUrl()}/services`, {
      next: { tags: ["services"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getExperiences() {
  try {
    const res = await fetch(`${getApiUrl()}/experiences`, {
      next: { tags: ["experiences"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}
