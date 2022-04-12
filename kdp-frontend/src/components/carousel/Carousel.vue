<template>
  <carousel
    v-if="spotifyLinks.length != 0"
    :items-to-show="1"
    class="carousel-wrapper"
  >
    <slide v-for="(item, index) in spotifyLinks" :key="index" class="carousel">
      <iframe
        :src="item.spotifyLink + '&theme=black'"
        scrolling="no"
        class="spotify-iframe"
        height="232"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
      ></iframe>
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted } from "vue";
import "@/styles/componentStyles/carousel/SpotifyCarousel.scss";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    spotifyLinks: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped/>
