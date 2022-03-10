<template>
  <h1 class="page-title">All tribes</h1>
  <div class="content-container">
    <div class="tribes-links-container">
      <h3 v-for="(tribe, index) in tribesList" :key="index">
        <router-link
          :to="{ name: 'tribe', params: { tribe: tribe.tribeName } }"
          class="tribe-link"
        >
          {{ tribe.tribeName }}
        </router-link>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { TribeShape } from "@/models/Tribe";
export default {
  name: "Tribes",
  setup() {
    const store = useStore();

    const tribesList = computed((): TribeShape => {
      return store.getters["tribes/getAllTribesList"];
    });

    return { tribesList };
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";

h3 {
  color: white;
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
