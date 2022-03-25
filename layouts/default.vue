<template lang="pug">
  div
    b-navbar
      template(#brand='')
        b-navbar-item(tag='router-link', :to="{ path: '/' }")
          img(src='https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png', alt='Lightweight UI components for Vue.js based on Bulma')
      template(#start='')
        b-navbar-item(href='/')
          | Home
       
      template(#end='')
        div.px-6.py-3
          p(v-if="$store.state").py-3 Bienvenido {{$store.state.auth.name}}
          b-button(
            type="is-primary is-small",
            @click="logOut()"
          ) Cerrar sesión
    section.main-content
      .container
        nuxt

</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    logOut() {
      this.$store
        .dispatch('auth/LOGOUT')
        .then((response) => {
          this.$router.push('/login')
          // this.$router.push('/')
        })
        .catch((reason) => {
           this.$buefy.toast.open({
          duration: 5000,
          message: "aLGO HA SALIDO MAL",
          position: "is-top",
          type: "is-primary",
        });
        })
        .finally(() => {
          // console.log('dessable to false')
          this.blockForm = false
        })
    },
  },
}
</script>
