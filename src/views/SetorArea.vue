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
                  <h5 class="primary mt-1">Setor/Área</h5>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-end">
                  <b-button @click="addSetorArea()" variant="success"
                    ><b-icon icon="plus"></b-icon
                  ></b-button>
                </b-col>
              </b-row>
            </div>
            <b-table
              striped
              hover
              :fields="fieldsSetorArea"
              :items="setorAreas"
              :show-empty="true"
              empty-text="Não há setor/área disponível."
            >
              <template v-slot:cell(actions)="row">
                <b-button class="m-1" @click="editSetorArea(row.item._id)">
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  class="m-1"
                  variant="danger"
                  @click="deleteSetorArea(row.item._id)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-setor-area" hide-footer centered>
      <template #modal-title>{{
        setorArea.id == undefined ? "Adicionar setor/área" : "Editar setor/área"
      }}</template>
      <b-row>
        <b-col sm="12" md="12">
          <b-form-group>
            <label for="name">Descrição:</label>
            <b-form-input v-model="setorArea.description"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12">
          <b-button @click="salvarSetorArea()" class="mt-3" variant="success"
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
import { setorAreaService } from "@/services";

import Navbar from "../components/Navbar.vue";
export default {
  name: "SetorArea",
  components: {
    Navbar,
  },
  data() {
    return {
      fieldsSetorArea: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "15% !important" },
        },
        {
          key: "description",
          label: "Descrição",
          thStyle: { width: "90% !important" },
        },
      ],
      setorAreas: [],
      setorArea: {},
      show: false,
    };
  },
  methods: {
    addSetorArea() {
      this.setorArea = {};
      this.$bvModal.show("modal-setor-area");
    },
    editSetorArea(idSetorArea) {
      this.$bvModal.show("modal-setor-area");

      if (idSetorArea) {
        let row = this.setorAreas.filter((data) => data._id == idSetorArea);
        if (row != null) {
          this.setorArea = row[0];
          console.log("setorArea=>", this.setorArea);
          this.$bvModal.show("modal-setor-area");
        }
      } else {
        this.showErrorNotification("Selecione um setor/área para editar.");
      }
    },
    deleteSetorArea(idSetorArea) {
      this.$bvModal
        .msgBoxConfirm("Deseja remover este setor/área ?", {
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
            setorAreaService
              .delete(idSetorArea)
              .then(() => {
                this.findSetorArea();
                this.showSuccessNotification(
                  "Setor/area deletada com sucesso."
                );
              })
              .catch((error) => {
                this.showErrorNotification(error.response);
              });
          }
        });
    },
    salvarSetorArea() {
      if (this.setorArea._id == undefined) {
        setorAreaService
          .save(this.setorArea)
          .then(() => {
            this.findSetorArea();
            this.$bvModal.hide("modal-setor-area");
            this.showSuccessNotification("Setor/área adicionada com sucesso.");
          })
          .catch((error) => {
            this.showErrorNotification(error.response);
          });
      } else {
        setorAreaService
          .put(this.setorArea)
          .then(() => {
            this.findSetorArea();
            this.$bvModal.hide("modal-setor-area");
            this.showSuccessNotification("Setor/área editado com sucesso.");
          })
          .catch((error) => {
            this.showErrorNotification(error.response);
          });
      }
    },
    cancelar() {
      this.$bvModal.hide("modal-setor-area");
    },
    findSetorArea() {
      this.show = true;
      setorAreaService
        .find()
        .then((response) => {
          this.setorAreas = response.data;
          this.show = false;
        })
        .catch((error) => {
          this.setorAreas = [];
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
    this.findSetorArea();
  },
};
</script>

<style></style>
