<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '../data'
import ProductCard from '../components/ProductCard.vue'
import { Search, Filter, X } from '@lucide/vue'

const route = useRoute()
const router = useRouter()

// State
const searchQuery = ref(route.query.q || '')
const selectedCategory = ref(route.query.category || '')
const selectedBrand = ref('')
const maxPrice = ref(5000000)
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 8
const isFilterOpen = ref(false)

// Extract unique brands
const brands = computed(() => {
  const allBrands = products.map(p => p.brand)
  return [...new Set(allBrands)].sort()
})

// Filter and Sort logic
const filteredProducts = computed(() => {
  let result = products

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  if (selectedBrand.value) {
    result = result.filter(p => p.brand === selectedBrand.value)
  }

  result = result.filter(p => {
    const price = p.discount ? p.price * (1 - p.discount / 100) : p.price
    return price <= maxPrice.value
  })

  // Sorting
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => {
      const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
      const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
      return priceA - priceB
    })
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => {
      const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
      const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
      return priceB - priceA
    })
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else {
    // newest (mocked by id descending)
    result.sort((a, b) => b.id - a.id)
  }

  return result
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

watch([searchQuery, selectedCategory, selectedBrand, maxPrice, sortBy], () => {
  currentPage.value = 1
})

watch(() => route.query.q, (newQ) => {
  searchQuery.value = newQ || ''
})
watch(() => route.query.category, (newCat) => {
  selectedCategory.value = newCat || ''
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedBrand.value = ''
  maxPrice.value = 5000000
  router.push('/products')
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-dark-border pb-6">
        <div>
          <h1 class="text-4xl font-extrabold text-text-primary dark:text-text-primary tracking-tight">Gear Collection</h1>
          <p class="text-text-secondary dark:text-gray-400 mt-3 text-lg">Menampilkan {{ filteredProducts.length }} produk premium</p>
        </div>
        
        <!-- Mobile Filter Toggle -->
        <button 
          @click="isFilterOpen = !isFilterOpen" 
          class="md:hidden mt-6 px-5 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl flex items-center shadow-soft font-bold text-text-primary"
        >
          <Filter class="h-5 w-5 mr-2" /> Filter & Urutkan
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-10">
        
        <!-- Sidebar Filters -->
        <aside 
          :class="['md:w-72 flex-shrink-0 space-y-8', isFilterOpen ? 'block' : 'hidden md:block']"
        >
          <div class="bg-surface-card dark:bg-dark-card p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border">
            <div class="flex justify-between items-center mb-8">
              <h3 class="font-extrabold text-text-primary dark:text-text-primary text-xl tracking-tight">Filters</h3>
              <button @click="clearFilters" class="text-sm font-bold text-primary hover:text-primary-light transition-colors">Reset</button>
            </div>
            
            <!-- Search -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-3">Pencarian</label>
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Cari produk..." 
                  class="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                <Search class="absolute right-4 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <!-- Categories -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-3">Kategori</label>
              <select v-model="selectedCategory" class="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                <option value="">Semua Kategori</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
              </select>
            </div>

            <!-- Brands -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-3">Brand</label>
              <select v-model="selectedBrand" class="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                <option value="">Semua Brand</option>
                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>

            <!-- Price -->
            <div class="mb-8">
              <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-3">Harga Maksimal</label>
              <input 
                type="range" 
                v-model="maxPrice" 
                min="0" 
                max="5000000" 
                step="100000" 
                class="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              >
              <div class="text-right text-sm font-bold text-text-primary mt-3">
                {{ formatPrice(maxPrice) }}
              </div>
            </div>
            
            <!-- Sort -->
            <div>
              <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-3">Urutkan</label>
              <select v-model="sortBy" class="w-full py-3 px-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="flex-grow">
          
          <!-- Empty State -->
          <div v-if="paginatedProducts.length === 0" class="bg-surface-card dark:bg-dark-card p-16 rounded-3xl text-center border border-gray-100 dark:border-dark-border flex flex-col items-center justify-center min-h-[500px] shadow-soft">
            <div class="h-24 w-24 bg-surface-50 dark:bg-dark-bg rounded-full flex items-center justify-center mb-6">
              <Search class="h-10 w-10 text-gray-400" />
            </div>
            <h3 class="text-2xl font-extrabold text-text-primary dark:text-text-primary mb-3">Produk Tidak Ditemukan</h3>
            <p class="text-text-secondary dark:text-gray-400 mb-8 max-w-md">Coba ubah kata kunci atau hapus beberapa filter untuk menemukan produk yang Anda cari.</p>
            <button @click="clearFilters" class="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors shadow-soft hover:shadow-hover">
              Reset Semua Filter
            </button>
          </div>

          <!-- Grid -->
          <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCard 
                v-for="(product, index) in paginatedProducts" 
                :key="product.id" 
                :product="product" 
                data-aos="fade-up"
                :data-aos-delay="(index % 3) * 100"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-16 flex justify-center space-x-3">
              <button 
                @click="currentPage > 1 && currentPage--" 
                :disabled="currentPage === 1"
                class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-50 dark:hover:bg-dark-card transition-colors bg-surface-card shadow-sm"
              >
                &laquo;
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 font-bold',
                  currentPage === page 
                    ? 'bg-primary text-white shadow-md transform scale-110' 
                    : 'border border-gray-200 dark:border-dark-border hover:bg-surface-50 dark:hover:bg-dark-card bg-surface-card shadow-sm'
                ]"
              >
                {{ page }}
              </button>
              
              <button 
                @click="currentPage < totalPages && currentPage++" 
                :disabled="currentPage === totalPages"
                class="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 dark:border-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-50 dark:hover:bg-dark-card transition-colors bg-surface-card shadow-sm"
              >
                &raquo;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
