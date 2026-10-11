// Central site configuration. Edit these values to personalize the site.
// Nothing here is a secret — all values are public frontend content.
export const site = {
  name: "Soumyajit Ghosh",
  wordmark: "SG",
  headline: "Developer & AI Builder",
  email: "hello@soumyajit.dev", // TODO: replace with your real public contact email
  github: "https://github.com/soumyajit", // TODO: replace with your real GitHub profile URL
  // Profile photo lives at public/images/profile.jpg.
  // Replace that file with your own photo (square, >= 800px recommended).
  profileImage: "/images/profile.jpg",
} as const;

export type SiteConfig = typeof site;
