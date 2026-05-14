<div align="center">
    <img alt="Chestnut Blog" src="public/icon.png" width=120 height=120/>

# 栗かな的博客

个人博客 - 基于 Astro 构建的静态博客

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![EdgeOne](https://img.shields.io/badge/EdgeOne-Pages-006EFF?style=flat-square)](https://edgeone.ai)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

## 简介

这是我的个人博客，记录技术探索、日语学习和生活感悟。从 Hexo 迁移至 Astro，获得更好的 Markdown 支持和开发体验。

## 特性

- **Astro 5.x** - 内容驱动的静态站点框架
- **Pagefind 搜索** - 构建时自动生成全文索引，零 JS 依赖
- **多主题切换** - 樱花/星空两套主题，支持 localStorage 记忆
- **标签筛选** - 点击标签查看相关文章
- **响应式设计** - 适配桌面和移动端
- **EdgeOne 部署** - 国内 CDN 加速，访问速度快

## 技术栈

- **框架**: [Astro](https://astro.build)
- **搜索**: [Pagefind](https://pagefind.app)
- **部署**: EdgeOne Pages
- **语言**: TypeScript / Markdown

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建（含搜索索引）
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件
│   ├── Header.astro     # 顶部导航（窄屏自动隐藏）
│   ├── Footer.astro     # 页脚
│   ├── Search.astro     # 搜索弹窗
│   ├── Sidebar.astro    # 侧边栏（标签云）
│   └── PostCard.astro   # 文章卡片
├── content/
│   ├── blog/            # Markdown 文章
│   └── pages/           # 独立页面（关于等）
├── layouts/
│   ├── BaseLayout.astro # 基础布局
│   └── PostLayout.astro # 文章布局
├── pages/
│   ├── index.astro      # 首页
│   ├── blog/            # 文章列表 + 详情
│   ├── tags/[tag].astro # 标签筛选页
│   └── about.astro      # 关于页
├── styles/              # 样式（按组件拆分）
│   ├── base.css         # 主题变量、基础样式
│   ├── header.css       # 头部导航
│   ├── theme-switcher.css
│   ├── post-card.css    # 文章卡片
│   ├── prose.css        # 文章内容排版
│   ├── sidebar.css      # 侧边栏
│   ├── search.css       # 搜索
│   ├── footer.css       # 底部
│   └── pages.css        # 关于、404 页
├── utils/
│   ├── themes.ts        # 主题配置
│   └── reading-time.ts  # 阅读时间估算
├── types.ts             # 类型定义
└── content.config.ts    # 内容 schema
```

## 写文章

在 `src/content/blog/` 下创建 `.md` 文件：

```markdown
---
title: 文章标题
description: 文章简介
pubDate: 2026-05-13
tags: [标签1, 标签2]
draft: false
---

正文内容...
```

- `draft: true` 可标记为草稿，构建时会自动过滤
- 图片放在 `public/images/` 对应目录下，引用路径为 `/images/xxx/image.png`

## 添加新主题

1. 在 `src/utils/themes.ts` 中添加主题配置
2. 在 `src/styles/base.css` 中添加 `[data-theme="xxx"]` 变量块

## 联系方式

- **GitHub**: [Mepuru](https://github.com/Mepuru)
- **VRChat**: KuriKana

---

<div align="center">

*"记录所思所想，留下走过的痕迹。"*

</div>
