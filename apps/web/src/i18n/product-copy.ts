const LEGACY_PRODUCT_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bOpenDesign Cloud\b/g, 'PARÉ Cloud'],
  [/\bOpen Design Cloud\b/g, 'PARÉ Cloud'],
  [/\bOpen-Design Cloud\b/g, 'PARÉ Cloud'],
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

const BRANDABLE_ATTRIBUTES = ['aria-label', 'title', 'placeholder', 'alt'] as const;
const TECHNICAL_COPY_SELECTOR = 'code, pre, kbd, samp, [data-keep-runtime-brand]';

function shouldPreserveNode(node: Node): boolean {
  const element = node.nodeType === Node.ELEMENT_NODE
    ? node as Element
    : node.parentElement;
  return Boolean(element?.closest(TECHNICAL_COPY_SELECTOR));
}

function rebrandTextNode(node: Node): void {
  if (node.nodeType !== Node.TEXT_NODE || shouldPreserveNode(node)) return;
  const current = node.nodeValue;
  if (!current) return;
  const next = rebrandProductCopy(current);
  if (next !== current) node.nodeValue = next;
}

function rebrandElementAttributes(element: Element): void {
  if (shouldPreserveNode(element)) return;
  for (const attribute of BRANDABLE_ATTRIBUTES) {
    const current = element.getAttribute(attribute);
    if (!current) continue;
    const next = rebrandProductCopy(current);
    if (next !== current) element.setAttribute(attribute, next);
  }
}

/**
 * Apply PARÉ branding to rendered UI copy. This is intentionally a presentation
 * boundary: it changes what people see, not compatibility identifiers in the
 * runtime, storage, APIs, packages, source examples, or third-party agent names.
 */
export function rebrandProductDom(root: ParentNode): void {
  if (typeof document === 'undefined' || typeof Node === 'undefined') return;

  if (root instanceof Element) rebrandElementAttributes(root);

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  );

  let current = walker.nextNode();
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) rebrandTextNode(current);
    else if (current instanceof Element) rebrandElementAttributes(current);
    current = walker.nextNode();
  }
}

/**
 * Keep dynamically mounted dialogs, popovers, help surfaces and portal content
 * on-brand after the initial render. Returns a cleanup function for React.
 */
export function installProductBrandGuard(root: ParentNode = document.documentElement): () => void {
  if (
    typeof document === 'undefined'
    || typeof MutationObserver === 'undefined'
    || typeof Node === 'undefined'
  ) {
    return () => undefined;
  }

  rebrandProductDom(root);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        rebrandTextNode(mutation.target);
        continue;
      }

      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        rebrandElementAttributes(mutation.target);
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) rebrandTextNode(node);
        else if (node instanceof Element) rebrandProductDom(node);
      }
    }
  });

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...BRANDABLE_ATTRIBUTES],
  });

  return () => observer.disconnect();
}
