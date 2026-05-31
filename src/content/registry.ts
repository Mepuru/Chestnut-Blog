/**
 * 内容类型注册表
 *
 * 一切配置的单一入口。新增内容类型只需在此注册一条，
 * URL 路由、首页系列卡片、导航栏入口自动推导生成。
 */

import type { SortField, SortOrder } from '@kurikana/astro-theme/types';

export interface ContentTypeConfig {
  /** 内容类型标识，对应 src/content/ 下的目录名 */
  id: string;
  /** 显示名称，用于导航和标题 */
  label: string;
  /** URL 路径定义 */
  route: {
    prefix: string;     // '/blog'
    pattern: string;    // '/blog/[slug]'
  };
  /** 使用哪个 Layout（'post' = PostLayout, 'doc' = DocsLayout，可扩展） */
  layout: string;
  /** 详情页是否显示侧边栏（作者信息 + 标签云） */
  sidebarIncluded: boolean;
  /** 是否出现在导航栏 */
  showInNav?: boolean;
  /** 是否在 frontmatter 中包含 tags 字段，影响标签页聚合 */
  hasTags?: boolean;
  /** 可选：是否出现在首页的系列卡片区 */
  series?: {
    description: string;
    countLabel: string;
    align?: 'left' | 'right';
    sortField: SortField;
    sortOrder: SortOrder;
  };
}

/**
 * 内容类型注册表
 * 新增一个内容类型，在这里加一条声明即可
 */
export const contentRegistry: ContentTypeConfig[] = [
  {
    id: 'blog',
    label: '博客',
    route: { prefix: '/blog', pattern: '/blog/[slug]' },
    layout: 'post',
    sidebarIncluded: true,
    showInNav: true,
    hasTags: true,
    series: {
      description: '散装的技术与生活记录',
      countLabel: '篇文章',
      align: 'left',
      sortField: 'pubDate',
      sortOrder: 'desc',
    },
  },
  {
    id: 'docs',
    label: '文档',
    route: { prefix: '/docs', pattern: '/docs/[slug]' },
    layout: 'doc',
    sidebarIncluded: false,
    showInNav: true,
    series: {
      description: '技术文档与知识整理',
      countLabel: '篇文档',
      align: 'right',
      sortField: 'pubDate',
      sortOrder: 'desc',
    },
  },
];

// ============================================================
// 自动推导函数
// ============================================================

/** 路由表：由 registry 自动生成 */
export function generateRoutes() {
  const routes: Record<string, { prefix: string; pattern: string } | string> = {
    about: '/about',
    home: '/',
    icon: '/icon.png',
  };
  for (const c of contentRegistry) {
    routes[c.id] = c.route;
  }
  // 兼容 tags 路由（不属于内容类型，手动补充）
  routes['tags'] = { prefix: '/tags', pattern: '/tags/[tag]' };
  return routes as typeof routes & {
    blog: { prefix: string; pattern: string };
    docs: { prefix: string; pattern: string };
    tags: { prefix: string; pattern: string };
    about: string;
    home: string;
    icon: string;
  };
}

/** 导航栏：由 registry 中 showInNav 的条目自动生成 */
export function generateNavItems() {
  const items = contentRegistry
    .filter((c) => c.showInNav)
    .map((c) => ({
      href: c.route.prefix,
      label: c.label,
    }));
  // 首页和关于固定在最前最后
  return [
    { href: '/', label: '首页' },
    ...items,
    { href: '/about', label: '关于' },
  ];
}

/** 返回带有 hasTags 标记的 collection id 列表 */
export function generateTaggableCollections(): string[] {
  return contentRegistry.filter((c) => c.hasTags).map((c) => c.id);
}

/** 系列配置：由 registry 中有 series 字段的条目自动生成 */
export function generateSeriesConfigs() {
  return contentRegistry
    .filter((c) => c.series)
    .map((c) => ({
      id: c.id,
      title: c.label,
      description: c.series!.description,
      countLabel: c.series!.countLabel,
      link: c.route.prefix,
      collection: c.id,
      align: c.series!.align ?? ('left' as const),
      sortField: c.series!.sortField,
      sortOrder: c.series!.sortOrder,
    }));
}
