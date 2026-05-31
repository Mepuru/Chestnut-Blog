/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    site: {
      title: string;
      description: string;
      author: string;
      avatar: string;
      bio: string;
      nav: Array<{ href: string; label: string }>;
      social: { github?: string };
      footer: { icp?: string; icpUrl?: string };
      docs: { emptyTexts: string[] };
      themes: Array<{ id: string; name: string }>;
      defaultTheme: string;
      routes: import('@kurikana/astro-theme/types/site').RoutesConfig;
    };
  }
}
