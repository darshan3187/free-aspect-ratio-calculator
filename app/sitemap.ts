import type { MetadataRoute } from 'next';
import { RATIOS_DATA } from '@/data/ratios';
import { COMPARISONS_DATA } from '@/data/comparisons';
import { ARTICLES_DATA } from '@/data/articles';
import { SITE_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  // Use stable ISO timestamps so Googlebot can reliably detect genuine content updates
  // rather than treating dynamic Date() calls as spoofed/noise signals.
  const appReleaseDate = '2026-10-02T00:00:00.000Z';
  const toolsUpdateDate = '2026-10-01T00:00:00.000Z';
  const articlesUpdateDate = '2026-09-28T00:00:00.000Z';
  const staticDocDate = '2026-09-15T00:00:00.000Z';

  // Core pages (Root URL strictly matches canonical: no trailing slash)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: appReleaseDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: appReleaseDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: appReleaseDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: staticDocDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: staticDocDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: staticDocDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: staticDocDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Programmatic tool landing pages (12 core aspect-ratio calculators)
  const ratioPages: MetadataRoute.Sitemap = Object.keys(RATIOS_DATA).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: toolsUpdateDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Programmatic comparison pages (6 ratio comparisons)
  const comparisonPages: MetadataRoute.Sitemap = Object.keys(COMPARISONS_DATA).map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: toolsUpdateDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 58 Content Hub technical guides
  const articlePages: MetadataRoute.Sitemap = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/guides/${article.slug}`,
    lastModified: articlesUpdateDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...ratioPages, ...comparisonPages, ...articlePages];
}
