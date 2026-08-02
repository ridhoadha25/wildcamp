<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { products, categories } from '../data'
import ProductCard from '../components/ProductCard.vue'
import { ArrowRight, ChevronDown, ChevronUp, MapPin, Truck, ShieldCheck, Clock, Compass } from '@lucide/vue'

const router = useRouter()

const flashSaleProducts = ref([])
const bestSellers = ref([])
const faqs = ref([
  { q: 'Apakah produk di WildCamp dijamin original?', a: 'Ya, semua produk kami 100% original dan memiliki garansi resmi dari distributor.', isOpen: false },
  { q: 'Berapa lama proses pengiriman?', a: 'Pesanan sebelum jam 15:00 akan dikirim pada hari yang sama. Pengiriman reguler memakan waktu 2-3 hari kerja.', isOpen: false },
  { q: 'Apakah bisa melakukan retur barang?', a: 'Bisa, maksimal 3 hari setelah barang diterima dengan syarat tag masih terpasang dan belum pernah digunakan di lapangan.', isOpen: false },
])

onMounted(() => {
  flashSaleProducts.value = products.filter(p => p.discount > 0).slice(0, 4)
  bestSellers.value = products.filter(p => p.isBestSeller).slice(0, 8)
})

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg">
    <!-- Premium Hero Section -->
    <section class="relative flex min-h-[560px] items-center justify-center overflow-hidden py-20 sm:min-h-[640px] sm:py-24 lg:h-[90vh] lg:min-h-[700px]">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" 
          alt="Majestic mountains" 
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-premium opacity-80 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-surface-50 dark:from-dark-bg to-transparent opacity-90"></div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6" data-aos="fade-up">
        <span class="mb-4 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md sm:mb-6 sm:text-sm">
          Equip Your Journey
        </span>
        <h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:mb-8 sm:text-5xl md:text-7xl">
          Embrace the <span class="text-accent">Wild.</span>
        </h1>
        <p class="mx-auto mb-8 max-w-3xl text-base font-light leading-relaxed text-gray-100 drop-shadow-md sm:mb-10 sm:text-lg md:text-2xl">
          Peralatan outdoor premium yang dirancang untuk menemani setiap langkah eksplorasi Anda di alam bebas.
        </p>
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-5 sm:justify-center">
          <button @click="router.push('/products')" class="group flex items-center justify-center rounded-full bg-primary px-7 py-3 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-primary-light sm:px-10 sm:py-4 sm:text-lg">
            Belanja Koleksi <ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button @click="router.push('/categories')" class="flex items-center justify-center rounded-full glass px-7 py-3 text-base font-bold text-white transition-all hover:bg-white/30 sm:px-10 sm:py-4 sm:text-lg">
            Jelajahi Gear
          </button>
        </div>
      </div>
    </section>

    <!-- Features / Value Props -->
    <section class="relative z-20 -mt-8 py-10 sm:-mt-10 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div class="flex flex-col items-center rounded-3xl border border-gray-100 bg-surface-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1 dark:border-dark-border dark:bg-dark-card sm:p-6" data-aos="fade-up" data-aos-delay="100">
            <div class="h-14 w-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
              <Compass class="h-7 w-7" />
            </div>
            <h4 class="font-bold text-text-primary dark:text-text-primary mb-2">Gear Terpilih</h4>
            <p class="text-sm text-text-secondary dark:text-gray-400">Pilihan terbaik untuk petualang sejati</p>
          </div>
          <div class="flex flex-col items-center rounded-3xl border border-gray-100 bg-surface-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1 dark:border-dark-border dark:bg-dark-card sm:p-6" data-aos="fade-up" data-aos-delay="200">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent dark:bg-accent/20">
              <ShieldCheck class="h-7 w-7" />
            </div>
            <h4 class="font-bold text-text-primary dark:text-text-primary mb-2">Garansi Seumur Hidup</h4>
            <p class="text-sm text-text-secondary dark:text-gray-400">Garansi resmi untuk produk terpilih</p>
          </div>
          <div class="flex flex-col items-center rounded-3xl border border-gray-100 bg-surface-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1 dark:border-dark-border dark:bg-dark-card sm:p-6" data-aos="fade-up" data-aos-delay="300">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-900/20">
              <Truck class="h-7 w-7" />
            </div>
            <h4 class="font-bold text-text-primary dark:text-text-primary mb-2">Gratis Ongkir</h4>
            <p class="text-sm text-text-secondary dark:text-gray-400">Ke seluruh Indonesia (Min. belanja)</p>
          </div>
          <div class="flex flex-col items-center rounded-3xl border border-gray-100 bg-surface-card p-5 text-center shadow-soft transition-transform hover:-translate-y-1 dark:border-dark-border dark:bg-dark-card sm:p-6" data-aos="fade-up" data-aos-delay="400">
            <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 dark:bg-purple-900/20">
              <MapPin class="h-7 w-7" />
            </div>
            <h4 class="font-bold text-text-primary dark:text-text-primary mb-2">Toko Utama</h4>
            <p class="text-sm text-text-secondary dark:text-gray-400">Kunjungi toko offline kami</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div class="mb-8 flex flex-col items-start md:mb-12 md:flex-row md:items-end md:justify-between">
          <div class="max-w-2xl">
            <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-text-primary dark:text-text-primary sm:text-4xl">Belanja Sesuai Kegiatan</h2>
            <p class="text-base text-text-secondary dark:text-gray-400 sm:text-lg">Peralatan spesifik yang dirancang untuk memaksimalkan performa di setiap medan.</p>
          </div>
          <button @click="router.push('/categories')" class="group mt-5 flex items-center text-primary font-bold transition-colors hover:text-primary-light md:mt-0">
            Lihat Semua Kategori <ArrowRight class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          <div 
            v-for="(cat, index) in categories.slice(0, 4)" 
            :key="cat.id"
            @click="router.push({ path: '/products', query: { category: cat.name } })"
            class="rounded-3xl border border-gray-100 bg-surface-card p-4 text-center shadow-soft transition-all duration-300 hover:shadow-hover cursor-pointer group sm:p-8 dark:border-dark-border dark:bg-dark-card"
            data-aos="zoom-in"
            :data-aos-delay="index * 100"
          >
            <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/5 dark:bg-dark-bg sm:mb-6 sm:h-20 sm:w-20">
              <div class="text-2xl font-extrabold text-primary sm:text-3xl">{{ cat.name.charAt(0) }}</div>
            </div>
            <h3 class="text-sm font-bold text-text-primary transition-colors group-hover:text-primary dark:text-text-primary sm:text-lg">{{ cat.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Flash Sale -->
    <section class="border-y border-gray-100 bg-surface-card py-16 sm:py-24 dark:border-dark-border dark:bg-dark-card">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div class="mb-8 flex flex-col items-start md:mb-12 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <h2 class="flex items-center text-2xl font-extrabold tracking-tight text-text-primary dark:text-text-primary sm:text-4xl">
              <span class="mr-3 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-sm animate-pulse">HOT</span>
              Penawaran Terbatas
            </h2>
          </div>
          <button @click="router.push('/products')" class="group mt-4 md:mt-0 flex items-center text-accent font-bold hover:text-accent-hover transition-colors">
            Lihat Semua Penawaran <ArrowRight class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <ProductCard 
            v-for="(product, index) in flashSaleProducts" 
            :key="product.id" 
            :product="product" 
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          />
        </div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-text-primary dark:text-text-primary sm:text-4xl">Terbaik di Kelasnya</h2>
          <p class="text-base text-text-secondary dark:text-gray-400 sm:text-lg">Produk legendaris yang telah diuji di medan paling ekstrem oleh ribuan petualang.</p>
        </div>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <ProductCard 
            v-for="(product, index) in bestSellers" 
            :key="product.id" 
            :product="product" 
            data-aos="fade-up"
            :data-aos-delay="(index % 4) * 100"
          />
        </div>
        
        <div class="mt-10 text-center sm:mt-16">
          <button @click="router.push('/products')" class="rounded-full border-2 border-primary px-8 py-3 text-base font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white sm:px-10 sm:py-4 sm:text-lg">
            Lihat Semua Koleksi
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="border-t border-gray-100 bg-surface-card py-16 sm:py-24 dark:border-dark-border dark:bg-dark-card">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12">
        <div class="mb-10 text-center sm:mb-16">
          <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-text-primary dark:text-text-primary sm:text-4xl">Pertanyaan yang Sering Diajukan</h2>
          <p class="text-base text-text-secondary dark:text-gray-400 sm:text-lg">Punya pertanyaan? Kami punya jawabannya.</p>
        </div>
        
        <div class="space-y-4 sm:space-y-6">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="border border-gray-100 dark:border-dark-border rounded-3xl overflow-hidden bg-surface-50 dark:bg-dark-bg shadow-sm"
          >
            <button 
              @click="toggleFaq(index)"
              class="flex w-full items-center justify-between px-4 py-4 text-left focus:outline-none sm:px-8 sm:py-6"
            >
              <span class="text-sm font-bold text-text-primary dark:text-text-primary sm:text-lg">{{ faq.q }}</span>
              <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-dark-card sm:h-10 sm:w-10">
                <ChevronUp v-if="faq.isOpen" class="h-5 w-5 text-primary" />
                <ChevronDown v-else class="h-5 w-5 text-text-secondary" />
              </div>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="faq.isOpen" class="px-4 pb-4 text-sm leading-relaxed text-text-secondary dark:text-gray-400 sm:px-8 sm:pb-6 sm:text-lg">
                {{ faq.a }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
