<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <test />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import test from "@/components/test.vue"; // @ is an alias to /src

@Options({
  components: {
    test,
  },
})
export default class Home extends Vue {}
</script>
