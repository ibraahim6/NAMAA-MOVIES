/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import veeValidate from '@/plugins/veeValidate'
import globalComponents from '@/plugins/globalComponents'

export function registerPlugins(app) {
  app.use(router).use(store).use(vuetify).use(veeValidate).use(globalComponents)
}
