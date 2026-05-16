export interface NavItem {
  href: string;
  label: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  avatar: string;
  bio: string;
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
    emptyText: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
}
