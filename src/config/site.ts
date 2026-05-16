import type { SiteConfig } from '../types/site';

export const siteConfig: SiteConfig = {
  title: '栗かな',
  description: '记录生活与技术的个人博客',
  author: '栗かな',
  avatar: '/icon.png',
  bio: '日语专业 / 技术探索中',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/docs', label: '文档' },
    { href: '/about', label: '关于' },
  ],
  social: {
    github: 'https://github.com/Mepuru',
  },
  footer: {
    icp: '鲁ICP备2024121288号',
    icpUrl: 'https://beian.miit.gov.cn/',
  },
  docs: {
    emptyTexts: [
      '『 四季轮回 岁岁年年 』',
      '『 花开花落 皆是风景 』',
      '『 行到水穷处 坐看云起时 』',
      '『 此心安处是吾乡 』',
    ],
  },
};

export const defaultTitle = siteConfig.title;
export const defaultDescription = siteConfig.description;
