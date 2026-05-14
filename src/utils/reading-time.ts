export function estimateReadingTime(content: string): number {
  const cjkChars = (content.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
  const words = content.replace(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil((cjkChars / 400) + (words / 200));
  return Math.max(1, minutes);
}
