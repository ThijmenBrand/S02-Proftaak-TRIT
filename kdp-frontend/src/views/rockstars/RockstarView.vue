<template>
  <div class="rockstar-pane">
    <div class="rockstar-card">
      <div class="col-image">IMAGE</div>
      <div class="col-information">
        <div class="row-name">{{rockstar.name}}</div>
        <div class="row-description">{{rockstar.description}}</div>
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
@import "@/styles/variables.scss";



.rockstar-pane {
  background-color: pink;
  width: 100vw;
  height: 12em;
}

.rockstar-card {
  display: flex; /* flex container */
  flex-direction: row;
  
  background-color: $trit-white;
  height: 100%;
  margin: 0 320px 0 320px;
}

.rockstar-card .col-image {
  aspect-ratio: 1/1;
  height: 12em;
  
  
  background-color: magenta;
}

.rockstar-card .col-information {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  
  background-color: blue;
  font-family: 'Roboto', sans-serif;
}

.rockstar-card .col-information .row-name {
  height: 33%;
  font-weight: bold;
  
  background-color: cadetblue;
}

.rockstar-card .col-information .row-description {
  height: 100%;
  background-color: lightskyblue;
}

@media only screen and (max-width: 600px) { /* for mobile screens <= 600px width */
  .rockstar-pane {
    height: 24em;
  }
  .rockstar-card {
    width: 100vw;
    margin: auto;
    flex-direction: column;
  }
  
  .rockstar-card .col-information {
    flex: 100%;
  }
  
  .rockstar-card .col-image {
    margin: 0 auto 0 auto;
  }
}

</style>