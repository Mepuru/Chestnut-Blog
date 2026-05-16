export type SortField = 'pubDate' | 'week' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface SeriesConfig {
  id: string;
  title: string;
  description: string;
  countLabel: string;
  link: string;
  collection: string;
  align: 'left' | 'right';
  sortField: SortField;
  sortOrder: SortOrder;
}

export const seriesConfig: SeriesConfig[] = [
  {
    id: 'blog',
    title: '博客',
    description: '散装的技术与生活记录',
    countLabel: '篇文章',
    link: '/blog',
    collection: 'blog',
    align: 'left',
    sortField: 'pubDate',
    sortOrder: 'desc',
  },
  {
    id: 'docs',
    title: '文档',
    description: '技术文档与知识整理',
    countLabel: '篇文档',
    link: '/docs',
    collection: 'docs',
    align: 'right',
    sortField: 'pubDate',
    sortOrder: 'desc',
  },
];
