<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import { cva, type VariantProps } from 'class-variance-authority'

const list = cva('list', {
  variants: {
    intent: {
      primary: 'bg-white border border-gray-400',
    },
    size: {
      sm: 'px-2 py-1 rounded text-xs',
      md: 'p-2 rounded text-sm',
      lg: 'px-6 py-3 rounded text-md',
    },
  },
})

const item = cva('item', {
  variants: {
    intent: {
      primary: 'hover:bg-gray-100',
    },
    size: {
      sm: 'px-2 py-1 rounded text-xs',
      md: 'px-4 py-2 rounded text-sm',
      lg: 'px-6 py-3 rounded text-md',
    },
  },
})

type ListProps = VariantProps<typeof list>

const { locale } = useI18n()

export interface InputPlaceAutocompleteValue {
  features: {
    properties: {
      country_code?: string
      housenumber?: string
      street?: string
      country?: string
      county?: string
      datasource?: {
        sourcename?: string
        attribution?: string
        license?: string
      }
      postcode?: string
      state?: string
      state_code?: string
      district?: string
      city?: string
      county_code?: string
      lon?: number
      lat?: number
      result_type?: string
      department_COG?: string
      formatted?: string
      address_line1?: string
      address_line2?: string
      timezone?: {
        name?: string
        offset_STD?: string
        offset_STD_seconds?: number
        offset_DST?: string
        offset_DST_seconds?: number
        abbreviation_STD?: string
        abbreviation_DST?: string
      }
      plus_code?: string
      plus_code_short?: string
      iso3166_2?: string
      iso3166_2_sublevel?: string
      rank?: {
        confidence?: number
        confidence_city_level?: number
        confidence_street_level?: number
        confidence_building_level?: number
      }
      match_type?: string
      place_id?: string
    }
  }[]
}

const props = withDefaults(
  defineProps<{
    id?: string
    label?: string
    placeholder?: string
    modelValue?: InputPlaceAutocompleteValue['features'][0] | null
    minLengthAutocomplete?: number
    intent?: ListProps['intent']
    size?: ListProps['size']
    map?: boolean
    class?: string
  }>(),
  {
    id: '',
    label: 'address',
    placeholder: 'addressPlaceholder',
    modelValue: null,
    minLengthAutocomplete: 3,
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
)

const runtime = useRuntimeConfig()
const geoapifyApiKey = runtime.public.GEOAPIFY_API_KEY
const geoapifyAutocompleteBaseUrl = 'https://api.geoapify.com/v1/geocode/autocomplete'

const query = ref(props.modelValue?.properties.formatted || '')
const debouncedQuery = useDebounce(query, 500)

const selectedPlace = ref<InputPlaceAutocompleteValue['features'][0] | null>(props.modelValue || null)

const inputRef = ref()
const hoveringList = ref(false)

const { data, status, clear } = await useAsyncData<InputPlaceAutocompleteValue | null>(
  'places',
  async () => {
    if (query.value.length < props.minLengthAutocomplete) {
      return null
    }

    return $fetch(`${geoapifyAutocompleteBaseUrl}`, {
      params: {
        apiKey: geoapifyApiKey,
        lang: locale.value,
        type: 'amenity',
        text: query.value,
      },
    })
  },
  {
    watch: [debouncedQuery],
  },
)

const handleSelect = (place: InputPlaceAutocompleteValue['features'][0]) => {
  selectedPlace.value = place
  query.value = place.properties.formatted || ''
  clear()
  hoveringList.value = false
}

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  async (newValue) => {
    if (JSON.stringify(newValue) === JSON.stringify(selectedPlace.value)) return

    if (!query.value) {
      query.value = newValue?.properties.formatted || ''
      selectedPlace.value = newValue

      if (!newValue?.properties.place_id) {
        if (!query.value || query.value.length < props.minLengthAutocomplete) return

        const places = await $fetch<InputPlaceAutocompleteValue>(`${geoapifyAutocompleteBaseUrl}`, {
          params: {
            apiKey: geoapifyApiKey,
            lang: locale.value,
            type: 'amenity',
            text: query.value,
          },
        })

        const exact = places.features.find((feature) => feature.properties.formatted === newValue?.properties.formatted)
        if (exact) {
          selectedPlace.value = exact
        }
      }
    }
  },
  { immediate: true },
)

watch(selectedPlace, () => {
  emit('update:modelValue', selectedPlace.value)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <UiMap
      :center="
        selectedPlace?.properties.lon && selectedPlace?.properties.lat ? { lng: selectedPlace?.properties.lon, lat: selectedPlace?.properties.lat } : undefined
      "
      :marker="
        selectedPlace?.properties.lon && selectedPlace?.properties.lat ? { lng: selectedPlace?.properties.lon, lat: selectedPlace?.properties.lat } : undefined
      "
      :popup="!!selectedPlace"
      :popup-text="selectedPlace?.properties.formatted"
      class="mt-4 mb-2"
    />
    <div class="relative">
      <UiInput
        v-bind="$attrs"
        :id="props.id"
        ref="inputRef"
        v-model="query"
        type="text"
        :label="$te(props.label) ? $t(props.label) : props.label"
        :placeholder="$te(props.placeholder) ? $t(props.placeholder) : props.placeholder"
        class="mb-1"
      />
      <template v-if="(inputRef?.focused || hoveringList) && !(query.length < props.minLengthAutocomplete)">
        <div ref="listRef" class="absolute w-full" @mouseenter="hoveringList = true" @mouseleave="hoveringList = false">
          <ul
            v-if="data?.features && data.features.length > 0"
            class="absolute w-full"
            :class="
              list({
                intent,
                size,
              })
            "
          >
            <li
              v-for="place in data.features"
              :key="`${place.properties.lat}-${place.properties.lon}`"
              class="cursor-pointer"
              :class="
                item({
                  intent,
                  size,
                })
              "
              @click="((inputRef.focused = true), handleSelect(place))"
            >
              {{ place.properties.formatted }}
            </li>
          </ul>
          <span
            v-else-if="status === 'pending'"
            class="absolute w-full"
            :class="
              list({
                intent,
                size,
              })
            "
          >
            {{ $t('loading') }}...
          </span>
          <span
            v-else
            class="absolute w-full"
            :class="
              list({
                intent,
                size,
              })
            "
          >
            {{ $t('noResult') }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
