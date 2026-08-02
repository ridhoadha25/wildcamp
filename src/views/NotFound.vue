<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-32 flex items-center justify-center">
    <div class="text-center px-6">
      <h1 class="text-[10rem] font-black text-primary leading-none mb-6 drop-shadow-sm">404</h1>
      <h2 class="text-4xl font-extrabold text-text-primary dark:text-text-primary mb-6 tracking-tight">Tersesat di Hutan?</h2>
      <p class="text-xl text-text-secondary dark:text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">Sepertinya jalur yang Anda tuju tidak dapat ditemukan. Mungkin halaman ini telah dipindahkan atau dihapus.</p>
      <button @click="$router.push('/')" class="px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full transition-all shadow-md hover:shadow-hover hover:-translate-y-1 text-lg">
        Kembali ke Basecamp
      </button>
    </div>
  </div>
</template>
