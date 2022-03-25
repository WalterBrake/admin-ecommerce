<template lang="pug">
  .container-login
    .form-container

      p.my-4.is-size-4.has-text-centered Iniciar sesión
      b-field(
        label="Correo", v-if="$v.formLogin.email"
        :type="$v.formLogin.email.$error ? 'is-danger' : ''",
        :message="$v.formLogin.email.$error ? 'Obligatorio' : ''"
      )
        b-input(v-model="formLogin.email")

      b-field(label="Contraseña", v-if="$v.formLogin.password"
        :type="$v.formLogin.password.$error ? 'is-danger' : ''",
        :message="$v.formLogin.password.$error ? 'Obligatorio' : ''")
        b-input(type='password'   password-reveal='' v-model="formLogin.password")

      div( class="  text-left   mt-10")
        NuxtLink(to="/restablecer-contrasena").mr-6
          span ¿Perdiste tu contraseña?
        NuxtLink(to="/registro")
          span ¿Aún no tienes cuenta?
          span.text-azul.ml-3 Regístrate
    .has-text-centered.my-6
      b-button(
        type="is-primary is-small",
        v-on:click="loginUser()"
        ) Iniciar sesión 

   
              
</template>

<script>

import { validationMixin } from 'vuelidate'
import {
  required,
  email
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    formLogin: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  data() {
    return {
      formLogin: {
        email: undefined,
        password: undefined
      },
    }
  },
  methods: {

    async loginUser(e) {
      try {
        this.blockForm = true
        this.$v.formLogin.$reset()
        this.$v.formLogin.$touch()
        if (this.$v.formLogin.$anyError) {
          this.$buefy.toast.open({
            duration: 5000,
            message: "Por favor, llene los campos correctamente",
            position: "is-top",
            type: "is-primary",
          });
          this.blockForm = false
          return
        }

        this.$store
          .dispatch(`auth/LOGIN`, {
            email: this.formLogin.email,
            password: this.formLogin.password
          })
          .then((response) => {
            console.log('success login')

            this.$router.push('/')
          })
          .catch((reason) => {
            console.log(reason)
            this.$buefy.toast.open({
              duration: 5000,
              message: "Verifica lso datos",
              position: "is-top",
              type: "is-primary",
            });
          })
          .finally(() => {
            console.log('dessable to false')
            this.blockForm = false
          })


      } catch (error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Verifica los datos introducidos",
          position: "is-top",
          type: "is-primary",
        });
      }
    }

  }
}
</script>

