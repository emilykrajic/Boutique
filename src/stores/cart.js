import { ref, computed } from 'vue'

const items = ref([])
const _recentlyViewed = ref([])

export function useCart() {
  const recentlyViewed = computed(() =>
    _recentlyViewed.value.filter(p => !items.value.find(i => i.id === p.id))
  )

  function addToCart(product, size = null) {
    const existing = items.value.find(
      i => i.id === product.id && i.size === size
    )
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, size, qty: 1 })
    }
  }

  function viewProduct(product) {
    const alreadySeen = _recentlyViewed.value.find(i => i.id === product.id)
    if (!alreadySeen) {
      _recentlyViewed.value.unshift(product)
    }
  }

  return { items, addToCart, viewProduct, recentlyViewed }
}