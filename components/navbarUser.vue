<template>
    <div class="navbar" align="center">
        <nuxt-link to="/me">Profilo</nuxt-link> |
        <nuxt-link to="/me/events">I Miei Eventi</nuxt-link> |
        <nuxt-link to="/me/groups">I Mie Gruppi</nuxt-link> |
        <nuxt-link to="/me/category">Le Mie Categorie</nuxt-link> |
        <nuxt-link to="/me/locations">Le Mie Location</nuxt-link> |
        <nuxt-link to="/events">Eventi</nuxt-link> |
        <nuxt-link to="/groups">Tutti i gruppi</nuxt-link> |
        <nuxt-link to="/users">Tutti gli utenti</nuxt-link> |
        <nuxt-link to="/categories">Tutte le categorie</nuxt-link> |
        <nuxt-link to="/locations">Tutte le locations</nuxt-link> |
        <button @click="Logout()" align="right">Logout</button>
    </div>
</template>
<script>
export default {
    methods:{
        Logout(){
            this.$cookies.remove("user")
            this.$cookies.remove("auth")
            this.$router.push("/login")
        }
    }
}
</script>
<style>
.navbar{
    background-color:red;
    padding:20px;
    height:70px;
    font-size:17px;
}
a{
    color:white;
    text-decoration: none
}
</style>
