<template>
  <div class="rockstar-pane">
    <div class="rockstar-card">
      <div class="col-image">
        <svg width="12em" height="12em" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="12em" height="12em" style="fill:#dedede;stroke:#555555;stroke-width:2"/><text x="50%" y="50%" font-size="18" text-anchor="middle" alignment-baseline="middle" font-family="DIN2014-Regular, sans-serif" fill="#555555">placeholder</text></svg>
      </div>
      <div class="col-information">
        <div class="row-name"><a class="DIN2014-Bold">{{rockstar.name}}</a></div>
        <div class="row-description"><a class="DIN2014-Regular">{{rockstar.description}}</a></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {RockstarShape} from "@/models/Rockstar";

export default {
  name: "RockstarView",
  props: {
    rockstar: Object as () => RockstarShape,
  },
}
</script>

<style scoped lang="scss">
  @import "@/styles/main.scss";
  @import "@/styles/variables.scss";
  @import "../../styles/fonts.css"; /* bij het geven van een @/ krijg ik een compiler error */
  @import "@/styles/RockstarInformationPage/RockstarView.scss";
</style>