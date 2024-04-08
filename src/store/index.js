import { createStore } from 'vuex'
import movies from '@/store/modules/movies.js'
export default createStore({
  modules: {
    movies
  }
})
