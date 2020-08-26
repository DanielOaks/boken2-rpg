<template>
  <div class="locationInfo">
    <div class="placeInfo">
      <div class="spacer"/>
      <span class="description" v-text="placeName"/>
    </div>
    <div class="regionName" v-text="regionName"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LocationInfo',
  props: {
    placeName: String,
    regionName: String,
  },
});
</script>

<style lang="scss">
.locationInfo {
  flex: auto;
  display: flex;
  flex-direction: column;

  > div {
    color: var(--sidebar-location-text-color);
    background: var(--sidebar-location-bg-color);
    border-radius: .4em;
    padding: .3em .5em;
  }
  .placeInfo {
    min-height: 6.5em;
    margin-bottom: .2em;
    display: flex;
    flex-direction: column;
    .spacer {
      height: 100%;
    }
  }
}
</style>