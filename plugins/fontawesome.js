import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Adiciona os ícones à biblioteca do FontAwesome
library.add(faInstagram, faTwitter);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
