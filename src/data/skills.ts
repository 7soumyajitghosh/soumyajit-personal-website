export type Skill = {
  name: string;
  group: string;
};

// EDITABLE: treat as a living list of tools you use — not a proficiency claim.
export const skills: Skill[] = [
  { name: "JavaScript", group: "LANGUAGE" },
  { name: "TypeScript", group: "LANGUAGE" },
  { name: "React", group: "FRONTEND" },
  { name: "Vite", group: "TOOLING" },
  { name: "Tailwind CSS", group: "STYLING" },
  { name: "Git & GitHub", group: "WORKFLOW" },
  { name: "AI APIs", group: "EXPLORING" },
  { name: "Model integrations", group: "EXPLORING" },
];

export const profileFacts = [
  {
    title: "Build-first mindset",
    note: "Learn by making real things",
    symbol: "↗",
  },
  {
    title: "AI-curious explorer",
    note: "Interfaces, assistants, tooling",
    symbol: "◎",
  },
  {
    title: "Open to collaboration",
    note: "Ideas, feedback, experiments",
    symbol: "✳",
  },
] as const;
