# 开发规范

> Maroon 项目开发约定与最佳实践

---

## 命名约定

| 类别 | 规则 | 示例 |
|---|---|---|
| 组件文件 | PascalCase | `Header.astro`, `PostCard.astro`, `DocsSidebar.astro` |
| 页面路由 | 动态参数用 `[]`，其余 kebab-case | `[...slug].astro`, `[tag].astro`, `index.astro` |
| 工具函数 | camelCase | `formatDate()`, `estimateReadingTime()`, `getPublishedPosts()` |
| 类型/接口 | PascalCase | `SiteConfig`, `PostCardProps`, `RoutesConfig` |
| CSS 类名 | kebab-case | `.post-card`, `.nav-links`, `.sidebar-toggle` |
| CSS 变量 | kebab-case, `--` 前缀 | `--header-height`, `--font-size-hero-title` |
| 目录名 | kebab-case | `shared/`, `home/`, `blog/`, `docs/` |

---

## 组件结构

每个组件遵循 **同名文件对** 规则：

```
src/components/Header.astro      # 模板 + 逻辑
src/components/Header.css        # 样式（通过 @import 引用）
```

```astro
---
// 逻辑代码放在 frontmatter 中
import type { Props } from '../types';
---
<style>
  @import './Header.css';    /* 引入同目录下的 CSS 文件 */
</style>

<!-- HTML 模板 -->
```

**原则：**
- CSS 独立文件管理，不内联 `<style>` 标签（除非极简单的 1–3 条样式）
- 组件 props 优先用类型接口，定义在组件内或从 `astro-maroon/types` 导入
- 每个组件只做一件事

---

## 导入顺序

按以下分组排列，每组之间空一行：

```astro
---
// 1. Astro 内置
import { ViewTransitions } from 'astro:transitions';
import { getCollection, render } from 'astro:content';

// 2. 主题包组件/布局
import BaseLayout from 'astro-maroon/layouts/BaseLayout.astro';

// 3. 本地工具函数
import { buildBlogSidebar, computePrevNext } from '../../content/utils';

// 4. 类型
import type { PostCardProps } from 'astro-maroon/types';

// 5. 样式
import 'astro-maroon/styles/layout.css';
---
```

---

## CSS 规范

### 变量驱动

优先使用 CSS 自定义属性（`var(--xxx)`），**禁止**在组件样式中硬编码颜色、尺寸、圆角值。所有主题色在 `packages/astro-maroon/src/styles/base.css` 的 `[data-theme="xxx"]` 中定义。

```css
/* ✅ 正确 */
.post-nav-link {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--fg);
}

/* ❌ 避免 */
.post-nav-link {
  border: 1px solid #ede8e0;
  border-radius: 12px;
  color: #3a3632;
}
```

### 响应式断点

| 断点 | 说明 |
|---|---|
| `max-width: 768px` | 手机端 |
| `max-width: 1200px` | 平板端（隐藏 TOC、调整布局） |
| `min-width: 769px` | 桌面端 |

### 注释区块

使用区块注释分隔不同区域：

```css
/* ============================================
   Header 样式
   ============================================ */
```

### 过渡动画

主题切换相关属性统一使用 `0.5s cubic-bezier(0.4, 0, 0.2, 1)`：

```css
transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

交互反馈（hover/focus）使用 `0.2s ease`。

---

## TypeScript 规范

- **严格模式** — `tsconfig.json` 继承 `astro/tsconfigs/strict`
- **Props 接口** — 尽量先用 `interface` 而非 `type`，仅在需要联合/交叉时用 `type`
- **避免 `any`** — 优先 `unknown` + 类型收窄
- **公共类型** — 放在 `packages/astro-maroon/src/types/` 中，通过 `astro-maroon/types` 导入
- **组件 Props** — 定义在组件内或从主题包导入：

```astro
---
interface Props {
  title: string;
  headings?: Array<{ depth: number; slug: string; text: string }>;
}

