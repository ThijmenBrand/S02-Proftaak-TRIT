<template>
  <div class="btns-container">
    <div class="btn-container">
      <button
        class="Page-btn Page-btn-wide"
        :class="{
          'Page-btn-selected-wide': CurrentPage == 1,
          'Page-btn-wide': CurrentPage != 1,
        }"
        @click="setcurrentpage(CurrentPage - 1)"
      >
        <img src="@/assets/images/icon-fastforward.svg" id="prev-arrow" />
      </button>
    </div>

    <div class="btn-container" v-for="index in PageCount" :key="index">
      <button
        v-if="index != CurrentPage"
        class="Page-btn"
        @click="setcurrentpage(index)"
      >
        {{ index }}
      </button>
      <button v-else class="Page-btn Page-btn-selected">{{ index }}</button>
    </div>

    <div class="btn-container">
      <button
        class="Page-btn Page-btn-wide"
        :class="{
          'Page-btn-selected-wide': CurrentPage == PageCount,
          'Page-btn-wide': CurrentPage != PageCount,
        }"
        @click="setcurrentpage(CurrentPage + 1)"
      >
        <img src="@/assets/images/icon-fastforward.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "PageSelect",
  props: {
    PageCount: Number,
  },
  emits: ["current-page"],
  setup(props: any, { emit }: any) {
    const store = useStore();
    const CurrentPage = ref<number>(1);

    function setcurrentpage(page: number) {
      if (page > 0 && page <= props.PageCount) {
        CurrentPage.value = page;
        store.commit("SET_CURRENT_PAGE", page);
        emit("current-page", page);
      }
    }

    return { CurrentPage, setcurrentpage };
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/componentStyles/PageSelect/PageSelect.scss"
/>
