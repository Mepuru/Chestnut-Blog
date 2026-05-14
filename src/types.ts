import type { z } from 'astro:content';
import type { blogSchema } from './content.config';

export type BlogPost = z.infer<typeof blogSchema>;

export interface PostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  tags?: string[];
  readingTime?: number;
}