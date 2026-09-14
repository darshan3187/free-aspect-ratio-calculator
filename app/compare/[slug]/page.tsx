import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { COMPARISONS_DATA } from '@/data/comparisons';
import { ComparisonTemplate } from '@/components/templates/ComparisonTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPARISONS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARISONS_DATA[slug];

  if (!data) {
    return {
      title: 'Comparison Not Found',
    };
  }

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: {
      canonical: `https://freeaspectratiocalculator.online/compare/${slug}`,
    },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: 'article',
      url: `https://freeaspectratiocalculator.online/compare/${slug}`,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const data = COMPARISONS_DATA[slug];

  if (!data) {
    notFound();
  }

  return <ComparisonTemplate data={data} />;
}
