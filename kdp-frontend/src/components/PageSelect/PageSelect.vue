<template>

    <div class="btns-container"> 

        <div class="btn-container">
            <button class="Page-btn Page-btn-wide Page-btn-selected" v-on:click="setcurrentpage(CurrentPage-1)">  
                <img src="@/assets/images/icon-fastforward.svg" id="prev-arrow"/>
            </button>
        </div>

        <div class="btn-container" v-for="index in PageCount" :key="index">
            <button v-if="index != CurrentPage" class="Page-btn" v-on:click="setcurrentpage(index)"> {{index}} </button>
            <button v-else class="Page-btn Page-btn-selected" > {{index}} </button>
        </div>

        <div class="btn-container">
            <button class="Page-btn Page-btn-wide Page-btn-selected" v-on:click="setcurrentpage(CurrentPage+1)"> 
                <img src="@/assets/images/icon-fastforward.svg"/> 
            </button>
        </div>


    </div>

    {{CurrentPage}}

</template>


<script lang="ts">
import { ref } from '@vue/reactivity';
import store from '@/store';

export default {
  name: "PageSelect",
  props: {
    PageCount: Number,
  },
  setup() {
      
    const CurrentPage = ref(1);
    
    function setcurrentpage(page: number) {
        store.commit('SET_CURRENT_PAGE', page);
        CurrentPage.value = page;
    }
  
    return{ CurrentPage, setcurrentpage }
    
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/styles/componentStyles/PageSelect/PageSelect.scss"
/>