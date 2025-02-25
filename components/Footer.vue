<template>
  <footer class="bg-gray-800 text-white py-4 mt-8">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <div class="text-xl font-bold flex items-center">
        <NuxtLink to="/" class="font-sans text-pink-300 hover:text-pink-400 flex items-center">
          K-Drama

          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 ml-2 text-pink-300 hover:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21l-1-1-7-7C2.67 11.33 2 9.67 2 8c0-2.67 2.33-5 5-5 1.74 0 3.41.81 4 2.09C11.59 3.81 13.26 3 15 3c2.67 0 5 2.33 5 5 0 1.67-.67 3.33-2 4l-7 7-1 1z"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Links de navegação -->
      <nav class="space-x-4">
        <NuxtLink to="/" class="text-white hover:text-pink-400">Home</NuxtLink>
        <NuxtLink to="/about" class="text-white hover:text-pink-400">Sobre</NuxtLink>
      </nav>

      <!-- Redes sociais -->
      <div class="space-x-4">
     <a href="https://instagram.com" target="_blank" class="text-white hover:text-pink-400">
     <FontAwesomeIcon :icon="['fab', 'instagram']" class="text-xl" />
     </a>
        
        <a href="https://twitter.com" target="_blank" class="text-white hover:text-pink-400">
          <font-awesome-icon :icon="['fab', 'twitter']" class="text-xl" />
        </a>
      </div>
    </div>

    <!-- Direitos autorais -->
    <div class="text-center text-sm mt-4">
      <p>&copy; {{ currentYear }} K-Drama. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
</style>
