import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { buildSearchIndex, searchProducts, getSuggestedProducts } from '../utils/search.js';

export function useProductGrid(sourceProducts) {
  const route = useRoute();

  const searchQuery = computed(() =>
    typeof route.query.q === 'string' ? route.query.q.trim() : '',
  );

  const searchIndex = buildSearchIndex(sourceProducts);

  const isSearching = computed(() => searchQuery.value.length > 0);

  const matches = computed(() =>
    isSearching.value ? searchProducts(searchIndex, searchQuery.value) : sourceProducts,
  );

  const suggestions = computed(() =>
    isSearching.value && matches.value.length === 0
      ? getSuggestedProducts(sourceProducts, 4, matches.value)
      : [],
  );

  const displayedProducts = computed(() =>
    isSearching.value && matches.value.length === 0 ? suggestions.value : matches.value,
  );

  return { searchQuery, isSearching, matches, suggestions, displayedProducts };
}
