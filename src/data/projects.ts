export type ProjectCategory = "AI" | "Web Development" | "Experiments";

export type Project = {
  id: string;
  name: string;
  description: string;
  /** Filter category. Must be one of the ProjectCategory values. */
  category: ProjectCategory;
  tags: string[];
  /** e.g. "In progress" | "Ongoing" | "Concept" | "Live" */
  status: string;
  accent: "blue" | "violet" | "cyan";
  /** Verified URLs only. Leave empty when unavailable — UI will show a placeholder note. */
  githubUrl?: string;
  demoUrl?: string;
};

export const PROJECT_FILTERS = [
  "All",
  "AI",
  "Web Development",
  "Experiments",
] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

// EDITABLE: update names, descriptions, tags, statuses and URLs.
// Only add a githubUrl / demoUrl when you have verified it works.
export const projects: Project[] = [
  {
    id: "karishma-ai",
    name: "Karishma AI",
    description:
      "Personal AI chatbot project exploring helpful conversations, memory-aware replies, and a clean chat interface.",
    category: "AI",
    tags: ["TypeScript", "React", "AI APIs"],
    status: "In progress",
    accent: "violet",
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "coding-journey",
    name: "Coding Learning Journey",
    description:
      "Programming practice and progress log — exercises, notes, and small builds documenting growth over time.",
    category: "Web Development",
    tags: ["JavaScript", "TypeScript", "Git"],
    status: "Ongoing",
    accent: "blue",
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "ai-studio",
    name: "AI Studio",
    description:
      "Multi-model AI platform concept for comparing prompts across providers, saving sessions, and testing ideas fast.",
    category: "AI",
    tags: ["React", "Vite", "Model integrations"],
    status: "Concept",
    accent: "cyan",
    githubUrl: "",
    demoUrl: "",
  },
  {
    id: "more-experiments",
    name: "More Experiments",
    description:
      "An extensible collection of small web and AI experiments. New prototypes land here before becoming full projects.",
    category: "Experiments",
    tags: ["Web", "Canvas", "Playground"],
    status: "Exploring",
    accent: "blue",
    githubUrl: "",
    demoUrl: "",
  },
];
