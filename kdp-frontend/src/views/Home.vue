<template>
  <div class="background-container">
    <div class="content-container">
      <div class="interesting-tribes">
        <h5>Interessante tribes</h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  name: "home",
  setup() {
    const store = useStore();

    const highlightedTribes = computed(
      () => store.getters["tribes/getTribesForHome"]
    );

    onMounted(() => {
      store.dispatch("tribes/")
    })
  },
};
</script>

<style scoped lang="scss">
h5 {
  color: white;
}
</style>
