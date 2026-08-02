<script setup>
import { Tent, MessageCircle, Camera, Circle } from '@lucide/vue'
</script>

<template>
  <footer class="bg-dark-bg text-gray-300 py-16 border-t border-dark-border">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <!-- Brand & About -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center mb-6">
            <Tent class="h-10 w-10 text-accent" stroke-width="2.5" />
            <span class="ml-3 text-3xl font-extrabold text-white tracking-tight">WildCamp</span>
          </div>
          <p class="text-gray-400 mb-8 leading-relaxed">
            Penyedia perlengkapan outdoor dan camping premium. Dirancang untuk menemani setiap langkah eksplorasi Anda.
          </p>
          <div class="flex space-x-5">
            <a href="#" class="h-10 w-10 rounded-full bg-dark-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"><Camera class="h-5 w-5" /></a>
            <a href="#" class="h-10 w-10 rounded-full bg-dark-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"><Circle class="h-5 w-5" /></a>
            <a href="#" class="h-10 w-10 rounded-full bg-dark-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"><MessageCircle class="h-5 w-5" /></a>
            <a href="#" class="h-10 w-10 rounded-full bg-dark-card flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"><Tent class="h-5 w-5" /></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold text-white mb-6 tracking-wide">Gear & Pakaian</h3>
          <ul class="space-y-4">
            <li><router-link to="/products" class="text-gray-400 hover:text-accent transition-colors">Semua Produk</router-link></li>
            <li><router-link to="/categories" class="text-gray-400 hover:text-accent transition-colors">Kategori</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-accent transition-colors">Cerita Kami</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-accent transition-colors">Kontak</router-link></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-bold text-white mb-6 tracking-wide">Bantuan</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-gray-400 hover:text-accent transition-colors">Pusat Bantuan</a></li>
            <li><a href="#" class="text-gray-400 hover:text-accent transition-colors">Pengiriman & Pengembalian</a></li>
            <li><a href="#" class="text-gray-400 hover:text-accent transition-colors">Informasi Garansi</a></li>
            <li><a href="#" class="text-gray-400 hover:text-accent transition-colors">Kebijakan Privasi</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-bold text-white mb-6 tracking-wide">Gabung Petualangan</h3>
          <p class="text-gray-400 mb-6">Dapatkan info gear terbaru, promo eksklusif, dan inspirasi petualangan.</p>
          <form @submit.prevent class="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Alamat email Anda" 
              class="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white focus:ring-1 focus:ring-accent outline-none placeholder-gray-500"
            >
            <button type="submit" class="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-xl transition-colors font-bold shadow-soft text-center">
              Berlangganan
            </button>
          </form>
        </div>
      </div>
      
      <div class="border-t border-dark-border mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} WildCamp. Semua hak dilindungi.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-white transition-colors">Syarat Layanan</a>
          <a href="#" class="hover:text-white transition-colors">Privasi</a>
        </div>
      </div>
    </div>
  </footer>
</template>
