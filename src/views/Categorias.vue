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
                  <h5 class="primary mt-1">Categorias</h5>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                  <b-button @click="addCategoria()" variant="success"
                    ><b-icon icon="plus"></b-icon
                  ></b-button>
                </b-col>
              </b-row>
            </div>
            <b-table
              striped
              hover
              :fields="fieldsCategoria"
              :items="categorias"
              :show-empty="true"
              empty-text="Não há categorias disponíveis."
            >
              <template v-slot:cell(actions)="row">
                <b-button class="m-1" @click="editCategoria(row.item.id)">
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  class="m-1"
                  variant="danger"
                  @click="deleteCategoria(row.item.id)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-categoria" hide-footer centered>
      <template #modal-title>
        {{
          categoria.id == undefined ? "Adicionar categoria" : "Editar categoria"
        }}
      </template>
      <b-row>
        <b-col cols="12">
          <b-form-group>
            <label for="name">Descrição:</label>
            <b-form-input v-model="categoria.descricao"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-button @click="salvarCategoria()" class="mt-3" variant="success"
            ><b-icon icon="check"></b-icon>Salvar</b-button
          >
          <b-button @click="cancelar()" class="mt-3 mx-3" variant="danger"
            ><b-icon icon="x"></b-icon>Cancelar</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import { categoriaService } from "@/services";

import Navbar from "../components/Navbar.vue";
export default {
  name: "Categorias",
  components: {
    Navbar,
  },
  data() {
    return {
      fieldsCategoria: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "15% !important" },
        },
        {
          key: "descricao",
          label: "Descrição",
          thStyle: { width: "90% !important" },
        },
      ],
      categorias: [
        { id: 1, descricao: "Eletrónico" },
        { id: 2, descricao: "Móveis" },
        { id: 3, descricao: "Veículos" },
      ],
      categoria: {},
      show: false,
    };
  },
  methods: {
    addCategoria() {
      this.categoria = {};
      this.$bvModal.show("modal-categoria");
    },
    editCategoria(idCategoria) {
      if (idCategoria) {
        let row = this.categorias.filter((data) => data.id == idCategoria);
        if (row != null) {
          this.categoria = row[0];
          console.log("categoria=>", this.categoria);
          this.$bvModal.show("modal-categoria");
        }
      } else {
        this.showErrorNotification("Selecione uma categoria para editar.");
      }
    },
    deleteCategoria(idCategoria) {
      this.$bvModal
        .msgBoxConfirm("Deseja remover esta categoria ?", {
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
            categoriaService
              .delete(idCategoria)
              .then(() => {
                this.findCategoria();
                this.showSuccessNotification("Categoria incluída com sucesso.");
              })
              .catch((error) => {
                this.showErrorNotification(error.response);
              });
          }
        });
    },
    salvarCategoria() {
      categoriaService
        .save(this.categoria)
        .then(() => {
          this.findCategoria();
          this.$bvModal.hide("modal-categoria");
          this.showSuccessNotification("Categoria ativo incluída com sucesso.");
        })
        .catch((error) => {
          this.showErrorNotification(error.response);
        });
    },
    cancelar() {
      this.$bvModal.hide("modal-categoria");
    },
    findCategoria() {
      this.show = true;
      categoriaService
        .find()
        .then((response) => {
          this.categorias = response.data;
          this.show = false;
        })
        .catch((error) => {
          this.categoria = [];
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
    // this.findCategoria();
  },
};
</script>

<style></style>
