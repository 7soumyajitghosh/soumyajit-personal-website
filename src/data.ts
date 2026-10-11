export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accent: "lime" | "violet" | "blue";
  status: string;
  href?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Karishma AI",
    category: "AI ASSISTANT",
    description:
      "A friendly AI companion concept exploring useful conversations, personal workflows, and thoughtful interface design.",
    tags: ["React", "AI", "TypeScript"],
    accent: "lime",
    status: "In progress",
    // TODO: Replace with the real repository or live demo URL.
    href: "",
  },
  {
    number: "02",
    title: "Coding Journey",
    category: "LEARNING IN PUBLIC",
    description:
      "A growing collection of programming exercises, notes, and small builds that document progress over time.",
    tags: ["JavaScript", "C", "Git"],
    accent: "violet",
    status: "Ongoing",
    // TODO: Add your coding-learning repository URL.
    href: "",
  },
  {
    number: "03",
    title: "Future Experiments",
    category: "PLAYGROUND",
    description:
      "A space for testing new web interactions, AI ideas, and creative prototypes before they become bigger projects.",
    tags: ["Web", "Experiments", "AI"],
    accent: "blue",
    status: "Exploring",
    href: "",
  },
];

export const skills = [
  { name: "React", group: "FRONTEND" },
  { name: "TypeScript", group: "FRONTEND" },
  { name: "JavaScript", group: "LANGUAGE" },
  { name: "HTML & CSS", group: "WEB" },
  { name: "Git & GitHub", group: "WORKFLOW" },
  { name: "AI tooling", group: "EXPLORING" },
];

export const journey = [
  {
    date: "NOW",
    title: "Building in public",
    description:
      "Turning ideas into small, shippable projects and documenting what each experiment teaches me.",
  },
  {
    date: "NEXT",
    title: "Deeper engineering",
    description:
      "Strengthening fundamentals, writing cleaner code, and learning to test, deploy, and maintain projects.",
  },
  {
    date: "ONGOING",
    title: "Exploring AI",
    description:
      "Experimenting with AI-powered products, useful developer tools, and human-friendly interfaces.",
  },
];