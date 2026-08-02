import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart')) || [])

  const cartCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.product.price * (1 - item.product.discount / 100)
      return total + (price * item.quantity)
    }, 0)
  })

  const tax = computed(() => subtotal.value * 0.11)
  const shipping = computed(() => items.value.length > 0 ? 50000 : 0)
  const total = computed(() => subtotal.value + tax.value + shipping.value)

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function addToCart(product, quantity = 1) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
    saveCart()
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(item => item.product.id !== productId)
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const existing = items.value.find(item => item.product.id === productId)
    if (existing) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        existing.quantity = quantity
        saveCart()
      }
    }
  }

  function clearCart() {
    items.value = []
    saveCart()
  }

  return { items, cartCount, subtotal, tax, shipping, total, addToCart, removeFromCart, updateQuantity, clearCart }
})
