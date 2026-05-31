<div align="center">
    <img alt="Maroon" src="public/icon.png" width=120 height=120/>

# Maroon

个人博客 + 文档站 — 基于 Astro 5 的静态站点

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

## 简介

个人博客 + 文档站点，记录技术探索、日语学习和生活感悟。采用 Monorepo 结构，核心主题 `astro-maroon` 作为独立 npm workspace 包，与内容解耦。

## 特性

- **Astro 5.x** — 内容驱动，零 JS 首屏
- **Monorepo 架构** — 主题包独立，可发布复用
- **Registry 驱动配置** — 新增内容类型只需一条注册，导航/路由/首页卡片自动生成
- **ViewTransitions** — 页面间平滑 crossfade 过渡
- **三套主题** — 奶油 / 樱花 / 星空，CSS 变量驱动，localStorage 记忆
- **博客系统** — Markdown 文章、标签筛选、阅读时间、上下篇导航
- **文档系统** — 侧边栏固定 + TOC 固定、分类折叠、上下篇导航
- **全文搜索** — Pagefind 构建时索引，零运行时依赖
- **配置驱动** — 个人信息/路径/导航集中在 registry + site.ts
- **响应式** — 桌面三列 / 平板双列 / 手机抽屉式侧边栏

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 构建 + Pagefind 索引
npm run preview    # 预览构建结果
```

## 项目结构

```
maroon/
├── packages/
│   └── astro-maroon/        # 独立主题包
│       ├── src/
│       │   ├── components/    # UI 组件（Header, Footer, PostCard, Sidebar, PageNav, TOC...）
│       │   ├── layouts/       # BaseLayout, PostLayout, DocsLayout
│       │   ├── styles/        # CSS 变量、prose 排版、layout 网格、theme-switcher
│       │   ├── types/         # SiteConfig, RoutesConfig, PostCardProps 等公共类型
│       │   └── utils/         # formatDate, estimateReadingTime, buildSidebarData 等
│       └── package.json
│
├── src/                       # 主应用 — 胶水层
│   ├── config/
│   │   └── site.ts            # ⭐ 站点配置（标题、头像、社交链接等）
│   ├── content/
│   │   ├── blog/ / docs/ / pages/  # Markdown 内容
│   │   ├── registry.ts        # ⭐ 核心注册表（内容类型 + 路由 + 导航 + 系列）
│   │   └── utils.ts           # 查询工具 + buildBlogSidebar / computePrevNext
│   ├── content.config.ts      # Zod Schema
│   ├── middleware.ts           # 配置注入 Astro.locals.site
│   ├── env.d.ts               # Locals 类型声明
│   └── pages/                 # 路由（极薄胶水层）
├── tsconfig.json              # 路径别名映射到主题包
└── package.json               # workspaces: ["packages/*"]
```

## 配置体系

### 唯一入口：`src/content/registry.ts`

所有内容类型的路由、导航、首页系列卡片由此一条记录自动推导：

```typescript
export const contentRegistry = [
  {
    id: 'blog',
    label: '博客',
    route: { prefix: '/blog', pattern: '/blog/[slug]' },
    layout: 'post',
    showInNav: true,
    series: { description: '散装的技术与生活记录', countLabel: '篇文章', ... },
  },
  { id: 'docs', label: '文档', route: { prefix: '/docs', ... }, layout: 'doc', ... },
];
```

### 站点信息：`src/config/site.ts`

```ts
export const siteConfig = {
  title: '栗かな',
  author: '栗かな',
  avatar: '/icon.png',
  bio: '日语专业 / 技术探索中',
  social: { github: 'https://github.com/Mepuru' },
  footer: { icp: '鲁ICP备...', icpUrl: '...' },
  docs: { emptyTexts: [...] },
  // nav 由 registry 自动生成，如需自定义可在此覆盖
};
```

### 配置自动注入链路

```
registry.ts ─→ middleware.ts ─→ Astro.locals.site ─→ 所有布局/组件自动读取
site.ts ────┘
```

## 写博客

在 `src/content/blog/` 下创建 `.md` 文件：

```yaml
---
title: 文章标题
description: 文章简介
pubDate: 2026-05-16
tags: [Astro, TypeScript]
draft: false
---
```

## 写文档

在 `src/content/docs/` 下创建 `.md` 文件：

```yaml
---
title: 文档标题
pubDate: 2026-05-16
category: Astro    # 可选，侧边栏按此分组折叠
draft: false
---
```

## 新增内容类型

以新增"笔记"为例：

1. `src/content/registry.ts` 加一条注册记录
2. `src/content.config.ts` 加 `defineCollection`
3. `src/content/notes/` 放 `.md` 文件
4. `src/pages/notes/` 建两个极简路由文件

导航栏、首页系列卡片、URL 路径自动生成。详见 `DEVELOPMENT_GUIDE.md`。

## 参考文档

| 文档 | 位置 | 内容 |
|------|------|------|
| 开发规范 | `DEVELOPMENT_GUIDE.md` | 命名、CSS、TS 规范、Registry 使用、常见陷阱 |
| 架构文档 | `/docs/architecture` | 数据流、组件层级、主题系统、给 AI 的规则 |

## 技术栈

| 项 | 选型 |
|---|---|
| 框架 | Astro 5 |
| 搜索 | Pagefind |
| 语言 | TypeScript |
| 样式 | CSS Custom Properties |
| 包管理 | npm workspaces |
| 部署 | EdgeOne Pages |

## 联系方式

- **GitHub**: [Mepuru](https://github.com/Mepuru)

---

<div align="center">

*"记录所思所想，留下走过的痕迹。"*

</div>