const { title, headings = [] } = Astro.props;
---
```

---

## 内容创作

### 博客文章

```
src/content/blog/your-post.md
```

```yaml
---
title: 文章标题
description: 文章简介
pubDate: 2026-05-16
tags: [Astro, TypeScript]
draft: false
---
```

- `draft: true` 时构建自动过滤
- 图片放 `public/images/` 下，引用 `/images/xxx.png`

### 文档文章

```
src/content/docs/your-doc.md
```

```yaml
---
title: 文档标题
pubDate: 2026-05-16
category: Astro    # 可选，侧边栏按此分组折叠
draft: false
---
```

### 独立页面

1. 在 `src/content/pages/` 下创建 `.md` 文件
2. 在 `src/pages/` 下创建对应的路由 `.astro` 文件
3. 路由文件中用 `getEntry('pages', 'id')` 获取内容

---

## 工作流

### 本地开发

```bash
npm run dev        # 启动开发服务器（热更新）
npm run build      # 生产构建 + Pagefind 搜索索引
npm run preview    # 预览构建产物
```

### Git 提交

commit message 用中文，前缀标识改动类型：

```
feat:     新功能
fix:      修复问题
refactor: 重构（不改功能）
docs:     文档更新
style:    代码格式清理（不影响逻辑）
chore:    构建配置/工具更新
```

示例：

```
feat: 博客详情页增加上下篇导航
fix: 表格溢出导致页面横向滚动
refactor: 路径配置统一化 — 硬编码集中到 Astro.locals.site.routes
docs: 更新架构文档和 README
```

---

## 配置体系

### Registry 驱动一切（核心）

`src/content/registry.ts` 是**唯一配置入口**。导航、URL 路径、首页系列卡片、标签聚合全部由此自动推导。

```typescript
export const contentRegistry: ContentTypeConfig[] = [
  {
    id: 'blog',
    label: '博客',
    route: { prefix: '/blog', pattern: '/blog/[slug]' },
    layout: 'post',
    sidebarIncluded: true,
    showInNav: true,
    hasTags: true,            // ← 控制标签页和侧边栏的标签聚合
    series: {
      description: '散装的技术与生活记录',
      countLabel: '篇文章',
      sortField: 'pubDate',
      sortOrder: 'desc',
    },
  },
  // ...
];
```

自动推导函数（`registry.ts` 导出）：

| 函数 | 生成内容 | 被谁消费 |
|------|---------|---------|
| `generateRoutes()` | 路由表 → `Astro.locals.site.routes` | 所有组件读取路径 |
| `generateNavItems()` | 导航栏 → `siteConfig.nav` | Header 渲染 |
| `generateSeriesConfigs()` | 系列配置 → 首页 | 首页 SeriesCard |
| `generateTaggableCollections()` | 带 tags 的 collection 列表 | 标签页 + 侧边栏标签云 |

### Middleware 注入

`src/middleware.ts` 在每次请求时将配置注入 `Astro.locals.site`：

```ts
context.locals.site = {
  ...siteConfig,       // title, avatar, bio, nav（由 registry 生成）...
  themes,              // 主题列表（来自主题包）
  defaultTheme,        // 默认主题
  routes,              // 路由表（由 registry 生成）
};
```

Layout 读取优先级：`props → Astro.locals.site → 硬编码兜底`

### 站点个性化

`src/config/site.ts` 中的 `siteConfig` 控制：

```ts
{
  title: '栗かな',      // 站点标题
  author: '栗かな',     // 作者
  avatar: '/icon.png',  // 头像
  bio: '日语专业...',   // 简介
  social: { github },   // 社交链接
  footer: { icp },      // 备案号
  docs: { emptyTexts }, // 文档空状态文案
}
```

导航由 registry 自动生成，如需自定义可在 `site.ts` 中覆盖 `nav` 字段。

---

## 项目结构

```
maroon/
├── packages/
│   └── astro-maroon/        # 独立主题包
│       ├── src/
│       │   ├── components/     # UI 组件
│       │   │   ├── blog/       #   PostCard
│       │   │   ├── docs/       #   DocsSidebar
│       │   │   ├── home/       #   Hero, SeriesCard, SeriesSection
│       │   │   ├── shared/     #   Sidebar, TOC, PageNav ⭐
│       │   │   ├── Header.astro / Footer.astro / Search.astro
│       │   ├── layouts/
│       │   │   ├── BaseLayout.astro   # 根布局
│       │   │   ├── PostLayout.astro   # 博客文章
│       │   │   └── DocsLayout.astro    # 文档
│       │   ├── styles/          # CSS 变量、排版、布局
│       │   ├── types/           # SiteConfig, RoutesConfig, PostCardProps...
│       │   └── utils/           # formatDate, estimateReadingTime, themes, content
│       └── package.json
│
├── src/                       # 主应用 — 胶水层
│   ├── config/
│   │   └── site.ts            # ⭐ 站点配置（唯一修改入口）
│   ├── content/
│   │   ├── blog/ / docs/ / pages/  # Markdown 内容
│   │   ├── registry.ts        # ⭐ 内容类型注册表（核心配置）
│   │   └── utils.ts           # 查询工具 + helper 函数
│   ├── content.config.ts      # Zod Schema
│   ├── middleware.ts           # 配置注入
│   ├── env.d.ts               # Locals 类型声明
│   └── pages/                 # 路由（极薄胶水层）
├── tsconfig.json              # 路径别名 → 主题包
└── astro.config.mjs
```

---

## 新增内容类型完整流程

以新增"笔记"类型为例，需完成以下 4 步：

### 1. Registry 注册

`src/content/registry.ts` 加一条配置：

```typescript
{
  id: 'notes',
  label: '笔记',
  route: { prefix: '/notes', pattern: '/notes/[slug]' },
  layout: 'post',              // 使用 PostLayout 样式
  sidebarIncluded: false,
  showInNav: true,             // 导航栏自动出现
  hasTags: true,               // 如果前端有 tags 字段，设为 true 则标签页自动聚合
  series: {
    description: '学习笔记',
    countLabel: '篇笔记',
    sortField: 'pubDate',
    sortOrder: 'desc',
  },                           // 首页自动出现系列卡片
}
```

### 2. Zod Schema

`src/content.config.ts` 中定义集合：

```typescript
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({ title: z.string(), pubDate: z.coerce.date(), draft: z.boolean().default(false) }),
});
export const collections = { blog, docs, pages, notes };
```

### 3. 内容目录

`src/content/notes/` 下放 `.md` 文件。

### 4. 路由文件

`src/pages/notes/` 下创建两个极简文件：

**`src/pages/notes/index.astro`**
```astro
---
import BaseLayout from 'astro-maroon/layouts/BaseLayout.astro';
import PostCard from 'astro-maroon/components/blog/PostCard.astro';
import 'astro-maroon/styles/layout.css';
import { getPublishedPosts } from '../../content/utils';

