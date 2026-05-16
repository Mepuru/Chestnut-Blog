---
title: "用 Astro 搭建多主题博客：架构设计与实现"
pubDate: 2026-05-15
category: "Astro"
---

## 为什么选择 Astro

从 Hexo 迁移到 Astro，主要看中几点：

- **内容驱动**：天然支持 Markdown，不需要额外配置
- **静态生成**：构建时生成所有页面，访问速度快
- **Islands 架构**：按需加载 JS，不用不加载

## 项目结构

```
src/
├── components/          # 组件
├── content/blog/        # Markdown 文章
├── layouts/             # 布局模板
├── pages/               # 页面路由
├── styles/              # 样式（按组件拆分）
├── utils/               # 工具函数
├── types.ts             # 类型定义
└── content.config.ts    # 内容 schema
```

## 多主题系统的实现

### 设计思路

主题切换的核心是 CSS 变量。每个主题定义一套颜色变量，切换时只需改变 `data-theme` 属性。

```css
[data-theme="sakura"] {
  --bg: #fef8fa;
  --accent: #d06090;
  /* ... */
}

[data-theme="starry"] {
  --bg: #1a1a2e;
  --accent: #7b8cde;
  /* ... */
}
```

### 配置化管理

主题配置抽离到 `src/utils/themes.ts`：

```typescript
export const themes = [
  { id: 'sakura', name: '樱花' },
  { id: 'starry', name: '星空' },
];

export const defaultTheme = 'sakura';
```

Header 组件从配置读取主题列表，以后加新主题只需改配置和 CSS，不用动组件。

### 持久化选择

用户选择的主题保存到 `localStorage`，下次访问自动恢复：

```javascript
// 切换时保存
localStorage.setItem('theme', theme);

// 页面加载时恢复（内联在 head 中，避免闪烁）
const theme = localStorage.getItem('theme') || 'sakura';
document.documentElement.setAttribute('data-theme', theme);
```

### 主题自己负责

每个主题定义 `--theme-label` 变量，用于菜单中显示自己的颜色：

```css
[data-theme="sakura"] {
  --theme-label: #d06090;
}
```

这样不用在组件中硬编码颜色，新增主题时不需要改其他地方。

## 标签筛选

### 生成静态路径

Astro 的 `getStaticPaths` 可以动态生成页面。标签页根据所有文章的标签自动生成：

```typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const allTags = posts.flatMap((p) => p.data.tags);
  const uniqueTags = [...new Set(allTags)];

  return uniqueTags.map((tag) => ({
    params: { tag },
    props: { tag },
  }));
}
```

### 筛选文章

在页面中筛选包含当前标签的文章：

```typescript
const posts = (await getCollection('blog'))
  .filter((p) => !p.data.draft && p.data.tags.includes(tag))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

## CSS 按组件拆分

800+ 行的 CSS 拆分成 9 个文件：

- `base.css` - 主题变量、基础样式
- `header.css` - 头部导航
- `theme-switcher.css` - 主题切换
- `post-card.css` - 文章卡片
- `prose.css` - 文章内容排版
- `sidebar.css` - 侧边栏
- `search.css` - 搜索
- `footer.css` - 底部
- `pages.css` - 关于、404 页

`global.css` 只负责导入：

```css
@import './base.css';
@import './header.css';
@import './theme-switcher.css';
/* ... */
```

## 类型统一

Astro 的内容 schema 和组件 Props 有重复定义，用 `z.infer` 从 schema 推导类型：

```typescript
// content.config.ts
export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

// types.ts
import type { blogSchema } from './content.config';
export type BlogPost = z.infer<typeof blogSchema>;
```

改字段只需改 `content.config.ts`，类型自动同步。

## 搜索功能

使用 Pagefind，构建时自动生成搜索索引，零运行时依赖：

```bash
astro build && pagefind --site dist
```

搜索弹窗用原生 JS 实现，支持 `Ctrl+K` 快捷键和 `Esc` 关闭。

## 总结

这个博客的架构原则：

1. **配置化**：主题、标签等可变部分抽离配置
2. **组件化**：样式按组件拆分，找起来快
3. **类型安全**：从 schema 推导类型，改一处生效
4. **渐进增强**：没有 JS 也能正常浏览，JS 只增强体验
