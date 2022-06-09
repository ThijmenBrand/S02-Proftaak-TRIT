<template>
  <div class="content-container">
    <h1>{{ $t("tribes-overview-page.header") }}</h1>
  </div>
  <div class="background-container">
    <div class="content-container">
      <div class="tribes-links-container">
        <div class="tribes-links-flexbox">
          <Loader v-if="loading" />
          <TribeCard
            v-else
            v-for="(tribe, index) in tribesList"
            :key="index"
            :name="tribe.displayName"
            :id="tribe.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import TribeCard from "@/components/TribeCard/TribeCard.vue";

import { TribeShape } from "@/models/Tribe";

import Loader from "@/components/loader/Loader.vue";
import Tribe from "@/services/callFunctions/tribe";
export default {
  name: "Tribes",
  components: { Loader, TribeCard },
  setup() {
    const store = useStore();
    const loading = ref(true);
    
    onMounted(async () => {
      document.title = "Tribes";
      await store.dispatch("tribes/getAllTribes");
      loading.value = false;
    });

    const tribesList = computed((): TribeShape[] => {
      const list = store.getters["tribes/getAllTribesList"];
      return list;
    });

    return { tribesList, loading };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/tribes/Tribes.scss" />
