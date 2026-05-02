/**
 * Polish typography helpers.
 *
 * Polish typesetting custom: single-letter prepositions and conjunctions
 * (a, i, o, u, w, z, ż) must never end a line. We replace the regular space
 * after them with a non-breaking space ( ).
 */

const PL_ORPHANS = /(^|\s|>|„|"|\()([aiouwzżAIOUWZŻ])\s+/gu;

export function polishTypography(input: string): string {
  if (!input) return input;
  return input
    // Replace ASCII straight quotes with Polish „...” — only when not inside HTML attrs
    // (handled simplistically; keep current logic minimal to avoid regressions)
    .replace(PL_ORPHANS, (_match, lead, letter) => `${lead}${letter} `);
}

/** Convenience: preserves HTML tags by only operating on text segments. */
export function polishTypographyHtml(html: string): string {
  if (!html) return html;
  return html.replace(/(>)([^<]+)(<)/g, (_match, a, text, c) => `${a}${polishTypography(text)}${c}`);
}
