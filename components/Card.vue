<template>
  <div
    class="card rounded-md bg-white shadow-lg mx-2 my-4 w-48 flex flex-col max-w-fit overflow-hidden hover:bg-slate-200 transition duration-300"
  >
    <div class="image overflow-hidden flex items-center justify-center">
      <slot name="image"></slot>
    </div>

    <div class="content p-2 flex flex-col items-center justify-center flex-grow">
      <slot name="content"></slot>
    </div>

    <div class="vote_average p-2 flex items-center justify-center">
      <slot name="vote_average"></slot>  
    </div>

    <!-- Slot para exibição da data formatada -->
    <div v-if="$slots.first_air_date" class="first_air_date p-4 text-sm text-gray-600 text-center flex items-center gap-1">
      <strong>Estreia:</strong> <slot name="first_air_date"></slot>
    </div>
  </div>
</template>

