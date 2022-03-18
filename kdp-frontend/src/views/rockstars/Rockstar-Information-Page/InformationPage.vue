<template>
  <RockstarView :rockstar="rockstar" />
  
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { RockstarShape } from "@/models/Rockstar";
import { computed, onMounted, onUpdated } from "vue";
import rockstar from "@/views/rockstars/store/rockstars";
import RockstarView from "@/views/rockstars/RockstarView.vue";

export default {
  components: { RockstarView },
  setup(props: any) {
    const route = useRoute();
    const store = useStore();
    
    const rockstar = computed( (): RockstarShape => {
      return store.getters['rockstars/getRockstar'];
    });
    
    // when loading the page, get the rockstar by id
    onMounted(() => {
      store.dispatch('rockstars/getRockstar', route.params.rockstarId);
    });
    
    // on every update, change the page title to the rockstar's name
    onUpdated( () => {
      document.title = rockstar.value.name;
    });
    
    return {
      rockstar
    }
  },
  
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

</style>
