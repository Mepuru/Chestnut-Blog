---
title: "Maroon 架构文档"
pubDate: 2026-05-16
category: "Astro"
---

## 项目概述

Maroon 是一个基于 Astro 5 的静态个人博客，支持多主题切换（奶油/樱花/星空）、Markdown 内容管理、ViewTransitions 页面过渡动画。包含**博客**和**文档**两大内容板块，以及标签筛选、全文搜索等功能。

- **技术栈**：Astro 5 + TypeScript + CSS Custom Properties
- **Monorepo**：npm workspaces — 主应用 + `astro-maroon` 主题包
- **构建输出**：纯静态 HTML（`output: 'static'`）

## 分层架构

```
┌─────────────────────────────────────────────────────────┐
│                    App 层（src/）                        │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ config/  │  │ content/     │  │ pages/            │  │
│  │ site.ts  │  │ registry.ts ⭐│  │ blog/[...slug]   │  │
│  │          │  │ blog/        │  │ docs/[...slug]   │  │
│  │          │  │ docs/        │  │ tags/[tag]       │  │
│  └──────────┘  └──────────────┘  └────────┬─────────┘  │
│       │               │                   │             │
│       │         middleware.ts              │             │
│       │      Astro.locals.site             │             │
│       └───────────────┼───────────────────┘             │
└───────────────────────┼─────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────┐
│  astro-maroon (packages/chestnut-theme/)       │
│                        │                                 │
│  layouts/  ←─── props + Astro.locals.site ──── 读取     │
│  ├── BaseLayout.astro                                    │
│  ├── PostLayout.astro  ←── 博客文章                      │
│  └── DocsLayout.astro  ←── 文档                          │
│                        │                                 │
│  components/           │                                 │
│  ├── shared/PageNav    │ ← prev/next 导航                │
│  ├── shared/TOC        │ ← 目录                          │
│  ├── shared/Sidebar    │ ← 标签云 + 个人资料              │
│  ├── blog/PostCard     │ ← 文章卡片                       │
│  └── docs/DocsSidebar  │ ← 文档分类侧边栏                 │
│                        │                                 │
│  styles/               │                                 │
│  ├── base.css          │ ← CSS 变量 + 3 套主题色          │
│  ├── prose.css         │ ← 排版 + 代码块 + 表格           │
│  ├── layout.css        │ ← 网格 + 响应式断点              │
│  └── ...               │                                 │
│                        │                                 │
│  types/                │                                 │
│  ├── site.ts           │ ← SiteConfig, RoutesConfig      │
│  ├── blog.ts           │ ← PostCardProps                 │
│  └── ...               │                                 │
│                        │                                 │
│  utils/                │                                 │
│  ├── content.ts        │ ← buildSidebarData, getTagStats │
│  ├── date.ts           │ ← formatDate                    │
│  ├── reading-time.ts   │ ← estimateReadingTime            │
│  └── themes.ts         │ ← 主题列表                       │
└──────────────────────────────────────────────────────────┘
```

## Registry 驱动配置

`src/content/registry.ts` 是核心配置入口，所有内容类型的路由、导航、首页系列卡片由此自动推导。

### ContentTypeConfig

```typescript
interface ContentTypeConfig {
  id: string;                    // 'blog' — 对应 src/content/ 目录名
  label: string;                 // '博客' — 显示名称
  route: {                       // URL 路径
    prefix: string;              //   '/blog'
    pattern: string;             //   '/blog/[slug]'
  };
  layout: 'post' | 'doc';       // 使用的 Layout
  sidebarIncluded: boolean;      // 详情页是否显示侧边栏
  showInNav?: boolean;           // 是否出现在导航栏
  series?: { ... };              // 可选：首页系列卡片
}
```

### 自动推导函数

| 函数 | 生成内容 | 消费方 |
|------|---------|--------|
| `generateRoutes()` | `Astro.locals.site.routes` | 所有组件的路径读取 |
| `generateNavItems()` | `siteConfig.nav` | Header 导航栏 |
| `generateSeriesConfigs()` | 系列配置 | 首页 SeriesSection |

### 新增内容类型只需

1. `registry.ts` 加一条配置
2. `content.config.ts` 加 Zod schema
3. `src/content/{id}/` 放 `.md` 文件
4. `src/pages/{id}/` 建 2 个路由文件

导航、URL、系列卡片自动生效。

## Middleware 注入

`src/middleware.ts` 在请求时合并配置注入 `Astro.locals.site`：

```typescript
context.locals.site = {
  ...siteConfig,       // 来自 src/config/site.ts
  themes,              // 来自 astro-maroon/utils/themes
  defaultTheme,
  routes: generateRoutes(),  // 来自 registry
};
```

Layout 读取优先级：`props → Astro.locals.site → 硬编码兜底`

### 可用字段

