<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { Tent, Menu, X, ShoppingBag, Heart, Sun, Moon, Search } from '@lucide/vue'

const router = useRouter()
const themeStore = useThemeStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { q: searchQuery.value } })
    searchQuery.value = ''
    isMobileMenuOpen.value = false
  }
}
</script>

<template>
  <header class="fixed w-full z-50 border-b border-primary/30 bg-primary backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="flex justify-between h-20 items-center">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center cursor-pointer" @click="router.push('/')">
          <Tent class="h-8 w-8 text-white" stroke-width="2.5" />
          <span class="ml-2 text-2xl font-bold tracking-tight text-white">WildCamp</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 items-center">
          <router-link to="/" class="text-sm font-semibold text-white/95 hover:text-white transition-colors">Beranda</router-link>
          <router-link to="/products" class="text-sm font-semibold text-white/95 hover:text-white transition-colors">Produk</router-link>
          <router-link to="/categories" class="text-sm font-semibold text-white/95 hover:text-white transition-colors">Kategori</router-link>
          <router-link to="/about" class="text-sm font-semibold text-white/95 hover:text-white transition-colors">Tentang</router-link>
        </nav>

        <!-- Right Icons -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Search -->
          <div class="relative group">
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Cari gear..." 
              class="w-48 pl-4 pr-10 py-2 rounded-full border border-gray-200/80 bg-white text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all group-hover:w-56"
            >
            <Search class="absolute right-3 top-2 h-5 w-5 text-text-primary cursor-pointer hover:text-primary transition-colors" @click="handleSearch" />
          </div>

          <!-- Theme Toggle -->
          <button @click="themeStore.toggleTheme()" class="rounded-full p-2 text-white/95 hover:bg-white/10 hover:text-white transition-colors">
            <Sun v-if="themeStore.isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>

          <!-- Wishlist -->
          <button @click="router.push('/wishlist')" class="relative rounded-full p-2 text-white/95 hover:bg-white/10 hover:text-red-400 transition-colors">
            <Heart class="h-5 w-5" />
            <span v-if="wishlistStore.wishlistCount > 0" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {{ wishlistStore.wishlistCount }}
            </span>
          </button>

          <!-- Cart -->
          <button @click="router.push('/cart')" class="relative rounded-full p-2 text-white/95 hover:bg-white/10 hover:text-white transition-colors">
            <ShoppingBag class="h-5 w-5" />
            <span v-if="cartStore.cartCount > 0" class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
              {{ cartStore.cartCount }}
            </span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden space-x-5">
          <button @click="themeStore.toggleTheme()" class="rounded-full p-2 text-white/95">
            <Sun v-if="themeStore.isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>
          <button @click="router.push('/cart')" class="relative rounded-full p-2 text-white/95">
            <ShoppingBag class="h-5 w-5" />
            <span v-if="cartStore.cartCount > 0" class="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {{ cartStore.cartCount }}
            </span>
          </button>
          <button @click="toggleMobileMenu" class="rounded-full p-2 text-white/95 focus:outline-none">
            <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="md:hidden absolute w-full left-0 border-t border-primary/30 bg-primary/95 backdrop-blur-xl shadow-lg">
        <div class="px-6 pt-4 pb-6 space-y-3">
          <div class="relative mb-4">
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Cari produk..." 
              class="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
            >
            <Search class="absolute right-4 top-3 h-5 w-5 text-text-primary" @click="handleSearch" />
          </div>
          <router-link @click="isMobileMenuOpen = false" to="/" class="block px-4 py-3 rounded-xl text-base font-medium text-white hover:opacity-95 transition-colors">Beranda</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/products" class="block px-4 py-3 rounded-xl text-base font-medium text-white hover:opacity-95 transition-colors">Produk</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/categories" class="block px-4 py-3 rounded-xl text-base font-medium text-white hover:opacity-95 transition-colors">Kategori</router-link>
          <router-link @click="isMobileMenuOpen = false" to="/wishlist" class="block px-4 py-3 rounded-xl text-base font-medium text-white hover:opacity-95 transition-colors flex items-center justify-between">
            Wishlist <span class="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{{ wishlistStore.wishlistCount }}</span>
          </router-link>
          <router-link @click="isMobileMenuOpen = false" to="/about" class="block px-4 py-3 rounded-xl text-base font-medium text-white hover:opacity-95 transition-colors">Tentang</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
