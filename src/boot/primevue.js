import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(PrimeVue, { ripple: true })
  app.component('AutoComplete', AutoComplete)
})
