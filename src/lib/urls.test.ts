import { describe, expect, it } from 'vitest';
import { isRouteActive, withBase, withBaseHash } from './urls';

const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

describe('base-aware route helpers', () => {
  it('normalizes internal paths and preserves queries and hashes', () => {
    expect(withBase('work')).toMatch(/\/work\/$/);
    expect(withBase('/work/?view=all#latest')).toMatch(/\/work\/\?view=all#latest$/);
  });

  it('creates base-safe anchors', () => {
    expect(withBaseHash('dashboard-design', '/work/my-universe/')).toMatch(/\/work\/my-universe\/#dashboard-design$/);
    expect(withBaseHash('#about')).toMatch(/\/#about$/);
  });

  it('matches navigation sections without substring collisions', () => {
    expect(isRouteActive(`${base}/work/artelia/`, '/work/')).toBe(true);
    expect(isRouteActive(`${base}/about/`, '/about/')).toBe(true);
    expect(isRouteActive(`${base}/workshop/`, '/work/')).toBe(false);
    expect(isRouteActive(`${base}/`, '/')).toBe(true);
    expect(isRouteActive(`${base}/work/`, '/')).toBe(false);
  });
});
