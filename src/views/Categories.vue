<script setup>
import { useRouter } from 'vue-router'
import { categories } from '../data'

const router = useRouter()
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold text-text-primary dark:text-text-primary mb-6 tracking-tight">Jelajahi Kategori</h1>
        <p class="text-lg text-text-secondary dark:text-gray-400">Jelajahi berbagai perlengkapan outdoor dan camping yang dirancang khusus untuk memenuhi kebutuhan ekspedisi Anda.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div 
          v-for="(cat, index) in categories" 
          :key="cat.id"
          @click="router.push({ path: '/products', query: { category: cat.name } })"
          class="bg-surface-card dark:bg-dark-card p-10 rounded-3xl shadow-soft hover:shadow-hover cursor-pointer transition-all duration-300 border border-gray-100 dark:border-dark-border text-center group flex flex-col items-center hover:-translate-y-2"
          data-aos="zoom-in"
          :data-aos-delay="index * 50"
        >
          <div class="w-24 h-24 bg-surface-50 dark:bg-dark-bg rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300">
            <div class="text-primary text-4xl font-extrabold">{{ cat.name.charAt(0) }}</div>
          </div>
          <h3 class="font-bold text-xl text-text-primary dark:text-text-primary group-hover:text-primary transition-colors">{{ cat.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
