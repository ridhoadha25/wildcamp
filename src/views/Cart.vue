<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from '@lucide/vue'

const router = useRouter()
const cartStore = useCartStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const getDiscountedPrice = (product) => {
  if (!product.discount) return product.price
  return product.price * (1 - product.discount / 100)
}

const increaseQuantity = (item) => {
  if (item.quantity < item.product.stock) {
    cartStore.updateQuantity(item.product.id, item.quantity + 1)
  }
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.product.id, item.quantity - 1)
  }
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <h1 class="text-4xl font-extrabold text-text-primary dark:text-text-primary mb-10 tracking-tight">Keranjang Saya</h1>

      <div v-if="cartStore.items.length === 0" class="bg-surface-card dark:bg-dark-card rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border p-16 text-center">
        <div class="w-32 h-32 bg-surface-50 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag class="h-12 w-12 text-gray-400" />
        </div>
        <h2 class="text-3xl font-extrabold text-text-primary dark:text-text-primary mb-4">Keranjang Anda Kosong</h2>
        <p class="text-lg text-text-secondary dark:text-gray-400 mb-10 max-w-lg mx-auto">Looks like you haven't added any gear for your next adventure yet.</p>
        <button @click="router.push('/products')" class="px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold text-lg rounded-full transition-all shadow-md hover:shadow-hover hover:-translate-y-1">
          Jelajahi Gear
        </button>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-10">
        
        <!-- Cart Items -->
        <div class="lg:w-2/3 space-y-6">
          <div 
            v-for="item in cartStore.items" 
            :key="item.product.id"
            class="bg-surface-card dark:bg-dark-card p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-border flex flex-col sm:flex-row items-center gap-8 relative hover:shadow-md transition-shadow"
          >
            <!-- Delete btn mobile -->
            <button @click="cartStore.removeFromCart(item.product.id)" class="absolute top-6 right-6 sm:hidden text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 class="h-5 w-5" />
            </button>

            <div class="bg-surface-100 dark:bg-dark-bg rounded-2xl p-2 w-full sm:w-32 h-40 sm:h-32 flex-shrink-0">
              <img :src="item.product.image" :alt="item.product.name" class="w-full h-full object-cover rounded-xl" />
            </div>
            
            <div class="flex-grow w-full">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-xl font-bold text-text-primary dark:text-text-primary hover:text-primary transition-colors cursor-pointer line-clamp-1" @click="router.push(`/product/${item.product.id}`)">
                    {{ item.product.name }}
                  </h3>
                  <p class="text-sm font-medium text-text-secondary dark:text-gray-400 mt-1 uppercase tracking-wider">{{ item.product.category }}</p>
                </div>
                <button @click="cartStore.removeFromCart(item.product.id)" class="hidden sm:flex text-gray-400 hover:text-red-500 transition-colors p-2 bg-surface-50 dark:bg-dark-bg rounded-full">
                  <Trash2 class="h-5 w-5" />
                </button>
              </div>

              <div class="flex flex-col sm:flex-row justify-between items-center mt-6">
                <div class="text-primary font-extrabold text-2xl w-full sm:w-auto mb-4 sm:mb-0">
                  {{ formatPrice(getDiscountedPrice(item.product)) }}
                </div>
                
                <div class="flex items-center bg-surface-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl w-full sm:w-auto justify-between sm:justify-start px-2 py-1">
                  <button @click="decreaseQuantity(item)" class="p-2 text-text-secondary hover:text-primary transition-colors">
                    <Minus class="h-4 w-4" />
                  </button>
                  <span class="w-12 text-center font-bold text-text-primary dark:text-text-primary">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="p-2 text-text-secondary hover:text-primary transition-colors" :disabled="item.quantity >= item.product.stock">
                    <Plus class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:w-1/3">
          <div class="bg-surface-card dark:bg-dark-card p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border sticky top-28">
            <h3 class="text-2xl font-extrabold text-text-primary dark:text-text-primary mb-6 tracking-tight">Ringkasan</h3>
            
            <div class="space-y-5 mb-8">
              <div class="flex justify-between text-text-secondary dark:text-gray-400 text-lg">
                <span>Subtotal ({{ cartStore.cartCount }} items)</span>
                <span class="font-bold text-text-primary dark:text-text-primary">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-text-secondary dark:text-gray-400 text-lg">
                <span>Estimasi Pajak (11%)</span>
                  <span class="font-bold text-text-primary dark:text-text-primary">{{ formatPrice(cartStore.tax) }}</span>
              </div>
              <div class="flex justify-between text-text-secondary dark:text-gray-400 text-lg">
                <span>Pengiriman</span>
                  <span class="font-bold text-text-primary dark:text-text-primary">{{ cartStore.shipping === 0 ? 'Free' : formatPrice(cartStore.shipping) }}</span>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-dark-border pt-6 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-text-primary dark:text-text-primary">Total</span>
                <span class="text-3xl font-extrabold text-accent">{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>
            
            <button @click="router.push('/checkout')" class="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-full flex justify-center items-center transition-all shadow-md hover:shadow-hover hover:-translate-y-1 text-lg">
              Lanjut ke Checkout <ArrowRight class="ml-2 h-5 w-5" />
            </button>
            
            <div class="mt-6 flex items-center justify-center text-sm text-text-secondary font-medium">
              <ShieldCheck class="h-4 w-4 mr-2 text-primary" /> Checkout Aman Dijamin
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
