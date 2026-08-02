<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useToast } from 'vue-toastification'
import { ShoppingBag, Heart, Star } from '@lucide/vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

const discountedPrice = computed(() => {
  if (!props.product.discount) return props.product.price
  return props.product.price * (1 - props.product.discount / 100)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const addToCart = () => {
  cartStore.addToCart(props.product)
  toast.success(`${props.product.name} added to cart!`)
}

const toggleWishlist = () => {
  wishlistStore.toggleWishlist(props.product)
  if (wishlistStore.isInWishlist(props.product.id)) {
    toast.success(`${props.product.name} added to wishlist!`)
  }
}
</script>

<template>
  <div class="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#d8efe0] bg-gradient-to-br from-[#eef8f1] via-[#f6fff9] to-[#eaf8ee] shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(45,106,79,0.12)] dark:border-dark-border dark:bg-dark-card" @click="router.push(`/product/${product.id}`)">
    
    <!-- Badges -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
      <span v-if="product.discount > 0" class="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        -{{ product.discount }}%
      </span>
      <span v-if="product.isNew" class="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
        NEW
      </span>
    </div>

    <!-- Wishlist Button -->
    <button 
      @click.stop="toggleWishlist" 
      class="absolute top-4 right-4 z-10 rounded-full bg-white/95 p-2.5 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 dark:bg-dark-bg/90"
    >
      <Heart :class="[
        'h-5 w-5 transition-colors duration-300', 
        wishlistStore.isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-text-secondary hover:text-red-500 dark:text-gray-400'
      ]" />
    </button>

    <!-- Image -->
    <div class="relative overflow-hidden pt-[100%] bg-gradient-to-br from-[#eef8f1] to-[#eaf8ee] dark:bg-dark-bg">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <div class="text-[11px] text-accent font-bold mb-2 uppercase tracking-widest">{{ product.category }}</div>
      
      <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
        {{ product.name }}
      </h3>
      
      <div class="flex items-center mb-4">
        <Star class="h-4 w-4 fill-accent text-accent" />
        <span class="ml-1.5 text-sm font-medium text-text-secondary dark:text-gray-400">{{ product.rating }}</span>
      </div>

      <div class="mt-auto flex items-end justify-between">
        <div>
          <div v-if="product.discount > 0" class="text-xs text-text-secondary dark:text-gray-500 line-through mb-1">
            {{ formatPrice(product.price) }}
          </div>
          <div class="text-xl font-bold text-text-primary dark:text-text-primary">
            {{ formatPrice(discountedPrice) }}
          </div>
        </div>
        
            <button 
              @click.stop="addToCart"
              class="rounded-2xl bg-primary p-3 text-white transition-all duration-300 hover:scale-105 active:scale-95 group-hover:bg-primary-dark"
              title="Add to Cart"
            >
          <ShoppingBag class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>
