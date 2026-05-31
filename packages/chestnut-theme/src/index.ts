// Types
export type {
  SiteConfig,
  ThemeConfig,
  NavItem,
  RoutesConfig,
} from './types/site';
export type {
  SeriesConfig,
  SeriesData,
  SortField,
  SortOrder,
} from './types/series';
export type {
  PostCardProps,
  PostData,
} from './types/blog';
export type {
  HeroProps,
  SeriesSectionProps,
  SeriesCardProps,
  SidebarProps,
} from './types/components';

// Utils
export { formatDate } from './utils/date';
export { estimateReadingTime } from './utils/reading-time';
export { themes, defaultTheme } from './utils/themes';
export type { Theme } from './utils/themes';

// Content utilities
export { getTagStats, buildSidebarData, groupDocsByCategory } from './utils/content';
export type { TagCount, SidebarData, DocNavItem, DocCategory, DocsGroupResult } from './utils/content';

// Styles — imported for side effects when needed
// import './styles/global.css';
