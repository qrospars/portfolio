import { describe, expect, it } from 'vitest';
import { FEATURES } from './features';

describe('publication features', () => {
  it('keeps the unverified Path timeline disabled', () => {
    expect(FEATURES.pathTimeline).toBe(true);
  });
});
