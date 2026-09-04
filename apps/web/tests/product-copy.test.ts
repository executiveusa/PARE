import { describe, expect, it } from 'vitest';
import { rebrandProductCopy } from '../src/i18n/product-copy';

describe('PARÉ product copy boundary', () => {
  it('rebrands legacy product names and cloud names', () => {
    expect(rebrandProductCopy('OpenDesign')).toBe('PARÉ');
    expect(rebrandProductCopy('Open Design')).toBe('PARÉ');
    expect(rebrandProductCopy('Open-Design')).toBe('PARÉ');
    expect(rebrandProductCopy('OpenDesign Cloud')).toBe('PARÉ Cloud');
    expect(rebrandProductCopy('Open Design Cloud')).toBe('PARÉ Cloud');
  });

  it('preserves real third-party runtime names', () => {
    expect(rebrandProductCopy('OpenCode · Codex · Claude Code · Gemini')).toBe(
      'OpenCode · Codex · Claude Code · Gemini',
    );
  });

  it('does not rewrite compatibility identifiers', () => {
    expect(rebrandProductCopy('@open-design/contracts')).toBe('@open-design/contracts');
    expect(rebrandProductCopy('open-design:locale')).toBe('open-design:locale');
  });
});
