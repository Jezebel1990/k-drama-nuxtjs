<template>
  <div class="background-container text-center min-h-screen">
    <Navigation />

    <div v-if="response" class="content-container">
      <div class="flex justify-center font-sans">
        <Card class="w-full p-6 card-background">
          <template #content>
            <h1 class="font-bold mb-4 text-2xl">{{ response.name }}</h1>
            <div class="flex justify-center">
              <img
                :src="imageUrl"
                :alt="response.name"
                class="rounded-lg shadow-md"
              />
            </div>

            <div class="mt-6">
              <span class="block">
                <h3 class="font-semibold">País de Origem:</h3>
                {{ getCountrieName(response.origin_country?.[0]) }}
              </span>
            </div>

            <div class="mt-6">
              <span class="block">
                <h3 class="font-semibold">Data de Lançamento:</h3>
                {{ formatarData(response.first_air_date) }}
              </span>
            </div>

            <div class="mt-6">
              <h3 class="font-semibold">Avaliação:</h3>
              <div class="flex items-center mt-1 space-x-2">
                <span class="font-medium">{{ response.vote_average }}/10</span>
                <StarRating :vote_average="response.vote_average" class="mr-2" />
                <span>({{ response.vote_count }})</span>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="font-semibold">Descrição:</h3>
              <div class="max-w-[500px] mx-auto break-words">
                {{ response.overview || "Nenhuma descrição disponível." }}
              </div>
            </div>

            <div class="mt-10">
              <h3 class="font-semibold mb-2">Trailer Oficial</h3>
              <iframe
                v-if="trailerUrl"
                class="w-[500px] h-[360px]"
                :src="trailerUrl"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <p v-else>Trailer não disponível.</p>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div v-else>
      <h1>Carregando...</h1>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#imports";
import countries from "i18n-iso-countries";
import ptLocale from "i18n-iso-countries/langs/pt.json";
import StarRating from "@/components/StarRating.vue";

countries.registerLocale(ptLocale);

const config = useRuntimeConfig();
const API_TOKEN = config.public.API_TOKEN;

const route = useRoute();
const response = ref(null);
const trailerUrl = ref(null);

const getCountrieName = (sigla) => {
  return sigla ? countries.getName(sigla, "pt") || sigla : "Desconhecido";
};

const formatarData = (data) => {
  if (!data) return "Data não disponível";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const getDramaDetails = async () => {
  try {
    const dramaResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${route.params.id}?language=pt-BR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const data = await dramaResponse.json();
    response.value = data;

    // Busca o trailer no YouTube
    const trailerResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${route.params.id}/videos?language=pt-BR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const trailerData = await trailerResponse.json();
    const trailer = trailerData.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}`;
    }
  } catch (error) {
    console.error("Erro ao buscar os detalhes do K-Drama:", error);
  }
};

onMounted(() => {
  getDramaDetails();
});

const imageUrl = computed(() => {
  return response.value?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${response.value.backdrop_path}`
    : response.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${response.value.poster_path}`
    : "/love-drama.png";
});
</script>

<style scoped>
.break-words {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.card-background {
  position: relative;
  overflow: hidden;
}

.card-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/kdrama.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: 0;
}

.card-background > * {
  position: relative;
  z-index: 10;
}
</style>
