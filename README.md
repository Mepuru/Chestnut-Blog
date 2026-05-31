<div align="center">
    <img alt="Maroon" src="public/icon.png" width=120 height=120/>
</div>

<h1 align="center">Maroon</h1>

<p align="center">
  暖色系 Astro 博客 + 文档双用途主题
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License"></a>
</p>

---

## 快速开始

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 构建 + Pagefind 搜索索引
```

## 配置站点

编辑 `src/config/maroon.ts`：

```ts
// 站点信息
export const siteConfig = {
  title: '你的站点',
  author: '你的名字',
  avatar: '/avatar.jpg',
  bio: '个人简介',
  social: { github: 'https://github.com/xxx' },
};
```

## 写文章

`src/content/blog/` 下放 `.md` 文件：

```markdown
---
title: 文章标题
description: 文章简介
pubDate: 2026-01-01
tags: [Astro]
draft: false
---
正文内容...
```

## 深入了解

详细文档在站内 `/docs/architecture`，涵盖：

- **架构** — 分层结构、数据流、布局系统
- **配置体系** — 内容类型注册、路由推导、导航生成
- **主题系统** — CSS 变量、新增主题
- **开发规范** — 命名、CSS、TypeScript、工作流
- **新增内容类型** — 完整四步教程
- **常见陷阱** — 模板变量、表格溢出、flex 溢出

---

<p align="center">
  <a href="/docs/architecture">→ 阅读完整架构文档 ←</a>
</p>
