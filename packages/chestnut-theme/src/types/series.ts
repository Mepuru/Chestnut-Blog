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

export interface SeriesData extends SeriesConfig {
  count: number;
  recent: Array<{
    id: string;
    data: {
      title: string;
    };
  }>;
}
