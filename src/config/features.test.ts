import { describe, expect, it } from 'vitest';
import { FEATURES } from './features';

describe('publication features', () => {
  it('keeps the published Path timeline enabled', () => {
    expect(FEATURES.pathTimeline).toBe(true);
  });
});
