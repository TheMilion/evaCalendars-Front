<template>
  <div class="" >
    <div v-if="user.id_role == 3 || user.id_role == 4">
        <button @click="createLocation()">Crea Location</button>
    </div>
    <div class="content-user">
        <span v-if="locations">
            Locations: <br>
            <div v-for="(location,i) in locations" :key="i">
            {{location.id}} --{{location.nome}}<br>
            <button @click="deleteLocations(location.id)">Elimina Location</button>
            </div>
        </span>
        <span v-else>
            <span>Nessuna Locations Trovata</span>
        </span>
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
        locations: {},
        locationsForm: {
          nome : "stanza4",
          indirizzo : "Via Luca Giordano 80144 Napoli Italia",
          contatti : "Giuseppe : 3202423121"
        },
    }
  },
  methods:{
    deleteLocations(id){
      this.$axios.delete('locations/'+id , {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.getLocations()
        })
      },
    createLocation(){
      this.$axios.post('locations', this.locationsForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
          console.log(data)
          this.getLocations()
      })
      .catch(e => {
          console.log(e)
      })
    },
    getLocations(){
      this.$axios.$get('locations', {
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
