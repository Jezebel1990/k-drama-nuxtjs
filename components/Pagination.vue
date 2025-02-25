<template>
  <div class="pagination flex justify-center items-center mt-4 mb-6">
    <button
      class="px-3 py-1 bg-pink-500 font-sans text-white rounded"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Anterior
    </button>
    <span class="mx-4 font-sans">{{ currentPage }} de {{ totalPages }}</span>
    <button
      class="px-3 py-1 bg-pink-500 font-sans text-white rounded"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Próxima
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["pageChanged"]);

const changePage = (page) => {
  if (page > 0 && page <= props.totalPages) {
    emit("pageChanged", page);
  }
};
</script>

<style scoped>
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
