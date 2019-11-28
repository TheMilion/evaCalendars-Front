<template>
  <div class="" >
    <div class="content-user">
    <div v-if="user.id_role == 3 || user.id_role == 4">PAGINA NON PER UN ADMIN</div>
    <div v-else>
        <span v-if="locations.length != 0">
            <pre>{{locations}}</pre>
        </span>
        <span v-else>
            <span>Nessuna locations Assegnata</span>
        </span>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed:{
    user(){
      return this.$store.getters['user/getUser']
    },
    auth(){
      return this.$store.getters['auth/getAuth']
    }
  },

  mounted(){
    if(Object.keys(this.$store.getters['auth/getAuth']).length == 0)this.$router.push("/login")
    else this.getLocations()
  },

  data(){
    return {
        locations: {}
    }
  },
  methods:{
    getLocations(){
      this.$axios.$get('me/locations', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.locations = data
      })
      .catch(e => {
      })
    }
  }
}
</script>

<style>
.content-user{
  padding:20px;
  margin: 0 auto;
  display: flex;
}
</style>
