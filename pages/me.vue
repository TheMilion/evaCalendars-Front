<template>
<div class="container">
  <nuxt-child />
</div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'userLayout',
  mounted(){
    if(Object.keys(this.$store.getters['auth/getAuth']).length == 0)this.$router.push("/login")
  }
}
</script>

<style scoped>
.container {
  height: calc((100vh) - 70px);
  background-color:grey;
}
</style>
