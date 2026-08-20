import type { MetadataRoute } from 'next';
import { RATIOS_DATA } from '@/data/ratios';
import { COMPARISONS_DATA } from '@/data/comparisons';
import { ARTICLES_DATA } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://free-aspect-ratio-calculator.vercel.app';
  const currentDate = new Date().toISOString();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Programmatic tool landing pages
  const ratioPages: MetadataRoute.Sitemap = Object.keys(RATIOS_DATA).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Programmatic comparison pages
  const comparisonPages: MetadataRoute.Sitemap = Object.keys(COMPARISONS_DATA).map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 50 Content Hub guides
  const articlePages: MetadataRoute.Sitemap = ARTICLES_DATA.map((article) => ({
    url: `${baseUrl}/guides/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...ratioPages, ...comparisonPages, ...articlePages];
}
