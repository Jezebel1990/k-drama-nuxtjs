<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      :style="{ color: star <= normalizedRating ? '#FFD700' : '#8F8F8F' }"
      class="text-2xl"
    >
      ★
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  vote_average: {
    type: Number,
    required: true,
  },
});

// Converte a nota de 10 para 5 estrelas 
const normalizedRating = computed(() => Math.round((props.vote_average / 10) * 5));
</script>

<style>
.star-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
