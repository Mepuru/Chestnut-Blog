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
    id: 'lessons',
    title: '日语教案',
    description: '每周系统的日语学习',
    countLabel: '节课',
    link: '/lessons',
    collection: 'lessons',
    align: 'right',
    sortField: 'week',
    sortOrder: 'desc',
  },
];
