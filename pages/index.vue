<template lang="pug">
section.section.pt-5.templates
  .columns.is-mobile.is-full.pb-3
    .column
      .container
        p.is-size-4 Tiendas

      section
        b-table(
          :data="shopsData",
          ref="table",
          :opened-detailed="openedElementsArray",
          detailed="",
          detail-key="shopId",
          :detail-transition="'fade'",
          aria-next-label="Next page",
          aria-previous-label="Previous page",
          aria-page-label="Page",
          aria-current-label="Current page"
        )
          b-table-column(field="id", label="ID", v-slot="props")
            | {{ props.row.shopId }}
          b-table-column(field="Number", label="Nombre", v-slot="props")
            | {{ `Nombre: ${props.row.name}` }}
         

          template(#detail="props")
            p(v-if="props.row.Products.length==0" class="has-text-centered") No hay productos
            b-table( 
                v-if="props.row.Products.length!=0"
                :data="props.row.Products",
                ref="table",
                :opened-detailed="openedElementsArray",
                
                detail-key="productId",
                :detail-transition="'fade'",
                aria-next-label="Next page",
                aria-previous-label="Previous page",
                aria-page-label="Page",
                aria-current-label="Current page"
              )
                b-table-column(field="id", label="ID", v-slot="data")
                  | {{ data.row.productId }}
                b-table-column(field="Number", label="Nombre", v-slot="data")
                  | {{ `${data.row.name}` }}
                b-table-column(field="Number", label="Costo", v-slot="data")
                  | {{ `${data.row.cost}` }}
                b-table-column(field="Number", label="Stock", v-slot="data")
                  | {{ `${data.row.stock}` }}
              

          
            .container.mt-5
              .is-align-items-center.is-flex.is-justify-content-end
                b-button(
                  type="is-primary is-small",
                  @click="addProduct(props.row.shopId)"
                ) Añadir producto 
      section
        .container.mt-5
          .is-align-items-center.is-flex.is-justify-content-end
            b-button(
              type="is-primary is-small",
              @click="addClient()"
            ) Añadir tienda
               
</template>

<script>
export default {
  name: "plantillas",
  async asyncData({ $httpClient, app }) {
    const token = app.$cookies.get("tokenSession");

    console.log("tokenSessiontokenSessiontokenSession", token);
    console.log($httpClient);
    if (token && token.auth && token.auth.tokenSession) {
      $httpClient.defaults.headers.common.Authorization = `Bearer ${token.auth.tokenSession}`;
    }

    const request = await $httpClient.get("http://localhost:4000/api/shops");

    console.log(request.data);
    return { shopsData: request.data };
  },
  data() {
    return {
      openedElementsArray: [1],
    };
  },
  methods: {
    addClient: function (elementTemplate) {
      this.$router.push(`/agregarTienda`);
    },
    addProduct: function (shopId) {
      this.$router.push(`/${shopId}/agregarProduct`);
    },
  },
};
</script>

<style>
.b-table .table {
  background-color: #e5f5ff;
}
</style>
