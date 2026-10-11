export type JourneyMilestone = {
  id: string;
  /** Display label, e.g. "2024" or "Phase 01". Mark placeholders with "Editable". */
  date: string;
  title: string;
  description: string;
  /** Set true for sample entries so the UI can label them as editable placeholders. */
  editable: boolean;
};

// EDITABLE PLACEHOLDERS: replace dates/titles/descriptions with your real
// journey. Do not present these as completed achievements until verified.
export const journey: JourneyMilestone[] = [
  {
    id: "fundamentals",
    date: "Phase 01 · Editable",
    title: "Learning programming fundamentals",
    description:
      "Variables, control flow, functions, and problem-solving — building a solid base through practice and small exercises.",
    editable: true,
  },
  {
    id: "web-apps",
    date: "Phase 02 · Editable",
    title: "Building web applications",
    description:
      "HTML, CSS, JavaScript, React and Vite — turning static pages into interactive apps and learning to ship them.",
    editable: true,
  },
  {
    id: "ai-integrations",
    date: "Phase 03 · Editable",
    title: "Exploring AI integrations",
    description:
      "Calling AI APIs, designing prompts, and prototyping assistants and tools that feel genuinely useful.",
    editable: true,
  },
  {
    id: "personal-projects",
    date: "Now · Editable",
    title: "Developing personal projects",
    description:
      "Karishma AI, AI Studio concepts, and open experiments — learning in public and iterating one build at a time.",
    editable: true,
  },
];
