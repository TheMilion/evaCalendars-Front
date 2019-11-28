<template>
  <div class="" >
    <div class="content-user">
      <div v-if="user.id_role == 3 || user.id_role == 4">PAGINA NON PER UN ADMIN</div>
      <div v-else>
        <span v-if="groups.length != 0">
            <div v-for="(group,i) in groups" :key="i">
            {{group.id}}
            {{group.nome}}
            <button @click="groupDetails(group.id)" align="right">Mosta Dettagli Gruppo</button>
            </div>
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
    else this.getGroups()
  },

  data(){
    return {
        groups: {},
        
        errorGroups: ''
    }
  },
  methods:{
    groupDetails(id){
        this.$router.push('/groups/'+id)
      },
    getGroups(){
      this.$axios.$get('me/groups', {
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
