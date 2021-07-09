import { boot } from 'quasar/wrappers'
import Tiptap from 'components/Tiptap.vue'

export default boot(({ app }) => {
  // app.use(PrimeVue, { ripple: true })
  app.component('Tiptap', Tiptap)
})
