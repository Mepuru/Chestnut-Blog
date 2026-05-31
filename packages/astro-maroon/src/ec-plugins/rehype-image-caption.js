/**
 * rehype-image-caption
 *
 * 将 Markdown 图片 `![caption](src)` 渲染为
 * <figure><img ...><figcaption>caption</figcaption></figure>
 *
 * 如果图片在 <p> 内，会连带 <p> 一起替换。
 * 空 alt 不生成题注。
 */

import { visit } from 'unist-util-visit';

export function rehypeImageCaption() {
  return (tree) => {
    const toRemove = [];

    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName !== 'img' ||
        !node.properties ||
        !parent ||
        index === undefined ||
        index === null
      ) {
        return;
      }

      const alt = node.properties.alt;
      if (!alt || typeof alt !== 'string' || !alt.trim()) {
        return;
      }

      const figcaption = {
        type: 'element',
        tagName: 'figcaption',
        properties: {},
        children: [{ type: 'text', value: alt.trim() }],
      };

      const figure = {
        type: 'element',
        tagName: 'figure',
        properties: { class: 'image-caption' },
        children: [
          {
            type: 'element',
            tagName: 'img',
            properties: { ...node.properties },
          },
          figcaption,
        ],
      };

      // 如果 <img> 在 <p> 里，标记 <p> 将被替换
      if (parent.tagName === 'p') {
        toRemove.push({ parent, index, replacement: figure });
      } else {
        parent.children.splice(index, 1, figure);
      }
    });

    // 处理 <p> 内的图片：替换整个 <p> 为 <figure>
    for (const { parent, index, replacement } of toRemove) {
      // 找到 <p> 的父节点
      visit(tree, 'element', (grand, gi, gp) => {
        if (grand === parent && gp && gi !== undefined) {
          gp.children.splice(gi, 1, replacement);
        }
      });
    }
  };
}
