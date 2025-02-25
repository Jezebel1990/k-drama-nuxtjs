<template>
  <div class="star-rating">
    <StarRatings
      :rating="normalizedRating"
      :max-rating="5"
      :star-size="20"
      :star-color="'#FFD700'"
      :inactive-color="'#D3D3D3'"
      :show-rating="false"
      class="custom-stars"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StarRatings from 'vue3-star-ratings';

const props = defineProps({
  vote_average: {
    type: Number,
    required: true,
  },
});

// Converte a nota de 10 para 5 estrelas corretamente
const normalizedRating = computed(() => (props.vote_average / 10) * 5);
</script>

<style>
.star-rating {
  display: flex;
  align-items: center;
}

/* Força a cor dourada nas estrelas ativas */
.custom-stars svg path {
  fill: #FFD700 !important;
}
</style>
