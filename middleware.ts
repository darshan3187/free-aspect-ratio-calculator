import { NextRequest, NextResponse } from 'next/server';
import { getMarkdownForPath } from '@/utils/markdownGenerator';

/**
 * Checks whether an incoming request specifically prefers or accepts text/markdown
 * over text/html according to HTTP content negotiation specifications.
 */
function prefersMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) return false;

  const lower = acceptHeader.toLowerCase();

  // If text/markdown is explicitly requested
  if (lower.includes('text/markdown')) {
    // If text/html is also present, compare quality factors (q-values)
    if (lower.includes('text/html')) {
      const parts = lower.split(',').map((p) => p.trim());
      let mdQ = 0;
      let htmlQ = 0;

      for (const part of parts) {
        const [type, ...params] = part.split(';').map((s) => s.trim());
        let q = 1.0;
        for (const param of params) {
          if (param.startsWith('q=')) {
            const parsed = parseFloat(param.slice(2));
            if (!isNaN(parsed)) q = parsed;
          }
        }
        if (type === 'text/markdown') mdQ = q;
        if (type === 'text/html') htmlQ = q;
      }

      return mdQ >= htmlQ && mdQ > 0;
    }

    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptHeader = request.headers.get('accept');

  // Skip static files, Next internals, api, images, and system routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  if (prefersMarkdown(acceptHeader)) {
    const result = getMarkdownForPath(pathname);

    if (result) {
      const response = new NextResponse(result.markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'X-Markdown-Tokens': result.tokens.toString(),
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      });

      return response;
    }
  }

  // For default browser requests, proceed to standard HTML rendering
  // Add Vary: Accept to let downstream caches and CDNs differentiate HTML vs Markdown responses
  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static extensions (.png, .jpg, .svg, .pdf, .json, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|pdf|txt|xml|webmanifest)$).*)',
  ],
};
