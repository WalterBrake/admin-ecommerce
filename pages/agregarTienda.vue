<template lang="pug">
div( v-if="$v")
  h1.my-5.is-size-3 Creación de cliente
  b-field(
    label="Nombre", v-if="$v.name"
    :type="$v.name.$error ? 'is-danger' : ''",
    :message="$v.name.$error ? 'Obligatorio' : ''"
  )
    b-input(v-model="name")

  .container.mt-5
    .is-align-items-center.is-flex.is-justify-content-end
      b-button(
        type="is-primary is-small",
        @click="createClient()"
      ) Crear


</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  name: "form-element",

  data() {
    return {
      name: undefined,
    };
  },

  validations: {
    name: { required },
  },
  methods: {
    createClient: async function (newElement) {
      this.blockForm = true;
      this.$v.$reset();
      this.$v.$touch();
      if (this.$v.$anyError) {
        this.blockForm = false;

        this.$buefy.toast.open({
          duration: 5000,
          message: "Por favor, llene los campos correctamente",
          position: "is-top",
          type: "is-primary",
        });

        return;
      }

      const request = await this.$httpClient.post(
        "/api/shops",
        {
          name: this.name
        }
      );

      if (request.code == 1000) {
        this.$router.push(`/`);
      }
    },
  },
};
</script>
<style scoped>
</style>
