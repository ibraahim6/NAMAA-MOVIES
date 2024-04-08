<template>
  <v-container fluid class="w-100">
    <header>
      <div class="d-flex justify-space-between align-center">
        <router-link to="/">
          <img
            src="https://namaa-solutions.com/frontend/images/logo_en.png"
            style="max-width: 151px"
            class="img-responsive"
            alt="Namaa Solutions"
          />
        </router-link>
        <router-link to="/">
          <h3 class="text-h3 text-primary">Movies App</h3>
        </router-link>
      </div>
    </header>

    <router-view />
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
