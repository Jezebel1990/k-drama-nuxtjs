<template>
  <div>
    <div class="header">
      <Navigation />
    </div>
    <div class="max-w-5xl shadow-md m-auto min-h-screen pt-3">
      <div class="px-2">
        <!-- Seção de Dramas Mais Populares -->
        <div class="topDrama">
          <div class="h-10 w-full font-sans bg-pink-500">
            <h1 class="text-2xl px-4 text-white font-bold">Mais Populares:</h1>
          </div>
          <div v-if="loadingPopular" class="text-center text-gray-500">Carregando...</div>
          <div v-else-if="errorPopular" class="text-center text-red-500">Erro ao carregar os dados.</div>
          <TopDrama v-else-if="popularDramas.length" :topDrama="popularDramas" />
        </div>

        <!-- Seção de Últimos Doramas -->
        <div>
          <div class="h-10 w-full bg-pink-500">
            <h1 class="text-2xl px-4 text-white font-bold">Últimos Doramas:</h1>
          </div>
          <div v-if="loadingLatest" class="text-center text-gray-500">Carregando...</div>
          <div v-else-if="errorLatest" class="text-center text-red-500">Erro ao carregar os dados.</div>
          <div class="popularityDrama flex flex-wrap justify-center">
            <template v-if="latestDramas.length">
              <Card
                v-for="drama in latestDramas"
                :key="drama.id"
                class="mx-auto"
                @click="goDrama(drama)"
              >
                <template #image>
                  <img
                    :src="getDramaImageSrc(drama.poster_path)"
                    height="266"
                    :alt="drama.name"
                    loading="lazy"
                    @error="setPlaceholderImage($event)"
                  />
                </template>
                <template #content>
                  <h2 class="font-bold">{{ drama.name || drama.title }}</h2>
                </template>
                <template #first_air_date>
                  <h3 class="font-normal">
                    {{ formatarData(drama.first_air_date) }}
                  </h3>
                </template>
                <template #vote_average>
                  <div class="flex items-center">
                    <span class="ml-2">{{ drama.vote_average }} /10</span>
                  </div>
                </template>
              </Card>
            </template>

            <!-- Componente de Paginação -->
            <Pagination
              v-if="!loadingLatest"
              :currentPage="currentPage"
              :totalPages="totalPages"
              @pageChanged="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watchEffect } from "vue";
import Pagination from "@/components/Pagination.vue";
import StarRating from "@/components/StarRating.vue"; // Componente de estrelas
import { useNuxtApp } from "#app";

// API Token
const { $config } = useNuxtApp();
const API_TOKEN = $config.public.API_TOKEN;

// Variáveis reativas
const popularDramas = ref([]);
const latestDramas = ref([]);
const loadingPopular = ref(true);
const loadingLatest = ref(true);
const errorPopular = ref(null);
const errorLatest = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);

// Função para formatar a data de lançamento
const formatarData = (data) => {
  if (!data) return "Data não disponível";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

// Fetch para os dramas populares
const fetchPopularDramas = async () => {
  loadingPopular.value = true;
  try {
    const response = await $fetch(
      "https://api.themoviedb.org/3/discover/tv?language=pt-BR&sort_by=popularity.desc&with_original_language=ko",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    popularDramas.value = response.results;
  } catch (error) {
    errorPopular.value = error;
  } finally {
    loadingPopular.value = false;
  }
};

// Fetch para os dramas mais recentes
const fetchLatestDramas = async (page = 1) => {
  loadingLatest.value = true;
  try {
    const response = await $fetch(
      `https://api.themoviedb.org/3/discover/tv?language=pt-BR&page=${page}&with_original_language=ko&sort_by=first_air_date.desc`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );
    latestDramas.value = response.results;
    totalPages.value = response.total_pages;
  } catch (error) {
    errorLatest.value = error;
  } finally {
    loadingLatest.value = false;
  }
};

// Executa as buscas ao carregar a página
onMounted(() => {
  fetchPopularDramas();
  fetchLatestDramas();
});

// Navegação para detalhes do drama
const router = useRouter();
const goDrama = (drama) => {
  router.push(`/drama/${drama.id}`);
};

// Paginação dos últimos doramas
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchLatestDramas(page);
};

// Função para gerar o src da imagem, com fallback
const getDramaImageSrc = (poster_path) => {
  return `https://image.tmdb.org/t/p/w500/${poster_path}`;
};

// Fallback para imagens quebradas
const setPlaceholderImage = (event) => {
  event.target.src = "/default.png"; 
};
</script>

<style lang="scss" scoped>
</style>
