<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useToast } from 'vue-toastification'
import ProductCard from '../components/ProductCard.vue'
import { Minus, Plus, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCcw, Star, ChevronRight } from '@lucide/vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

const product = ref(null)
const quantity = ref(1)
const loading = ref(true)

const loadProduct = () => {
  loading.value = true
  const id = parseInt(route.params.id)
  const found = products.find(p => p.id === id)
  
  if (found) {
    product.value = found
    quantity.value = 1
  } else {
    router.push('/404')
  }
  
  setTimeout(() => {
    loading.value = false
  }, 600)
}

onMounted(() => {
  loadProduct()
})

watch(() => route.params.id, () => {
  loadProduct()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const discountedPrice = computed(() => {
  if (!product.value || !product.value.discount) return product.value?.price || 0
  return product.value.price * (1 - product.value.discount / 100)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  cartStore.addToCart(product.value, quantity.value)
  toast.success(`${quantity.value} ${product.value.name} ditambahkan ke keranjang!`)
}

const toggleWishlist = () => {
  wishlistStore.toggleWishlist(product.value)
  if (wishlistStore.isInWishlist(product.value.id)) {
    toast.success(`${product.value.name} ditambahkan ke wishlist!`)
  }
}

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <!-- Skeleton Loading -->
      <div v-if="loading" class="animate-pulse flex flex-col lg:flex-row gap-12 bg-surface-card dark:bg-dark-card p-8 md:p-12 rounded-[2rem] shadow-soft border border-gray-100 dark:border-dark-border">
        <div class="lg:w-1/2 bg-gray-200 dark:bg-gray-800 h-[500px] md:h-[600px] rounded-3xl"></div>
        <div class="lg:w-1/2 space-y-8 py-4">
          <div class="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div class="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div class="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div class="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div class="flex gap-4">
            <div class="h-16 w-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            <div class="h-16 flex-grow bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          </div>
        </div>
      </div>

      <!-- Main Product Area -->
      <div v-else-if="product" class="bg-surface-card dark:bg-dark-card rounded-[2rem] shadow-soft border border-gray-100 dark:border-dark-border overflow-hidden mb-20">
        <div class="flex flex-col lg:flex-row">
          
          <!-- Image -->
          <div class="lg:w-1/2 relative bg-surface-100 dark:bg-dark-bg p-8 flex items-center justify-center">
            <div v-if="product.discount > 0" class="absolute top-8 left-8 z-10 bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-md">
              Hemat {{ product.discount }}%
            </div>
            <img :src="product.image" :alt="product.name" class="w-full max-h-[600px] object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-700" />
          </div>

          <!-- Info -->
          <div class="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            
            <!-- Breadcrumb -->
            <div class="text-sm font-medium text-text-secondary dark:text-gray-400 mb-6 flex items-center space-x-2">
              <router-link to="/" class="hover:text-primary transition-colors">Beranda</router-link>
              <ChevronRight class="h-4 w-4" />
              <router-link to="/products" class="hover:text-primary transition-colors">Gear</router-link>
              <ChevronRight class="h-4 w-4" />
              <span class="text-primary">{{ product.category }}</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-extrabold text-text-primary dark:text-text-primary mb-6 leading-tight tracking-tight">
              {{ product.name }}
            </h1>
            
            <div class="flex items-center space-x-6 mb-8">
              <div class="flex items-center bg-surface-100 dark:bg-dark-bg px-3 py-1.5 rounded-full">
                <Star class="h-5 w-5 fill-accent text-accent" />
                <span class="ml-2 font-bold text-text-primary dark:text-text-primary">{{ product.rating }}</span>
              </div>
              <div class="text-text-secondary">
                Brand: <span class="font-extrabold text-primary">{{ product.brand }}</span>
              </div>
            </div>

            <div class="mb-10">
              <div v-if="product.discount > 0" class="flex items-end space-x-4 mb-1">
                <span class="text-4xl font-extrabold text-text-primary dark:text-text-primary">{{ formatPrice(discountedPrice) }}</span>
                <span class="text-xl font-medium text-gray-400 line-through mb-1">{{ formatPrice(product.price) }}</span>
              </div>
              <div v-else class="text-4xl font-extrabold text-text-primary dark:text-text-primary">
                {{ formatPrice(product.price) }}
              </div>
            </div>

            <p class="text-text-secondary dark:text-gray-300 text-lg leading-relaxed mb-10 font-light">
              {{ product.description }}
            </p>

            <div class="mb-10 bg-surface-50 dark:bg-dark-bg rounded-2xl p-6 grid grid-cols-2 gap-6 border border-gray-100 dark:border-dark-border">
              <div class="flex items-center text-sm font-medium text-text-primary dark:text-gray-300">
                <ShieldCheck class="h-6 w-6 text-primary mr-3" /> 100% Original
              </div>
              <div class="flex items-center text-sm font-medium text-text-primary dark:text-gray-300">
                <Truck class="h-6 w-6 text-primary mr-3" /> Gratis Ongkir
              </div>
              <div class="flex items-center text-sm font-medium text-text-primary dark:text-gray-300">
                <RefreshCcw class="h-6 w-6 text-primary mr-3" /> Pengembalian 30 Hari
              </div>
              <div class="flex items-center text-sm font-medium text-text-primary dark:text-gray-300">
                <span class="text-accent font-extrabold mr-2">Status:</span> {{ product.stock }} Tersedia
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-5 mb-4">
              <!-- Qty control -->
              <div class="flex items-center bg-surface-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-2xl px-5 py-3 w-full sm:w-auto justify-between sm:justify-start">
                <button @click="decreaseQuantity" class="text-text-secondary hover:text-primary p-2 transition-colors disabled:opacity-30" :disabled="quantity <= 1">
                  <Minus class="h-5 w-5" />
                </button>
                <span class="w-12 text-center font-extrabold text-text-primary dark:text-text-primary text-xl">{{ quantity }}</span>
                <button @click="increaseQuantity" class="text-text-secondary hover:text-primary p-2 transition-colors disabled:opacity-30" :disabled="quantity >= product.stock">
                  <Plus class="h-5 w-5" />
                </button>
              </div>
              
              <!-- Add to Cart -->
              <button 
                @click="addToCart"
                class="flex-1 bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-2xl flex justify-center items-center transition-all duration-300 shadow-md hover:shadow-hover hover:-translate-y-1"
              >
                <ShoppingBag class="h-6 w-6 mr-3" />
                Tambahkan ke Keranjang
              </button>
              
              <!-- Wishlist -->
              <button 
                @click="toggleWishlist"
                class="w-full sm:w-auto p-4 border-2 border-gray-200 dark:border-dark-border rounded-2xl flex justify-center items-center hover:bg-surface-50 dark:hover:bg-dark-bg transition-all duration-300 hover:-translate-y-1"
                :class="wishlistStore.isInWishlist(product.id) ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20' : ''"
              >
                <Heart :class="{'fill-red-500 text-red-500': wishlistStore.isInWishlist(product.id), 'text-text-secondary': !wishlistStore.isInWishlist(product.id)}" class="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0 && !loading" class="mb-16">
        <div class="flex justify-between items-end mb-10">
          <h2 class="text-3xl font-extrabold text-text-primary dark:text-text-primary tracking-tight">Anda Mungkin Juga Suka</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard 
            v-for="p in relatedProducts" 
            :key="p.id" 
            :product="p" 
          />
        </div>
      </div>

    </div>
  </div>
</template>
