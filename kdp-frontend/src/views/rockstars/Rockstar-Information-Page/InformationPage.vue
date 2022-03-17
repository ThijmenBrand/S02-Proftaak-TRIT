<template>
  <h1>{{ rockstar.id }}</h1>
  <h1>{{ rockstar.name }}</h1>
  <h1>{{ rockstar.description }}</h1>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { RockstarShape } from "@/models/Rockstar";
import { computed, onMounted, onUpdated } from "vue";
import rockstar from "@/views/rockstars/store/rockstars";

export default {
  setup(props: any) {
    const route = useRoute();
    const store = useStore();
    
    const id = route.params.rockstarId;
    const rockstar = computed( (): RockstarShape => {
      return store.getters['rockstars/getRockstar'];
    });
    
    onMounted(() => {
      store.dispatch('rockstars/getRockstar', route.params.rockstarId);
    });
    
    onUpdated( () => {
      document.title = rockstar.value.name;
    });
    
    // !! opzoeken: Composition API
    return {
      rockstar
    }
  },
  
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

</style>
