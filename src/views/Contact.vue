<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-center">
      <div class="bg-surface-card dark:bg-dark-card rounded-[2rem] p-10 md:p-16 shadow-soft border border-gray-100 dark:border-dark-border w-full max-w-2xl text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold text-text-primary dark:text-text-primary mb-6 tracking-tight">Hubungi Kami</h1>
        <p class="text-lg text-text-secondary dark:text-gray-300 mb-10">Punya pertanyaan tentang gear, status pesanan, atau kolaborasi? Kami siap membantu petualangan Anda.</p>
        
        <form @submit.prevent="$router.push('/')" class="space-y-6 text-left">
          <div>
            <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-2">Nama Lengkap</label>
            <input type="text" required class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          <div>
            <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-2">Email</label>
            <input type="email" required class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          <div>
            <label class="block text-sm font-bold text-text-primary dark:text-gray-300 mb-2">Pesan</label>
            <textarea required rows="6" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"></textarea>
          </div>
          <button type="submit" class="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-hover hover:-translate-y-1 text-lg mt-2">
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
