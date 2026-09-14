export function generateWebApplicationSchema(options: {
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: options.name,
    url: options.url,
    description: options.description,
    applicationCategory: options.applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    author: {
      '@type': 'Organization',
      name: 'Free Aspect Ratio Calculator',
      url: 'https://freeaspectratiocalculator.online'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Free Aspect Ratio Calculator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://freeaspectratiocalculator.online/logo.png'
      }
    },
    datePublished: article.datePublished || '2026-01-01T00:00:00Z',
    dateModified: article.dateModified || new Date().toISOString()
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item
    }))
  };
}
