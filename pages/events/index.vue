<template>
  <div class="" >
    <div class="content-user">
    <div v-if="user.id_role == 3 || user.id_role == 4">
      <button @click="createAdminUserEvent()">CREA EVENTO a nome di: (Admin Route)</button>
      <button @click="createAdminPublicEvent()">CREA EVENTO Pubblico</button>
    </div>
      <div v-if="events">
        Events :  
        <div v-for="(event,i) in events" :key="i">
        {{event.id}}
        {{event.title}}
        <button @click="eventDetails(event.id)" align="right">Mosta Dettagli Evento</button>
        <div v-if="user.id_role == 3 || user.id_role == 4">
          <button @click="deleteEvent(event.id)">Elimina Evento</button>
        </div>
        </div>
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
    else this.getEvents()
  },

  data(){
    return {
        events: {},
        adminUserEventForm: {
          title : "Evento a nome di User",
          id_category : 1,
          id_location : 1,
          date_from : "2019-11-01",
          date_to : "2019-11-01",
          hour_from : "19:30",
          hour_to : "23:00",
          private : 1,
          user : {
            id_user : 2,
            nome: "user",
            cognome: "eva",
            email: "user@eva.it"
          }
        },
        adminPublicEventForm: {
          title : "Evento Pubblico",
          id_category : 1,
          id_location : 1,
          date_from : "2019-11-01",
          date_to : "2019-11-01",
          hour_from : "19:30",
          hour_to : "23:00",
          private : 0,
        },
    }
  },
  methods:{
    createAdminPublicEvent(){
      this.$axios.post('events', this.adminPublicEventForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
        console.log(data)
        this.getEvents()
      })
      .catch(e => {
          console.log(e)
      })
    },

    createAdminUserEvent(){
      this.$axios.post('events', this.adminUserEventForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
        console.log(data)
        this.getEvents()
      })
      .catch(e => {
          console.log(e)
      })
    },

    deleteEvent(id){
      this.$axios.$delete('events/'+id, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        console.log(data)
        this.getEvents()
      })
      .catch(e => {
        console.log(e)
      })
    },
    eventDetails(id){
        this.$router.push('/events/'+id)
      },
    getEvents(){
      this.$axios.$get('events', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.events = data
      })
      .catch(e => {
          console.log(e)
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