const posts = await getPublishedPosts();
---
<BaseLayout title="笔记">
  <h1 class="page-title">笔记</h1>
  <!-- 渲染列表 -->
</BaseLayout>
```

**`src/pages/notes/[...slug].astro`**
```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from 'astro-maroon/layouts/PostLayout.astro';
import { estimateReadingTime } from 'astro-maroon/utils/reading-time';
import 'astro-maroon/styles/layout.css';
import { buildBlogSidebar, computePrevNext } from '../../content/utils';

export async function getStaticPaths() { /* 同 blog */ }
const post = Astro.props;
const { Content, headings } = await render(post);
const ctx = Astro.locals.site;
const { posts, sidebarData } = await buildBlogSidebar(ctx);
const { prev, next } = computePrevNext(posts, post.id);
---
<PostLayout sidebar={false} ...>
  <Content />
</PostLayout>
```

**完成后自动生效**：导航栏出现"笔记"入口、首页出现系列卡片、URL `/notes/xxx` 自动可用。

---

## 共享组件

| 组件 | 位置 | 用途 | 使用方式 |
|------|------|------|---------|
| **Sidebar** | `shared/Sidebar.astro` | 博客侧边栏（个人资料+标签云） | 由 BaseLayout 按需渲染 |
| **TOC** | `shared/TOC.astro` | 文章目录（h2/h3 自动高亮） | `<TOC headings={headings} />` |
| **PageNav** | `shared/PageNav.astro` | 上下篇导航 | `<PageNav prev={prev} next={next} prefix="/blog" />` |
| **PostCard** | `blog/PostCard.astro` | 文章卡片 | `<PostCard title slug pubDate ... />` |
| **DocsSidebar** | `docs/DocsSidebar.astro` | 文档分类导航 | 由 DocsLayout 自动渲染 |

### Astro.locals.site 可用字段

所有布局和组件可安全读取以下字段（带可选链）：

```typescript
Astro.locals.site = {
  title, description, author, avatar, icon, bio,  // 站点信息
  nav: [{ href, label }],                          // 导航栏（registry 生成）
  social: { github },                              // 社交链接
  footer: { icp, icpUrl },                         // 备案号
  docs: { emptyTexts },                            // 文档空状态
  themes: [{ id, name }],                          // 主题列表
  defaultTheme,                                    // 默认主题
  routes: { blog, docs, tags, about, home, icon, [key: string]: ... }, // 路由表
};
```

---

## 主题系统

三套预设主题：**奶油（cream）** / **樱花（sakura）** / **星空（starry）**

通过 CSS 自定义属性 + `data-theme` 属性切换。主题切换由 Header 的 theme-switcher 控制，选择写入 `localStorage`。

### 增加新主题

改主题包的两个文件：

1. `packages/astro-maroon/src/utils/themes.ts` 加 `{ id, name }`
2. `packages/astro-maroon/src/styles/base.css` 加 `[data-theme="xxx"]` 变量块

必须覆盖的 CSS 变量：
`--bg`, `--fg`, `--accent`, `--accent-light`, `--border`, `--muted`, `--card-bg`, `--code-bg`, `--header-bg`, `--search-bg`, `--shadow-*`, `--gradient-*`, `--theme-label`, `--radius-*`

---

## 常见陷阱

### Astro 模板变量

```astro
<!-- ✅ 正确：无引号表示变量 -->
<a href={blogPrefix}>返回列表</a>

<!-- ❌ 错误：带引号是字面量，渲染为 "{blogPrefix}" -->
<a href="{blogPrefix}">返回列表</a>
```

### 表格溢出

表格内容过宽会撑破页面布局，导致固定定位的 TOC 按钮偏移。已通过 `prose.css` 全局修复：
```css
.prose table { display: block; max-width: 100%; overflow-x: auto; }
```

### flex 项溢出

`white-space: nowrap` + `flex: 1` 的容器必须加 `min-width: 0` 才能正确截断：
```css
.flex-item { flex: 1; min-width: 0; }
```

### 给后续开发者 / AI 的规则

1. **每个逻辑阶段完成后必须 `git commit`**
2. **不在组件中硬编码路径/文案**——一律从 `Astro.locals.site.routes` 读取
3. **新增内容查询用 `src/content/utils.ts` 的工具函数**，不重复写 `getCollection().filter().sort()`
4. **所有 `getCollection` 必须包裹 try/catch**
5. **CSS 尺寸用变量**（`--sidebar-width`、`--header-height`）
6. **发布前先 `npm run build`** 验证零报错
7. **改代码后同步更新本文档**
