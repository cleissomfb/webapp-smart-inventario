<template>
  <div class="background-pagina-inicial">
    <Navbar />
    <div class="container mt-5">
      <b-row>
        <b-col cols="12">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col cols="10">
                  <h5 class="primary mt-1">Inventário</h5>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                  <b-button @click="addInventario()" variant="success"
                    ><b-icon icon="plus"></b-icon
                  ></b-button>
                </b-col>
              </b-row>
            </div>
            <b-table
              striped
              hover
              :fields="fieldsInventario"
              :items="inventarios"
              :show-empty="true"
              empty-text="Não há inventários disponíveis."
            >
              <template v-slot:cell(actions)="row">
                <b-button class="m-1" @click="editInventario(row.item._id)">
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  class="m-1"
                  variant="danger"
                  @click="deleteInventario(row.item._id)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { inventarioService } from "@/services";

import Navbar from "../components/Navbar.vue";
export default {
  name: "Categorias",
  components: {
    Navbar,
  },
  data() {
    return {
      fieldsInventario: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "15% !important" },
        },
        {
          key: "inventoryNumber",
          label: "Patrimônio",
          thStyle: { width: "35% !important" },
        },
        {
          key: "name",
          label: "Nome do Item",
          thStyle: { width: "50% !important" },
        },
      ],
      inventarios: [],
    };
  },
  methods: {
    addInventario() {
      this.$router.push({
        path: "/inventario/novoInventario",
      });
    },
    editInventario(idInventario) {
      this.$router.push({
        name: "InventarioEdit",
        params: {
          idInventario: idInventario,
        },
      });
    },
    deleteInventario(idInventario) {
      this.$bvModal
        .msgBoxConfirm("Deseja remover esta inventário ?", {
          centered: true,
          title: "Confirmação",
          size: "sm",
          okTitle: "Sim",
          okVariant: "primary",
          cancelTitle: "Não",
          cancelVariant: "outline-secondary",
          headerClass: "p-3",
          footerClass: "p-2 flex-row d-flex",
        })
        .then((confirmed) => {
          if (confirmed) {
            inventarioService
              .delete(idInventario)
              .then(() => {
                this.findInventario();
                this.showSuccessNotification(
                  "Inventario incluído com sucesso."
                );
              })
              .catch((error) => {
                this.showErrorNotification(error.response);
              });
          }
        });
    },
    findInventario() {
      this.show = true;
      inventarioService
        .find()
        .then((response) => {
          this.inventarios = response.data;
          this.show = false;
        })
        .catch((error) => {
          this.inventarios = [];
          this.show = false;
          this.showErrorNotification(error.response);
        });
    },
    showSuccessNotification(msg) {
      this.$notify({
        title: "Confirmação",
        text: msg,
        type: "success",
      });
    },
    showErrorNotification(error) {
      this.$notify({
        title: "Error",
        text: error.response ? error.response.data.message : error,
        type: "error",
      });
    },
  },
  mounted() {
    this.findInventario();
  },
};
</script>

<style></style>
