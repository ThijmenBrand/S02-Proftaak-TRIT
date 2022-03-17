<template>
  <h1 class="page-title">All tribes</h1>
  <div class="content-container">
    <div class="tribes-links-container">
      <Loader v-if="loading" />
      <h3 v-else v-for="(tribe, index) in tribesList" :key="index">
        <router-link
          :to="{
            name: 'tribe',
            params: { tribe: tribe.id },
          }"
          class="tribe-link"
        >
          {{ tribe.name }}
        </router-link>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { TribeShape } from "@/models/Tribe";

import Loader from "@/components/loader/Loader.vue";
export default {
  name: "Tribes",
  components: { Loader },
  setup() {
    const store = useStore();

    const loading = computed(() => store.getters["isLoading"]);

    onMounted(() => {
      store.dispatch("tribes/getAllTribes");
    });

    const tribesList = computed((): TribeShape[] => {
      const list = store.getters["tribes/getAllTribesList"];
      console.log(list);
      return list;
    });

    return { tribesList, loading };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

h3 {
  color: $trit-white;
}

.tribe-link {
  color: $trit-white;
  text-decoration: none;
  padding: 20px;
  margin: 10px;
  transition: 500ms;
}

.tribe-link:hover {
  color: $trit-yellow;
  text-decoration: underline;
}

.tribes-links-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
