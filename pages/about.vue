<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <div class="header">
      <Navigation />
    </div>

    <!-- Conteúdo principal -->
    <div class="max-w-5xl shadow-md m-auto min-h-screen pt-3">
    <div class="container mx-auto p-6 flex-grow">
      <div class="h-10 w-full font-sans bg-pink-500">
        <h1 class="text-2xl px-4 text-white font-bold text-center">SOBRE K-DRAMAS</h1>
      </div>
      <p class="text-lg leading-relaxed mt-4 px-6">
        K-Dramas, ou dramas coreanos, são séries de TV produzidas na Coreia do Sul. 
        Eles são conhecidos por suas histórias envolventes, personagens cativantes 
        e cinematografia impressionante.
      </p>

      <!-- Motivos para assistir -->
      <div class="mt-6">
        <div class="h-10 w-full bg-pink-500">
          <h2 class="text-xl px-4 text-white font-bold text-center">Por que assistir K-Dramas?</h2>
        </div>
        <ul class="list-disc ml-6 my-4 px-6">
          <li>Histórias emocionantes e bem produzidas 🎭</li>
          <li>Elenco talentoso e carismático 🌟</li>
          <li>Trilha sonora incrível 🎶</li>
          <li>Exploração da cultura e costumes coreanos 🇰🇷</li>
        </ul>
      </div>

      <!-- Gêneros Populares -->
      <div class="mt-6">
        <div class="h-10 w-full bg-pink-500">
          <h2 class="text-xl px-4 text-white font-bold text-center">Gêneros populares</h2>
        </div>
        <p class="my-4 px-6">Existem diversos gêneros, como:</p>
        <ul class="list-disc ml-6 my-4 px-6 ">
          <li>Romance 💕</li>
          <li>Fantasia ✨</li>
          <li>Comédia 😂</li>
          <li>Suspense 🔥</li>
        </ul>
      </div>

<!-- Top 3 Atores e Atrizes -->
<div class="mt-8 text-center">
  <div class="h-10 w-full bg-pink-500">
    <h2 class="text-xl px-4 text-white font-bold">Top 3 Atores & Atrizes</h2>
  </div>

  <!-- Layout Responsivo -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    <!-- Atrizes -->
    <div class="flex flex-col items-center">
      <h3 class="text-xl font-semibold mb-2">Atrizes</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <div v-for="actress in topActresses" :key="actress.name" class="text-center">
          <div class="image-container">
            <img :src="actress.image" :alt="actress.name" />
          </div>
          <p class="mt-2 font-medium">{{ actress.name }}</p>
        </div>
      </div>
    </div>

    <!-- Atores -->
    <div class="flex flex-col items-center">
      <h3 class="text-xl font-semibold mb-2">Atores</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <div v-for="actor in topActors" :key="actor.name" class="text-center">
          <div class="image-container">
            <img :src="actor.image" :alt="actor.name" />
          </div>
          <p class="mt-2 font-medium">{{ actor.name }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

        <!-- Top 3 Trilhas Sonoras -->
        <div class="mt-8">
          <div class="h-10 w-full bg-pink-500">
            <h2 class="text-xl px-4 text-white font-bold text-center">Top 3 Trilhas Sonoras</h2>
          </div>
          <ul class="list-disc my-4 mx-4">
            <li
              v-for="(song, index) in topSongs"
              :key="index"
              class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md my-4"
            >
              <span class="font-bold">{{ song.title }}</span>

    <!-- Controles de áudio -->
      <div class="flex items-center mt-2">
    <button @click="togglePlayback(index)"
    class="bg-pink-400 hover:bg-pink-600 text-white px-4 py-2 mb-4 rounded-lg mx-2 flex items-center">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlElEQVR4nO2UsQ2DMBBFERUlE7BExoBBYByvwQ5QBFEgMQcMkJSRXnSFiySWIVK+kki88st3T7J9lyQHPwHQATNQ7Dg78sgQy32RZwVOG4IXYnmo6ApUSoFxAxqlwOOAVCkwWiBTCoweyJUCY/prQa+8olb5yE71TW3QatWgXYAy1PwTgkW17Lo31vXw1Occyw++zx0N/SLHXfVH1AAAAABJRU5ErkJggg==" 
      alt="Play"
      class="w-5 h-5">
    {{ isPlaying[index] ? "Pause" : "" }}
  </button>

 
 <div :ref="el => setSliderRef(el, index)" class="w-80 mx-2 mb-8"></div>
              </div>

              <audio
                :ref="el => setAudioRef(el, index)"
                :src="song.url"
              ></audio>
            </li>
          </ul>
        </div>
      </div>
    </div>


    <!-- Footer fixo no final -->
    <Footer class="mt-auto" />
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { Howl } from "howler";

export default {

  data() {
    return {
      topActresses: [
        { name: "Son Ye-jin", image: "https://i.imgur.com/t26D306.jpeg" },
        { name: "Kim Ji-won", image: "https://i.imgur.com/0REeO5W.png" },
        { name: "Park Min-young", image: "https://i.imgur.com/GKiKD1B.png" },
      ],
      topActors: [
        { name: "Hyun Bin", image: "https://i.imgur.com/PTWSTog.png" },
        { name: "Lee Min-ho", image: "https://i.imgur.com/MJAjbkY.jpeg" },
        { name: "Kim Soo-hyun", image: "https://i.imgur.com/KJk9GBR.jpeg" },
      ],
      topSongs: [
        { title: "Stay With Me – Goblin", url: "/music/staywithme-goblin.mp3" },
        { title: "Start Over – Itaewon Class", url: "/music/startover-itaewon.mp3" },
        { title: "Sweet Night – Itaewon Class (V do BTS)", url: "/music/sweetnight-itaewon.mp3" }
      ],
       sounds: [], 
      isPlaying: {},
      volumeSliders: {}, 
    };
  },

  mounted() {
    this.topSongs.forEach((song, index) => {
      this.sounds[index] = new Howl({
        src: [song.url],
        volume: 1.0,
        html5: true,
      });

      this.isPlaying[index] = false;
    });
  },

 methods: {
    togglePlayback(index) {
      if (!this.sounds[index]) return;

      if (this.isPlaying[index]) {
        this.sounds[index].pause();
      } else {
        this.sounds[index].play();
      }

      this.isPlaying[index] = !this.isPlaying[index];
    },

    stop(index) {
      if (!this.sounds[index]) return;

      this.sounds[index].stop();
      this.isPlaying[index] = false;
    },

    setSliderRef(el, index) {
      if (el && !this.volumeSliders[index]) {
        const slider = noUiSlider.create(el, {
          start: [100],
          range: { min: 0, max: 100 },
          step: 1,
          connect: [true, false],
          pips: { mode: "positions", values: [0, 25, 50, 75, 100] }
        });

        slider.on("update", (values) => {
          if (this.sounds[index]) {
            this.sounds[index].volume(parseFloat(values[0]) / 100);
          }
        });

        this.volumeSliders[index] = slider;
      }
    }
  }
};
</script>


<style scoped>
.container {
  max-width: 800px;
}


.image-container {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #facc15; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1; 
  border-radius: 50%;
}
</style>