```typescript
Astro.locals.site = {
  title, description, author, avatar, icon, bio,  // 站点信息
  nav: [{ href, label }],                          // 导航栏
  social: { github },                              // 社交
  footer: { icp, icpUrl },                         // 备案号
  docs: { emptyTexts },                            // 文档空状态文案
  themes: [{ id, name }],                          // 主题列表
  defaultTheme,                                    // 默认主题
  routes: { blog, docs, tags, about, home, icon }, // 路由表
};
```

## 页面路由层

`src/pages/` 下的文件保持极薄，职责是：加载数据 → 组装 props → 调用主题包布局渲染。

### 示例：博客详情页

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from 'astro-maroon/layouts/PostLayout.astro';
import { estimateReadingTime } from 'astro-maroon/utils/reading-time';
import 'astro-maroon/styles/layout.css';
import { buildBlogSidebar, computePrevNext } from '../../content/utils';

export async function getStaticPaths() { /* ... */ }

const post = Astro.props;
const { Content, headings } = await render(post);
const ctx = Astro.locals.site;
const { posts, sidebarData } = await buildBlogSidebar(ctx);
const { prev, next } = computePrevNext(posts, post.id);
---
<PostLayout sidebar={true} sidebarData={sidebarData} ...>
  <Content />
</PostLayout>
```

### Helper 函数

定义在 `src/content/utils.ts`：

| 函数 | 功能 |
|------|------|
| `buildBlogSidebar(ctx)` | 一次调用获取 posts + sidebarData |
| `buildSidebarFromContext(ctx, posts)` | 从 site context 构建侧边栏 |
| `computePrevNext(items, currentId)` | 计算上下篇导航 |
| `getPublishedPosts()` | 获取已发布文章 |
| `getPublishedDocs()` | 获取已发布文档 |

## 共享组件

| 组件 | 位置 | 用途 | 用法 |
|------|------|------|------|
| **TOC** | `shared/TOC.astro` | 文章目录，监听滚动高亮 | `<TOC headings={headings} />` |
| **PageNav** | `shared/PageNav.astro` | 上下篇导航卡片 | `<PageNav prev next prefix="/blog" />` |
| **Sidebar** | `shared/Sidebar.astro` | 个人资料+标签云+链接 | 由 BaseLayout 按需渲染 |
| **PostCard** | `blog/PostCard.astro` | 文章卡片 | `<PostCard title slug pubDate ... />` |
| **DocsSidebar** | `docs/DocsSidebar.astro` | 文档分类导航 | 由 DocsLayout 自动渲染 |

## 布局模式

### 普通页面（about、404）

```
.layout-wrapper.wide
  display: block
  max-width: 1080px, margin: 0 auto, padding: 2rem
```

### 博客页面（有侧边栏）

```
.layout-wrapper (无 wide 类)
  display: grid
  grid-template-columns: 1fr 260px
  ├── .main-content (第一列)
  └── Sidebar (第二列：标签云 + 个人资料)
```

### 文档页面（全宽 + 固定侧边栏/TOC）

```
.layout-wrapper.wide.full-width
  display: block; max-width: none; padding: 0
  ├── DocsSidebar (fixed, left: 0, 260px)
  ├── .docs-main (margin-left: 260px, margin-right: 200px)
  │     └── .doc-article (max-width: 800px, margin: 0 auto)
  └── .toc-wrapper (fixed, right: 0, 200px)
```

### 响应式断点

| 宽度 | 博客 | 文档 |
|------|------|------|
| >1200px | 左侧 TOC fixed + 右侧 Sidebar | 左侧 Sidebar fixed + 右侧 TOC fixed |
| 769–1200px | TOC → 悬浮按钮 | TOC → 悬浮按钮 |
| ≤768px | TOC 按钮 + 单列 | 侧边栏→抽屉 + TOC 按钮 |

## 主题系统

三套主题通过 `data-theme` + CSS 变量驱动：

```css
[data-theme="cream"]  { --bg: #FBF9F6; --accent: #A0896C; }
[data-theme="sakura"] { --bg: #fef8fa; --accent: #d06090; }
[data-theme="starry"] { --bg: #1a1a2e; --accent: #7b8cde; }
```

增加新主题：改主题包的两个文件
1. `utils/themes.ts` 加 `{ id, name }`
2. `styles/base.css` 加相应的变量块

## ViewTransitions

- `BaseLayout` 引入 `<ViewTransitions />`
- 所有 JS 交互在 `astro:after-swap` 中重初始化
- 主题使用 `<script is:inline>` 从 `localStorage` 立即恢复，防止闪烁
- 外部变量保留 handler 引用，防止重复绑定

## 给后续开发者的规则

1. **每完成一个逻辑阶段后 `git commit`**
2. **不在组件中硬编码路径/文案**—从 `Astro.locals.site.routes` 读取
3. **新增内容查询用 `src/content/utils.ts` 的 helper**
4. **所有 `getCollection` 调用必须有 try/catch**
5. **CSS 关键尺寸用变量**（`--sidebar-width`、`--header-height`）
6. **`npm run build` 验证零报错后再考虑合并**
7. **改代码后同步更新本文档**
