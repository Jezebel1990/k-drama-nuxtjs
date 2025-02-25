<template>
  <div>
    <div class="card-slider">
      <span v-for="(item, index) in onlyFirstFew" :key="index">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
          class="lable"
          :alt="item.name || 'Sem título'"
           loading="lazy"
          @click="goDramaPage(item)"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  topDrama: {
    type: Array,
    required: true,
  },
});

const { topDrama } = toRefs(props);

const onlyFirstFew = computed(() => {
  return topDrama.value ? topDrama.value.slice(0, 9) : [];
});

const goDramaPage = (drama) => {
  console.log("Ir para página do drama:", drama);
};
</script>

<style scoped>
.card-slider {
  margin: 60px auto;
  text-align: center;
}

.lable {
  position: relative;
  margin: 0 -35px;
  display: inline-block;
  width: 150px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 0 10px 6px -6px #777;
  -webkit-transform: skew(-20deg) rotate(-20deg);
  transform: skew(-20deg) rotate(-20deg);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.lable:hover {
  margin: 0 50px;
  -webkit-transform: none;
  transform: none;
}
</style>
