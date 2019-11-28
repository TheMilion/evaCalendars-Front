
<template>
  <div class="" >
    <div v-if="user.id_role == 3 || user.id_role == 4">
      <button @click="createGroup()">CREA Gruppo</button>
    </div>
      <div class="content-user">
        <span v-if="groups.length != 0">
            <div v-for="(group,i) in groups" :key="i">
              {{group.id}}
              {{group.nome}}
              <button @click="groupDetails(group.id)" align="right">Mosta Dettagli Gruppo</button>
              <button @click="deleteGroup(group.id)">Elimina Gruppo</button>
            </div>
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
    else this.getGroups()
  },

  data(){
    return {
        groups: {},
        GroupForm: {
          nome : "Amministrazione",
        },
    }
  },
  methods:{
    createGroup(){
        this.$axios.post('groups', this.GroupForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.getGroups()
        })
    },
    deleteGroup(id){
      this.$axios.delete('groups/'+id , {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.getGroups()
        })
    },
    groupDetails(id){
        this.$router.push('/groups/'+id)
      },
    getGroups(){
      this.$axios.$get('groups', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.groups = data
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
