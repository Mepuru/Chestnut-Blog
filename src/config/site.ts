export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  social: {
    github?: string;
    twitter?: string;
    email?: string;
  };
}

export const siteConfig: SiteConfig = {
  title: '栗かな',
  description: '记录生活与技术的个人博客',
  author: '栗かな',
  social: {
    github: 'https://github.com/Mepuru',
  },
};

export const defaultTitle = siteConfig.title;
export const defaultDescription = siteConfig.description;
