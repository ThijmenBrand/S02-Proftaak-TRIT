<template>
  <div class="content-container">
    <h1>{{ $t("tribes-overview-page.header") }}</h1>
  </div>
  <div class="background-container">
    <div class="content-container">
      <div class="tribes-links-container">
        <div class="tribes-links-flexbox">
          <Loader v-if="loading" />
          <h3 v-else v-for="(tribe, index) in tribesList" :key="index">
            <router-link
              :to="{
                name: 'tribe',
                params: { tribe: tribe.id },
              }"
              class="tribe-link"
            >
              {{ tribe.displayName }}
            </router-link>
          </h3>
        </div>
      </div>
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

    onMounted(async () => {
      await store.dispatch("tribes/getAllTribes");
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

<style scoped lang="scss" src="@/styles/pageStyles/tribes/Tribes.scss" />
