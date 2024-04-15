import { getItemLocalStorage, setItemLocalStorage, removeEmptyStrings } from '@/helpers'
export default {
  state: {
    originalMovies: getItemLocalStorage('originalMovies') || [],
    filteredMovies: [],
  },
  getters: {
    originalMovies: (state) => state.originalMovies.filter((movie) => !!movie) || [],
    haveOriginalMovies: (state) =>
      !!state.originalMovies.filter((movie) => !!movie).length || false,
    singleMovie: (state) => (movieId) =>
      state.originalMovies?.find((movie) => movie.id == movieId) || null,
    filteredMovies: (state) => state.filteredMovies || []
  },
  mutations: {
    SET_ORIGINAL_MOVIES(state, movies) {
      setItemLocalStorage('originalMovies', movies)
      state.originalMovies = movies
    },
    SET_FILTERED_MOVIES(state, movies) {
      state.filteredMovies = movies
    },
    SET_MOVIE(state, movie) {
      state.originalMovies.unshift(movie)
      setItemLocalStorage('originalMovies', state.originalMovies)
    },
    UPDATE_MOVIE(state, { index, movieUpdated }) {
      state.originalMovies[index] = movieUpdated;
      setItemLocalStorage('originalMovies', state.originalMovies);
    }
  },
  actions: {
    getAllFilteredMovies({ state, commit }, filterData) {
      const originalMovies = state.originalMovies || []
      const filterDataNotNullable = removeEmptyStrings(filterData)
      if (!filterData || !Object.keys(filterDataNotNullable)?.length || !originalMovies?.length) {
        return commit(
          'SET_FILTERED_MOVIES',
          originalMovies.filter((movie) => !!movie)
        )
      }

      let filteredMovies = originalMovies.filter((movie) => {
        let matchMovie = true
        for (const key in filterDataNotNullable) {
          if (filterDataNotNullable.hasOwnProperty(key)) {
            if (movie[key] != filterDataNotNullable[key]) {
              matchMovie = false
              break
            }
          }
        }
        return matchMovie
      })
      return commit('SET_FILTERED_MOVIES', filteredMovies)
    },

    addMovie({ commit }, payload) {
      commit('SET_MOVIE', payload);
      return true;
    },

    editMovie({ state, commit }, payload) {
      const foundedIndex = state.originalMovies.findIndex(
        (movieItem) => movieItem.id === payload.id
      )
      if (foundedIndex === -1) {
        return false
      } else {
        commit('UPDATE_MOVIE', { index: foundedIndex, movieUpdated: payload })
        return true
      }
    }
  }
}
