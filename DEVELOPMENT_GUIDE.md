# 开发规范

> Chestnut-Astro 项目开发约定与最佳实践

---

## 命名约定

| 类别 | 规则 | 示例 |
|---|---|---|
| 组件文件 | PascalCase | `Header.astro`, `PostCard.astro`, `DocsSidebar.astro` |
| 页面路由 | 动态参数用 `[]`，其余 kebab-case | `[...slug].astro`, `[tag].astro`, `index.astro` |
| 工具函数 | camelCase | `formatDate()`, `estimateReadingTime()`, `getPublishedPosts()` |
| 类型/接口 | PascalCase | `SiteConfig`, `PostCardProps`, `SeriesConfig` |
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
- 组件 props 优先用类型接口，定义在组件内或从 `src/types/` 导入
- 每个组件只做一件事

---

## 导入顺序

按以下分组排列，每组之间空一行：

```astro
---
// 1. Astro 内置
import { ViewTransitions } from 'astro:transitions';
import { getCollection, render } from 'astro:content';

// 2. 本地组件
import Header from '../components/Header.astro';
import BaseLayout from '../layouts/BaseLayout.astro';

// 3. 本地工具函数
import { formatDate } from '../utils/date';
import { getPublishedPosts } from '../utils/content';

// 4. 类型
import type { PostCardProps } from '../types';

// 5. 数据/配置
import { siteConfig } from '../config/site';

// 6. 样式
import '../styles/global.css';
---
```

---

## CSS 规范

### 变量驱动

优先使用 CSS 自定义属性（`var(--xxx)`），**禁止**在组件样式中硬编码颜色、尺寸、圆角值。所有主题色在 `src/styles/base.css` 的 `[data-theme="xxx"]` 中定义。

```css
/* ✅ 正确 */
.doc-nav-link {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--fg);
}

/* ❌ 避免 */
.doc-nav-link {
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
- **类型导出** — 公共类型放在 `src/types/` 目录下，按模块拆分文件
- **组件 Props** — 定义在组件内或从 `src/types/` 导入：

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
draft: false       # 可选
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
npm run dev        # 启动开发服务器（带热更新）
npm run build      # 生产构建 + Pagefind 搜索索引
npm run preview    # 预览构建产物
npm run typecheck  # 类型检查（需安装 @astrojs/check）
```

### Git 提交

commit message 用中文，前缀标识改动类型：

```
feat: 新功能描述
fix: 修复的问题描述
refactor: 重构描述
docs: 文档更新
style: 代码格式清理（不影响逻辑）
chore: 构建配置/工具更新
```

示例：

```
fix: 手机端文档上下篇导航溢出 — 纵向堆叠 + 标题截断双重修复
docs: 补充系列配置和独立页面文档
style: 移除未使用的 import 和 prop
```

---

## 项目结构参考

```
src/
├── components/       # 可复用 UI 组件（PascalCase）
│   ├── blog/         # 博客相关组件
│   ├── docs/         # 文档相关组件
│   ├── home/         # 首页组件
│   ├── shared/       # 通用组件（Sidebar, TOC）
│   ├── Header.astro  # 导航栏（含主题切换 + 移动端菜单）
│   ├── Footer.astro  # 页脚
│   └── Search.astro  # Pagefind 搜索弹窗
├── config/           # 站点配置（site.ts, series.ts）
├── content/          # Markdown 内容
├── content.config.ts # 内容 Zod Schema
├── layouts/          # 页面布局包装器
├── pages/            # 路由页面
├── styles/           # 全局样式
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

---

## 主题添加流程

1. `src/utils/themes.ts` 添加 `{ id, name }`
2. `src/styles/base.css` 添加 `[data-theme="xxx"]` 变量块

CSS 变量必须覆盖：`--bg`, `--fg`, `--accent`, `--accent-light`, `--border`, `--muted`, `--card-bg`, `--code-bg`, `--header-bg`, `--search-bg`, `--shadow-*`, `--gradient-*`, `--theme-label`, `--radius-*`。
