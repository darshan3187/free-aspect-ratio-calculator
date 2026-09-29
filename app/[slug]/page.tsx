import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { RATIOS_DATA } from '@/data/ratios';
import { RatioToolTemplate } from '@/components/templates/RatioToolTemplate';
import { SITE_URL } from '@/utils/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(RATIOS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = RATIOS_DATA[slug];

  if (!data) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: 'website',
      url: `${SITE_URL}/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
    },
  };
}


export default async function RatioToolPage({ params }: PageProps) {
  const { slug } = await params;
  const data = RATIOS_DATA[slug];

  if (!data) {
    notFound();
  }

  return <RatioToolTemplate data={data} />;
}
