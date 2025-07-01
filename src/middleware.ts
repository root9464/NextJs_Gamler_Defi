import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROXY_MAP: Record<string, string> = {
  '/api/ton': 'https://tonapi.io/v2',
  '/api/web3': 'https://serv.gamler.online/web3/api',
  '/api/web2': 'https://serv.gamler.atma-dev.ru',
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Находим соответствующий префикс в PROXY_MAP
  const prefix = Object.keys(PROXY_MAP).find((key) => url.startsWith(key));

  if (prefix) {
    const targetUrl = PROXY_MAP[prefix];
    const newUrl = `${targetUrl}${url.replace(prefix, '')}`;
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: Object.keys(PROXY_MAP).map((path) => `${path}/:path*`),
};
