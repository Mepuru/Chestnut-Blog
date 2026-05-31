/**
 * rehype-image-caption
 *
 * 将 Markdown 图片 `![caption](src)` 渲染为
 * <figure><img ...><figcaption>caption</figcaption></figure>
 *
 * 用法：
 *   ![夕阳下的海岸](photo.jpg)
 *   → <figure><img src="photo.jpg" alt="夕阳下的海岸"><figcaption>夕阳下的海岸</figcaption></figure>
 *
 * 如果不需要题注，则保持普通 <img> 不变：![](src) 或 ![alt](src) 无额外处理。
 */

import { visit } from 'unist-util-visit';

export function rehypeImageCaption() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName !== 'img' ||
        !node.properties ||
        !parent ||
        typeof index !== 'number'
      ) {
        return;
      }

      const props = node.properties;
      const alt = props.alt;

      // 只有 alt 不为空时才生成题注
      if (!alt || typeof alt !== 'string' || !alt.trim()) {
        return;
      }

      const figCaption = {
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
            properties: { ...props },
            children: [],
          },
          figCaption,
        ],
      };

      parent.children.splice(index, 1, figure);
    });
  };
}
