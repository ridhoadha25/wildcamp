import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(JSON.parse(localStorage.getItem('wishlist')) || [])

  const wishlistCount = computed(() => items.value.length)

  function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(items.value))
  }

  function toggleWishlist(product) {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push(product)
    }
    saveWishlist()
  }

  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }

  return { items, wishlistCount, toggleWishlist, isInWishlist }
})
