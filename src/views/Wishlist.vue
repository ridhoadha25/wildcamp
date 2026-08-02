<script setup>
import { useRouter } from 'vue-router'
import { useWishlistStore } from '../stores/wishlist'
import ProductCard from '../components/ProductCard.vue'
import { Heart } from '@lucide/vue'

const router = useRouter()
const wishlistStore = useWishlistStore()
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="flex items-center mb-10">
        <Heart class="h-10 w-10 text-red-500 mr-4 fill-red-500" />
        <h1 class="text-4xl font-extrabold text-text-primary dark:text-text-primary tracking-tight">Wishlist Saya</h1>
      </div>

      <div v-if="wishlistStore.items.length === 0" class="bg-surface-card dark:bg-dark-card rounded-[2rem] shadow-soft border border-gray-100 dark:border-dark-border p-16 text-center">
        <div class="w-32 h-32 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart class="h-12 w-12 text-red-300" />
        </div>
        <h2 class="text-3xl font-extrabold text-text-primary dark:text-text-primary mb-4 tracking-tight">Wishlist Masih Kosong</h2>
        <p class="text-lg text-text-secondary dark:text-gray-400 mb-10">Simpan gear favorit Anda di sini untuk dibeli nanti.</p>
        <button @click="router.push('/products')" class="px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full transition-all duration-300 shadow-sm text-lg">
          Jelajahi Gear
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in wishlistStore.items" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </div>
  </div>
</template>
