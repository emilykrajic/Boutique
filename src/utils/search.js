// Shared product search logic.
// Used by both the header dropdown (App.vue) and the full results page
// (views/SearchResults.vue) so matching behaves identically everywhere.

/**
 * Precompute a lowercase "haystack" per product so filtering stays cheap
 * even as the catalog grows. Call this once per products array.
 */
export function buildSearchIndex(products) {
  return products.map((product) => ({
    product,
    haystack: {
      name: (product.name || '').toLowerCase(),
      description: (product.description || '').toLowerCase(),
      category: (product.category || '').toLowerCase(),
      color: (product.color || '').toLowerCase(),
      tags: (product.tags || []).map((t) => t.toLowerCase()),
    },
  }));
}

function scoreMatch(entry, query) {
  const { name, description, category, color, tags } = entry.haystack;
  let score = 0;

  if (name === query) score += 100;
  else if (name.startsWith(query)) score += 60;
  else if (name.includes(query)) score += 40;

  if (color === query) score += 35;
  else if (color.includes(query)) score += 20;

  if (category.includes(query)) score += 20;

  if (tags.some((tag) => tag === query)) score += 25;
  else if (tags.some((tag) => tag.includes(query))) score += 15;

  if (description.includes(query)) score += 10;

  return score;
}

/**
 * Search a prebuilt index. Returns products sorted by relevance.
 * @param {ReturnType<typeof buildSearchIndex>} searchIndex
 * @param {string} query
 * @param {number} [maxResults] - omit for unlimited (full results page)
 */
export function searchProducts(searchIndex, query, maxResults) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = searchIndex
    .map((entry) => ({ entry, score: scoreMatch(entry, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry.product);

  return typeof maxResults === 'number' ? scored.slice(0, maxResults) : scored;
}

/**
 * Pick a handful of products to suggest when a search comes up empty.
 * Simple random sample; swap this out for "featured" or "best sellers"
 * if you'd rather curate it manually.
 */
export function getSuggestedProducts(products, count = 4, exclude = []) {
  const excludeIds = new Set(exclude.map((p) => p.id));
  const pool = products.filter((p) => !excludeIds.has(p.id));

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}