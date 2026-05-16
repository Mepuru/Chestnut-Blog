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
      '『 今天吃什么呢？ 』\n『 是啊，吃什么呢？ 』',
      '『 到处点一点试试看？ 』',
    ],
  },
};

export const defaultTitle = siteConfig.title;
export const defaultDescription = siteConfig.description;
