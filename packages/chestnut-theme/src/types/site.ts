export interface NavItem {
  href: string;
  label: string;
}

export interface RoutesConfig {
  blog: { prefix: string };
  docs: { prefix: string };
  tags: { prefix: string };
  about: string;
  home: string;
  icon: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  avatar: string;
  bio: string;
  icon: string;
  nav: NavItem[];
  social: {
    github?: string;
    twitter?: string;
    email?: string;
  };
  footer: {
    icp?: string;
    icpUrl?: string;
  };
  docs: {
    emptyTexts: string[];
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
}
