const LEGACY_PRODUCT_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bOpenDesign Cloud\b/g, 'PARÉ Cloud'],
  [/\bOpenDesign\b/g, 'PARÉ'],
  [/\bOpen Design\b/g, 'PARÉ'],
  [/\bOpen-Design\b/g, 'PARÉ'],
];

/**
 * Rebrand user-facing legacy product copy without touching runtime IDs,
 * package namespaces, storage keys, CLI commands, or third-party agent names.
 *
 * Keep this deliberately narrow: OpenCode is a real external runtime and must
 * remain OpenCode. Internal @open-design/* and od compatibility identifiers
 * also remain unchanged in source.
 */
export function rebrandProductCopy(value: string): string {
  return LEGACY_PRODUCT_PATTERNS.reduce(
    (copy, [pattern, replacement]) => copy.replace(pattern, replacement),
    value,
  );
}
