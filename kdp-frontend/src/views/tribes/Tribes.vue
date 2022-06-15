<template>
  <div class="content-container">
    <h1>{{ $t("tribes-overview-page.header") }}</h1>
  </div>
  <div class="background-container">
    <div class="content-container">
      <div class="tribes-links-container">
        <div class="tribes-links-flexbox">
          <div class="loader-container" v-if="loading">
            <Loader />
          </div>
          <TribeCard
            v-else
            v-for="(tribe, index) in tribesList"
            :key="index"
            :name="tribe.displayName"
            :id="tribe.id"
          />
          <!--
           The 'flexbox-fix' divs are invisible and act as padding for
           the flexbox to align the last row to the left. Do not delete.
          -->
          <div class="flexbox-fix empty-card" />
          <div class="flexbox-fix empty-card" />
          <div class="flexbox-fix empty-card" />
          <div class="flexbox-fix empty-card" />
          <div class="flexbox-fix empty-card" />
          <!-- END FIX -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import TribeCard from "@/components/TribeCard/TribeCard.vue";
import { TribeShape } from "@/models/Tribe";
import Loader from "@/components/loader/Loader.vue";

export default {
  name: "Tribes",
  components: { Loader, TribeCard },
  setup() {
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      document.title = "Loading...";
      await store.dispatch("tribes/getAllTribes");
      loading.value = false;
      document.title = "Tribes";
    });

    const tribesList = computed((): TribeShape[] => {
      return store.getters["tribes/getAllTribesList"];
    });

    return { tribesList, loading };
  },
};
</script>

<style scoped lang="scss" src="@/styles/pageStyles/tribes/Tribes.scss" />
