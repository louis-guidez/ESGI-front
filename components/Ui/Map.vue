<script setup lang="ts">
import { MglMap, MglNavigationControl, MglMarker, MglPopup } from '@indoorequal/vue-maplibre-gl'

const props = withDefaults(
  defineProps<{
    interactive?: boolean
    navigationControl?: boolean
    mapStyle?: 'positron' | 'bright' | 'liberty'
    center?: { lng: number; lat: number }
    marker?: { lng: number; lat: number }
    popup?: boolean
    popupText?: string
    zoom?: number
  }>(),
  {
    interactive: false,
    navigationControl: true,
    mapStyle: 'bright',
    center: () => ({ lng: 2.3522, lat: 48.8566 }),
    marker: undefined,
    popupText: '',
    zoom: 10,
  },
)
</script>

<template>
  <div class="w-full aspect-16/9 rounded">
    <MglMap :map-style="`https://tiles.openfreemap.org/styles/${props.mapStyle}`" :center="props.center" :zoom="props.zoom">
      <MglNavigationControl v-if="props.navigationControl" />
      <MglMarker v-if="props.marker" :coordinates="props.marker">
        <MglPopup v-if="props.popup" :text="props.popupText" />
      </MglMarker>
    </MglMap>
  </div>
</template>

<style lang="css">
@import 'maplibre-gl/dist/maplibre-gl.css';
</style>
