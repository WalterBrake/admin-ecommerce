<template lang="pug">
  .container-login
        .form-container

            p.my-4.is-size-4.has-text-centered Registro
            b-field(
                label="Nombre", v-if="$v.formRegister.name"
                :type="$v.formRegister.name.$error ? 'is-danger' : ''",
                :message="$v.formRegister.name.$error ? 'Obligatorio' : ''"
            )
                b-input(v-model="formRegister.name")

            b-field(
                label="Correo", v-if="$v.formRegister.email"
                :type="$v.formRegister.email.$error ? 'is-danger' : ''",
                :message="$v.formRegister.email.$error ? 'Obligatorio' : ''"
            )
                b-input(v-model="formRegister.email")

            b-field(label="Contraseña", v-if="$v.formRegister.password"
                :type="$v.formRegister.password.$error ? 'is-danger' : ''",
                :message="$v.formRegister.password.$error ? 'Obligatorio' : ''")
                b-input(type='password'   password-reveal='' v-model="formRegister.password")

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
        formRegister: {
            name: {
                required
            },
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
            formRegister: {
                name: undefined,
                email: undefined,
                password: undefined
            },
        }
    },
    methods: {

        async loginUser(evt) {
            this.blockForm = true
            this.$v.formRegister.$reset()
            this.$v.formRegister.$touch()
            if (this.$v.formRegister.$anyError) {
                this.blockForm = false
                return
            }

            this.$store
                .dispatch(`auth/REGISTER`, this.formRegister)
                .then((response) => {
                    console.log("success register");
                    this.$router.push("/");
                })
                .catch((reason) => {
                    console.log(reason);
                    this.$buefy.toast.open({
                        duration: 5000,
                        message: "Por favor, llene los campos correctamente",
                        position: "is-top",
                        type: "is-primary",
                    });
                })
                .finally(() => {
                    console.log("dessable to false");
                    this.blockForm = false;
                });
        },

    }
}
</script>

