<div align="center">
    <img alt="Chestnut Astro" src="public/icon.png" width=120 height=120/>

# Chestnut-Astro

个人博客 + 文档站 — 基于 Astro 5 的静态站点

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

## 简介

个人博客 + 文档站点，记录技术探索、日语学习和生活感悟。从 Hexo 迁移至 Astro，采用类 VitePress/Starlight 的文档布局。

## 特性

- **Astro 5.x** — 内容驱动，零 JS 首屏
- **ViewTransitions** — 页面间平滑 crossfade 过渡
- **三套主题** — 奶油 / 樱花 / 星空，CSS 变量驱动，localStorage 记忆
- **博客系统** — Markdown 文章、标签筛选、阅读时间
- **文档系统** — 侧边栏固定 + TOC 固定、分类折叠、上下篇导航
- **全文搜索** — Pagefind 构建时索引，零运行时依赖
- **配置驱动** — 个人信息/导航/主题文案集中在 `src/config/site.ts`
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
src/
├── components/           # 组件
│   ├── blog/PostCard     # 博客卡片
│   ├── docs/DocsSidebar  # 文档侧边栏（分类折叠）
│   ├── home/             # 首页 Hero / SeriesCard
│   ├── shared/           # Sidebar（标签云）、TOC（目录）
│   ├── Header.astro      # 导航栏 + 主题切换
│   ├── Footer.astro      # 页脚
│   └── Search.astro      # Pagefind 搜索
├── config/
│   ├── site.ts           # ⭐ 站点配置（单一修改入口）
│   └── series.ts         # 系列配置（博客/文档板块）
├── content/              # Markdown 内容
│   ├── blog/             # 博客文章
│   ├── docs/             # 文档文章（含架构文档）
│   └── pages/            # 独立页面
├── content.config.ts     # Zod Schema
├── layouts/
│   ├── BaseLayout.astro  # 根布局（ViewTransitions）
│   ├── DocsLayout.astro  # 文档布局（三列固定）
│   └── PostLayout.astro  # 博客文章布局
├── pages/                # 路由
│   ├── index.astro       # 首页
│   ├── blog/             # 博客列表 + 详情
│   ├── docs/             # 文档首页 + 详情
│   └── tags/[tag].astro  # 标签筛选
├── styles/               # 全局样式（CSS 变量 + 主题色）
├── types/                # TypeScript 类型
└── utils/                # 工具函数
```

## 配置

所有站点级配置在 `src/config/site.ts`：

```ts
export const siteConfig = {
  title: '栗かな',
  author: '栗かな',
  avatar: '/icon.png',
  bio: '日语专业 / 技术探索中',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/docs', label: '文档' },
    { href: '/about', label: '关于' },
  ],
  social: { github: 'https://github.com/Mepuru' },
  footer: { icp: '鲁ICP备...', icpUrl: 'https://...' },
  docs: {
    emptyTexts: ['四季轮回 岁岁年年', '花开花落\n皆是风景', ...],
  },
};
```

加导航页、改昵称、换头像 —— 只改这一个文件。

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

- `draft: true` 标记草稿，构建时自动过滤
- 图片放 `public/images/` 下，引用 `/images/xxx.png`

## 写文档

在 `src/content/docs/` 下创建 `.md` 文件：

```yaml
---
title: 文档标题
pubDate: 2026-05-16
category: Astro    # 可选，侧边栏按此分组折叠
---
```

## 添加新主题

1. `src/utils/themes.ts` 添加 `{ id, name }`
2. `src/styles/base.css` 添加对应 `[data-theme="xxx"]` 变量块

## 架构文档

完整的代码架构说明在 `/docs/architecture`（即 `src/content/docs/architecture.md`），供后续开发者和 AI 参考。

## 技术栈

| 项 | 选型 |
|---|---|
| 框架 | Astro 5 |
| 搜索 | Pagefind |
| 语言 | TypeScript |
| 样式 | CSS Custom Properties |
| 部署 | EdgeOne Pages |

## 联系方式

- **GitHub**: [Mepuru](https://github.com/Mepuru)
- **VRChat**: KuriKana

---

<div align="center">

*"记录所思所想，留下走过的痕迹。"*

</div>
