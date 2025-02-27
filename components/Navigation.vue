<template>
  <div class="w-full shadow-xl">
    <div class="h-14 flex justify-between items-center px-6 max-w-screen-xl mx-auto">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/">
          <img src="/logo.png" alt="logo" class="h-12" />
        </NuxtLink>
      </div>

      <!-- Menu Desktop -->
      <div class="hidden md:flex font-sans text-black">
        <ul class="flex h-full items-center justify-center space-x-7">
          <li v-for="(item, index) in menuItems" :key="index">
            <NuxtLink 
              :to="item.path" 
              class="text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Menu Mobile -->
      <button
        @click="toggleMenu"
        class="md:hidden text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <!-- Menu Mobile -->
      <div
        v-if="isMenuOpen"
        class="fixed top-0 left-0 w-full h-[300px] bg-white shadow-md md:hidden flex flex-col items-center justify-center z-50"
      >
        <button @click="closeMenu" class="absolute top-4 right-6 text-black text-2xl font-bold">
          ✕
        </button>
        <ul class="flex flex-col items-center py-4 space-y-4 text-lg">
          <li v-for="(item, index) in menuItems" :key="index">
            <NuxtLink 
              :to="item.path" 
              @click="closeMenu"
              class="text-black hover:text-pink-500 transition-colors duration-300"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(route, () => {
  closeMenu();
});

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Sobre", path: "/about" },
];
</script>
