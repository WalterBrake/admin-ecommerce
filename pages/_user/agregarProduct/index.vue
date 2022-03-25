<template lang="pug">
div( v-if="$v")
  h1.my-5.is-size-3 Creación de cliente
  b-field(
    label="Nombre", v-if="$v.name"
    :type="$v.name.$error ? 'is-danger' : ''",
    :message="$v.name.$error ? 'Obligatorio' : ''"
  )
    b-input(v-model="name")

  b-field(
    label="Costo", v-if="$v.cost"
    :type="$v.cost.$error ? 'is-danger' : ''",
    :message="$v.cost.$error ? 'Obligatorio' : ''"
  )
    b-input(v-model="cost")

  b-field(
    label="STOCK", v-if="$v.stock"
    type="number"
    :type="$v.stock.$error ? 'is-danger' : ''",
    :message="$v.stock.$error ? 'Obligatorio' : ''"
  )
    b-input(v-model="stock")

  .container.mt-5
    .is-align-items-center.is-flex.is-justify-content-end
      b-button(
        type="is-primary is-small",
        @click="createClient()"
      ) Crear


</template>

<script>
import { validationMixin } from "vuelidate";
import { required, decimal, integer, minValue } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "add-payment",
  data() {
    return {
      cost: undefined,
      name: undefined,
      stock: undefined
    };
  },

  validations: {
    cost: { required, decimal },
    name: { required },
    stock: { required, integer, minValue: minValue(0), },
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

      const request = await this.$axios.$post(
        "http://localhost:4000/api/products",
        {
          shopId: this.$route.params.user,
          cost: this.cost,
          name: this.name,
          stock: this.stock,
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
