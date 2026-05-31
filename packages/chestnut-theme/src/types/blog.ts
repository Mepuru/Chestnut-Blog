import type { z } from 'astro:content';
import type { blogSchema } from '../content.config';

export type BlogPost = z.infer<typeof blogSchema>;

export interface PostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  tags?: string[];
  /** 自定义文章 URL，不传则默认 /blog/{slug} */
  itemUrl?: string;
}

export interface PostData {
  title: string;
  description: string;
  pubDate: Date;
  tags?: string[];
  readingTime?: number;
}
