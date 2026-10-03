async function checkLiveUrl(url: string) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });

    const status = res.status;
    const location = res.headers.get('location') || undefined;

    let canonical: string | undefined;
    let robots: string | undefined;
    let hasCoreToolsHub = false;
    let hasFooterMatrix = false;

    if (status === 200) {
      const html = await res.text();
      const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) 
                    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      canonical = canMatch ? canMatch[1] : undefined;

      const robMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)
                    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
      robots = robMatch ? robMatch[1] : undefined;

      hasCoreToolsHub = html.includes('Core Aspect Ratio Calculators');
      hasFooterMatrix = html.includes('Calculators</h3>');
    }

    return {
      testedUrl: url,
      status,
      location,
      canonical,
      robots,
      hasCoreToolsHub,
      hasFooterMatrix,
    };
  } catch (err: any) {
    return {
      testedUrl: url,
      status: -1,
      error: err.message,
    };
  }
}

async function run() {
  const urls = [
    'https://www.freeaspectratiocalculator.online/',
    'https://www.freeaspectratiocalculator.online/16-9-aspect-ratio-calculator',
    'https://www.freeaspectratiocalculator.online/4-3-aspect-ratio-calculator',
    'https://www.freeaspectratiocalculator.online/21-9-aspect-ratio-calculator',
    'https://www.freeaspectratiocalculator.online/compare',
    'https://www.freeaspectratiocalculator.online/compare/16-9-vs-4-3',
    'https://www.freeaspectratiocalculator.online/guides',
    'https://www.freeaspectratiocalculator.online/guides/what-is-aspect-ratio',
    'https://www.freeaspectratiocalculator.online/guides/common-screen-resolutions',
    'https://www.freeaspectratiocalculator.online/about-us',
    'https://www.freeaspectratiocalculator.online/privacy-policy',
    'http://freeaspectratiocalculator.online/',
    'https://freeaspectratiocalculator.online/',
    'http://www.freeaspectratiocalculator.online/',
    'https://www.freeaspectratiocalculator.online/robots.txt',
    'https://www.freeaspectratiocalculator.online/sitemap.xml',
  ];

  console.log('Testing live production deployment...');
  for (const u of urls) {
    const res = await checkLiveUrl(u);
    console.log(JSON.stringify(res));
  }
}

run();
