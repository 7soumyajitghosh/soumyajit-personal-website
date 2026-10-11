// Central site configuration. Edit these values to personalize the site.
// Nothing here is a secret — all values are public frontend content.
export const site = {
  name: "Soumyajit Ghosh",
  wordmark: "SG",
  headline: "Developer & AI Builder",
  email: "hello@soumyajit.dev", // TODO: replace with your real public contact email
  github: "https://github.com/soumyajit", // TODO: replace with your real GitHub profile URL
  // Replace with your real social URLs or remove entries you don't use.
  socials: {
    // x: "https://x.com/yourhandle",
    // linkedin: "https://www.linkedin.com/in/yourhandle/",
  },
  // Profile photo lives at public/images/profile.jpg.
  // Replace that file with your own photo (square, >= 800px recommended).
  profileImage: "/images/profile.jpg",
  location: "India",
} as const;

export type SiteConfig = typeof site;
