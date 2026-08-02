<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useToast } from 'vue-toastification'
import { CheckCircle, ShieldCheck } from '@lucide/vue'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'bank_transfer'
})

const isSubmitting = ref(false)
const orderSuccess = ref(false)

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
}

const submitOrder = () => {
  if (cartStore.items.length === 0) {
    toast.error('Keranjang Anda kosong!')
    return
  }

  isSubmitting.value = true
  
  setTimeout(() => {
    isSubmitting.value = false
    orderSuccess.value = true
    cartStore.clearCart()
    toast.success('Pesanan berhasil dibuat!')
  }, 1500)
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-dark-bg min-h-screen py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div v-if="orderSuccess" class="bg-surface-card dark:bg-dark-card rounded-[2rem] p-16 text-center max-w-2xl mx-auto shadow-soft border border-gray-100 dark:border-dark-border" data-aos="zoom-in">
        <CheckCircle class="h-28 w-28 text-green-500 mx-auto mb-8" />
        <h2 class="text-4xl font-extrabold text-text-primary dark:text-text-primary mb-4 tracking-tight">Pesanan Dikonfirmasi!</h2>
        <p class="text-text-secondary dark:text-gray-400 mb-10 text-lg leading-relaxed">Terima kasih telah berbelanja di WildCamp. Nomor resi dan detail pesanan telah dikirim ke email Anda. Bersiaplah untuk petualangan berikutnya!</p>
        <button @click="router.push('/')" class="px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-full transition-all shadow-md hover:shadow-hover hover:-translate-y-1 text-lg">
          Kembali ke Beranda
        </button>
      </div>

      <div v-else>
        <h1 class="text-4xl font-extrabold text-text-primary dark:text-text-primary mb-10 tracking-tight">Checkout</h1>
        
        <div v-if="cartStore.items.length === 0" class="text-center py-16 bg-surface-card dark:bg-dark-card rounded-3xl shadow-soft">
          <p class="text-text-secondary dark:text-gray-400 mb-6 text-lg">Anda belum memiliki barang untuk checkout.</p>
          <button @click="router.push('/products')" class="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-light transition-colors">Mulai Belanja</button>
        </div>

        <form v-else @submit.prevent="submitOrder" class="flex flex-col lg:flex-row gap-10">
          
          <!-- Form -->
          <div class="lg:w-2/3 space-y-8">
            <!-- Billing Details -->
            <div class="bg-surface-card dark:bg-dark-card p-10 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border">
              <h3 class="text-2xl font-extrabold text-text-primary dark:text-text-primary mb-8 tracking-tight">Informasi Pengiriman</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-bold text-text-primary mb-2">Nama Depan</label>
                  <input v-model="form.firstName" required type="text" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
                <div>
                  <label class="block text-sm font-bold text-text-primary mb-2">Nama Belakang</label>
                  <input v-model="form.lastName" required type="text" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-text-primary mb-2">Email</label>
                  <input v-model="form.email" required type="email" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-text-primary mb-2">Nomor Telepon</label>
                  <input v-model="form.phone" required type="tel" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-text-primary mb-2">Alamat</label>
                  <textarea v-model="form.address" required rows="3" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-bold text-text-primary mb-2">Kota</label>
                  <input v-model="form.city" required type="text" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
                <div>
                  <label class="block text-sm font-bold text-text-primary mb-2">Kode Pos</label>
                  <input v-model="form.postalCode" required type="text" class="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-dark-border bg-surface-50 dark:bg-dark-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-surface-card dark:bg-dark-card p-10 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border">
              <h3 class="text-2xl font-extrabold text-text-primary dark:text-text-primary mb-8 tracking-tight">Metode Pembayaran</h3>
              
              <div class="space-y-4">
                <label class="flex items-center p-5 border border-gray-200 dark:border-dark-border rounded-2xl cursor-pointer hover:bg-surface-50 dark:hover:bg-dark-bg transition-colors">
                  <input type="radio" v-model="form.paymentMethod" value="bank_transfer" class="h-5 w-5 text-primary focus:ring-primary">
                  <span class="ml-4 font-bold text-text-primary">Transfer Bank (BCA, Mandiri, BNI)</span>
                </label>
                <label class="flex items-center p-5 border border-gray-200 dark:border-dark-border rounded-2xl cursor-pointer hover:bg-surface-50 dark:hover:bg-dark-bg transition-colors">
                  <input type="radio" v-model="form.paymentMethod" value="credit_card" class="h-5 w-5 text-primary focus:ring-primary">
                  <span class="ml-4 font-bold text-text-primary">Kartu Kredit / Debit</span>
                </label>
                <label class="flex items-center p-5 border border-gray-200 dark:border-dark-border rounded-2xl cursor-pointer hover:bg-surface-50 dark:hover:bg-dark-bg transition-colors">
                  <input type="radio" v-model="form.paymentMethod" value="ewallet" class="h-5 w-5 text-primary focus:ring-primary">
                  <span class="ml-4 font-bold text-text-primary">E-Wallet (GoPay, OVO, Dana)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="lg:w-1/3">
            <div class="bg-surface-card dark:bg-dark-card p-8 rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border sticky top-28">
              <h3 class="text-2xl font-extrabold text-text-primary dark:text-text-primary mb-6 pb-4 border-b border-gray-100 dark:border-dark-border tracking-tight">Ringkasan Pesanan</h3>
              
              <div class="space-y-5 mb-8 max-h-64 overflow-y-auto pr-2">
                <div v-for="item in cartStore.items" :key="item.product.id" class="flex justify-between items-center">
                  <div class="flex items-center">
                    <span class="text-text-secondary font-bold mr-3">{{ item.quantity }}x</span>
                    <span class="text-text-primary font-medium line-clamp-1 w-32">{{ item.product.name }}</span>
                  </div>
                  <span class="font-bold text-text-primary">{{ formatPrice((item.product.discount ? item.product.price * (1 - item.product.discount / 100) : item.product.price) * item.quantity) }}</span>
                </div>
              </div>

              <div class="space-y-4 mb-8 pt-6 border-t border-gray-100 dark:border-dark-border">
                <div class="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span class="font-bold text-text-primary">{{ formatPrice(cartStore.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-text-secondary">
                  <span>Pajak (11%)</span>
                  <span class="font-bold text-text-primary">{{ formatPrice(cartStore.tax) }}</span>
                </div>
                <div class="flex justify-between text-text-secondary">
                  <span>Pengiriman</span>
                  <span class="font-bold text-text-primary">{{ formatPrice(cartStore.shipping) }}</span>
                </div>
              </div>
              
              <div class="border-t border-gray-100 dark:border-dark-border pt-6 mb-8">
                <div class="flex justify-between items-center">
                  <span class="text-xl font-bold text-text-primary">Total</span>
                  <span class="text-3xl font-extrabold text-accent">{{ formatPrice(cartStore.total) }}</span>
                </div>
              </div>
              
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-full flex justify-center items-center transition-all shadow-md hover:shadow-hover hover:-translate-y-1 disabled:opacity-70 text-lg"
              >
                <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? 'Memproses...' : 'Pesan Sekarang' }}
              </button>

              <div class="mt-6 flex items-center justify-center text-sm text-text-secondary font-medium">
                <ShieldCheck class="h-4 w-4 mr-2 text-primary" /> Enkripsi Aman 256-bit
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
