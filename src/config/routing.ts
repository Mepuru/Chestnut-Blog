/**
 * URL 路由模板集中管理
 *
 * 所有页面路径的生成规则都定义在这里，而不是硬编码在组件中。
 * 修改路径前缀只需改这一个文件。
 *
 * @example
 *   routes.blog.pattern   // '/blog/[slug]'
 *   generatePath('blog', { slug: 'hello-world' })  // '/blog/hello-world'
 */

export const routes = {
  blog: {
    prefix: '/blog',
    pattern: '/blog/[slug]',
  },
  docs: {
    prefix: '/docs',
    pattern: '/docs/[slug]',
  },
  tags: {
    prefix: '/tags',
    pattern: '/tags/[tag]',
  },
  about: '/about',
  home: '/',
  icon: '/icon.png',
} as const;

export type RouteKey = keyof typeof routes;

/**
 * 根据路由 key 和参数生成完整路径
 */
export function generatePath(
  routeKey: Extract<RouteKey, 'blog' | 'docs'>,
  params: { slug: string },
): string;
export function generatePath(
  routeKey: Extract<RouteKey, 'tags'>,
  params: { tag: string },
): string;
export function generatePath(
  routeKey: Extract<RouteKey, 'about' | 'home'>,
): string;
export function generatePath(
  routeKey: RouteKey,
  params?: Record<string, string>,
): string {
  const route = routes[routeKey];
  if (typeof route === 'string') return route;

  if (!params) return route.prefix;

  let path = route.pattern;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`[${key}]`, encodeURIComponent(value));
  }
  return path;
}
