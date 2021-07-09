<template>
  <div class="layout-content">
    <div class="content-section implementation">
      <div class="card">
        <h5>Basic</h5>
        <AutoComplete
          v-model="selectedCountry1"
          :suggestions="filteredCountries"
          @complete="searchCountry($event)"
          field="name"
        />

        <h5>Grouped</h5>
        <AutoComplete
          v-model="selectedCity"
          :suggestions="filteredCities"
          @complete="searchCity($event)"
          field="label"
          optionGroupLabel="label"
          optionGroupChildren="items"
        >
          <template #optiongroup="slotProps">
            <div class="p-d-flex p-ai-center country-item">
              <img
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                width="18"
              />
              <div>{{ slotProps.item.label }}</div>
            </div>
          </template>
        </AutoComplete>

        <h5>Dropdown, Templating and Force Selection</h5>
        <AutoComplete
          v-model="selectedCountry2"
          :suggestions="filteredCountries"
          @complete="searchCountry($event)"
          :dropdown="true"
          field="name"
          forceSelection
        >
          <template #item="slotProps">
            <div class="country-item">
              <img
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              />
              <div>{{ slotProps.item.name }}</div>
            </div>
          </template>
        </AutoComplete>

        <h5>Multiple</h5>
        <span class="p-fluid">
          <AutoComplete
            :multiple="true"
            v-model="selectedCountries"
            :suggestions="filteredCountries"
            @complete="searchCountry($event)"
            field="name"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import data from '../../public/data/countries.json'
import { FilterService, FilterMatchMode } from 'primevue/api'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
  setup() {
    const refData = reactive({
      countries: null,
      selectedCountry1: null,
      selectedCountry2: null,
      selectedCity: null,
      filteredCities: null,
      filteredCountries: null,
      selectedCountries: [],
      groupedCities: [
        {
          label: 'Germany',
          code: 'DE',
          items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' }
          ]
        },
        {
          label: 'USA',
          code: 'US',
          items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' }
          ]
        },
        {
          label: 'Japan',
          code: 'JP',
          items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
          ]
        }
      ]
    })

    function searchCountry(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          refData.filteredCountries = [...refData.countries]
        } else {
          refData.filteredCountries = refData.countries.filter((country) => {
            return country.name
              .toLowerCase()
              .startsWith(event.query.toLowerCase())
          })
        }
      }, 250)
    }

    function searchCity(event) {
      let query = event.query
      let filteredCities = []

      for (let country of refData.groupedCities) {
        let filteredItems = FilterService.filter(
          country.items,
          ['label'],
          query,
          FilterMatchMode.CONTAINS
        )
        if (filteredItems && filteredItems.length) {
          filteredCities.push({ ...country, ...{ items: filteredItems } })
        }
      }

      refData.filteredCities = filteredCities
    }

    onMounted(() => {
      refData.countries = data.data
    })

    return {
      ...toRefs(refData),
      searchCountry,
      searchCity
    }
  }
})
</script>

<style>
img {
  width: 18px;
  margin-right: 0.5rem;
}
</style>