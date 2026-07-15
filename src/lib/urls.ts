const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

function splitPath(path: string): { pathname: string; suffix: string } {
  const match = path.match(/^([^?#]*)([?#].*)?$/);
  return { pathname: match?.[1] || '/', suffix: match?.[2] || '' };
}

function normalizeRoute(path: string): string {
  const { pathname } = splitPath(path);
  const absolutePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withoutBase = base && (absolutePath === base || absolutePath.startsWith(`${base}/`))
    ? absolutePath.slice(base.length) || '/'
    : absolutePath;

  return withoutBase.endsWith('/') ? withoutBase : `${withoutBase}/`;
}

/** Creates an internal URL that is safe for the GitHub Pages `/portfolio/` base path. */
export function withBase(path = '/'): string {
  const { suffix } = splitPath(path);
  return `${base}${normalizeRoute(path)}${suffix}` || '/';
}

/** Creates a base-safe link to an anchor on an internal route. */
export function withBaseHash(hash: string, path = '/'): string {
  const normalizedHash = hash.replace(/^#/, '');
  return `${withBase(path)}#${normalizedHash}`;
}

/** Matches a navigation route and its descendants without substring false positives. */
export function isRouteActive(pathname: string, route: string): boolean {
  const current = normalizeRoute(pathname);
  const target = normalizeRoute(route);
  return target === '/' ? current === target : current === target || current.startsWith(target);
}
