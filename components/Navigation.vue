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
                    <li>
                        <NuxtLink to="/" class="text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300">Home</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/" class="text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300">Sobre</NuxtLink>
                    </li>
                </ul>
            </div>

            <button @click="toggleMenu" class="md:hidden text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <!-- Menu Mobile -->
            <div v-if="isMenuOpen" class="absolute top-14 left-0 w-full bg-white shadow-md md:hidden">
                <ul class="flex flex-col items-center py-4">
                    <li class="py-2">
                        <NuxtLink to="/" class="text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300">Home</NuxtLink>
                    </li>
                    <li class="py-2">
                        <NuxtLink to="/" class="text-black hover:text-pink-500 active:text-pink-700 transition-colors duration-300">About</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
</script>
