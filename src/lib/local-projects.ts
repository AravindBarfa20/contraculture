import { Project, CopyString } from '@/types';

const STORAGE_KEY = 'contraculture_projects';

// Helper to check if we are in browser
const isBrowser = typeof window !== 'undefined';

const saveProjects = (projects: Project[]): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

export const getProjects = (): Project[] => {
  if (!isBrowser) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : [];
    // Sort by created_at desc
    return projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('Error getting projects from localStorage:', error);
    return [];
  }
};

export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find((p) => p.id === id) || null;
};

export interface CreateProjectData {
  name: string;
  description: string;
  target_locales: string[];
  copy_strings: Array<{ string_key: string; content: string; string_type: string; sort_order: number }>;
}

export const createProject = (data: CreateProjectData): Project => {
  const projects = getProjects();
  const now = new Date().toISOString();
  const projectId = crypto.randomUUID();

  const newProject: Project = {
    id: projectId,
    name: data.name,
    description: data.description,
    source_locale: 'en', // default source locale
    target_locales: data.target_locales,
    status: 'draft',
    created_at: now,
    updated_at: now,
    copy_strings: data.copy_strings.map((cs) => ({
      id: crypto.randomUUID(),
      project_id: projectId,
      string_key: cs.string_key,
      content: cs.content,
      string_type: cs.string_type,
      persuasion_category: null,
      persuasion_scores: {},
      sort_order: cs.sort_order,
      created_at: now,
    })),
    simulation_results: [],
  };

  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = (id: string, data: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProject = {
    ...projects[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  projects[index] = updatedProject;
  saveProjects(projects);
  return updatedProject;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const initialLength = projects.length;
  const filteredProjects = projects.filter((p) => p.id !== id);
  
  if (filteredProjects.length !== initialLength) {
    saveProjects(filteredProjects);
    return true;
  }
  return false;
};
