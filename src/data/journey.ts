export type JourneyMilestone = {
  id: string;
  /** Display label, e.g. "2024" or "Phase 01". */
  date: string;
  title: string;
  description: string;
};

// Journey milestones — update dates/titles/descriptions as the journey evolves.
export const journey: JourneyMilestone[] = [
  {
    id: "fundamentals",
    date: "Phase 01",
    title: "Learning programming fundamentals",
    description:
      "Variables, control flow, functions, and problem-solving — building a solid base through practice and small exercises.",
  },
  {
    id: "web-apps",
    date: "Phase 02",
    title: "Building web applications",
    description:
      "HTML, CSS, JavaScript, React and Vite — turning static pages into interactive apps and learning to ship them.",
  },
  {
    id: "ai-integrations",
    date: "Phase 03",
    title: "Exploring AI integrations",
    description:
      "Calling AI APIs, designing prompts, and prototyping assistants and tools that feel genuinely useful.",
  },
  {
    id: "personal-projects",
    date: "Now",
    title: "Developing personal projects",
    description:
      "Karishma AI, AI Studio concepts, and open experiments — learning in public and iterating one build at a time.",
  },
];
