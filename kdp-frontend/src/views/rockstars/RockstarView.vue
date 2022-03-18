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
  props: {
    rockstar: Object as () => RockstarShape,
  },
  setup(props: any) {
    
    
    return {
      props,
    };
  },
  name: "RockstarView",
}
</script>

<style scoped lang="scss">
@import "../../styles/main.scss";
@import "../../styles/variables.scss";
@import "../../styles/fonts.css";

.rockstar-pane {
  width: 100vw;
  height: 12em;
}

.rockstar-card {
  display: flex; /* flex container */
  flex-direction: row;
  gap: 1em;
  
  height: 100%;
  width: 50%;
  max-width: fit-content;
  margin: 0 auto 0 auto;  
}

.rockstar-card .col-image {
  aspect-ratio: 1/1;
  height: 12em;
  
  background-color: $trit-white;
}

.rockstar-card .col-information {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: auto;
}

.rockstar-card .col-information .row-name {
  height: 33%;
  font-weight: bold;
  font-size: 2.5em;
}

.rockstar-card .col-information .row-description {
  height: 100%;
}

@media only screen and (max-width: 1000px) { /* for mobile screens <= 1000px width */
  .rockstar-pane {
    height: 24em;
  }
  .rockstar-card {
    width: 100vw;
    max-width: 100vw;
    margin: auto;
    flex-direction: column;
  }
  
  .rockstar-card .col-information {
    flex: 100%;
  }

  .rockstar-card .col-information .row-name {
    text-align: center;
  }

  .rockstar-card .col-information .row-description {
    margin-left: 1em;
  }
  
  .rockstar-card .col-image {
    margin: 0 auto 0 auto;
  }
}

</style>