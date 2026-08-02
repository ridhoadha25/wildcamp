<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16 flex items-center justify-center">
    <div class="max-w-md w-full px-6">
      <div class="bg-surface-card dark:bg-dark-card rounded-[2rem] p-10 shadow-soft border border-gray-100 dark:border-dark-border text-center">
        <h1 class="text-3xl font-extrabold text-text-primary dark:text-text-primary mb-3 tracking-tight">Buat Akun</h1>
        <p class="text-text-secondary dark:text-gray-400 mb-8">Mulai petualangan Anda dengan WildCamp</p>
        
        <form @submit.prevent="$router.push('/login')" class="space-y-5">
          <div>
            <input type="text" placeholder="Nama Lengkap" required class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          <div>
            <input type="email" placeholder="Alamat Email" required class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          <div>
            <input type="password" placeholder="Kata Sandi" required class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
          </div>
          
          <button type="submit" class="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-hover hover:-translate-y-1 mt-6">
            Buat Akun
          </button>
        </form>
        
        <div class="mt-8 text-sm text-text-secondary dark:text-gray-400 font-medium">
          Sudah punya akun? <router-link to="/login" class="text-primary font-extrabold hover:text-primary-light transition-colors">Masuk di sini</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
