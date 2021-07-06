<template>
  <div class="background-pagina-inicial">
    <Navbar />
    <div class="container mt-5">
      <b-row>
        <b-col cols="12">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col cols="9">
                  <h5 class="primary mt-1">Usuários</h5>
                </b-col>
                <b-col cols="3" class="d-flex justify-content-end">
                  <b-button @click="addUsuario()" variant="success"
                    ><b-icon icon="plus"></b-icon
                  ></b-button>
                </b-col>
              </b-row>
            </div>
            <b-table
              striped
              hover
              :fields="fieldsUsuario"
              :items="usuarios"
              :show-empty="true"
              empty-text="Não há usuários disponíveis."
            >
              <template v-slot:cell(actions)="row">
                <b-button class="m-1" @click="editUsuario(row.item.id)">
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  class="m-1"
                  variant="danger"
                  @click="deleteUsuario(row.item.id)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-usuario" hide-footer centered>
      <template #modal-title>{{
        usuario.id == undefined ? "Adicionar usuário" : "Editar usuário"
      }}</template>
      <b-row>
        <b-col sm="12" md="12">
          <b-form-group>
            <label for="name">Nome:</label>
            <b-form-input v-model="usuario.name"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12">
          <b-form-group>
            <label for="name">E-mail:</label>
            <b-form-input v-model="usuario.email" type="email"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12" v-if="usuario.id == undefined">
          <b-form-group>
            <label for="name">Senha:</label>
            <b-form-input
              v-model="usuario.password"
              type="password"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="12">
          <b-form-checkbox
            id="administrador"
            v-model="checkAdmin"
            name="administrador"
            class="my-2"
          >
            Usuário Administrador
          </b-form-checkbox>
        </b-col>
        <b-col sm="12" md="12">
          <b-button @click="salvarUsuario()" class="mt-3" variant="success"
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
import { usuarioService } from "@/services";

import Navbar from "../components/Navbar.vue";
export default {
  name: "Usuario",
  components: {
    Navbar,
  },
  data() {
    return {
      fieldsUsuario: [
        {
          key: "actions",
          label: "Ações",
          thStyle: { width: "15% !important" },
        },
        {
          key: "name",
          label: "Nome",
          thStyle: { width: "90% !important" },
        },
      ],
      usuarios: [],
      usuario: {},
      show: false,
      checkAdmin: false,
    };
  },
  methods: {
    addUsuario() {
      this.usuario = {};
      this.$bvModal.show("modal-usuario");
    },
    editUsuario(idUsuario) {
      console.log(idUsuario);
      this.$bvModal.show("modal-usuario");
      if (idUsuario) {
        let row = this.usuarios.filter((data) => data.id == idUsuario);
        if (row != null) {
          this.usuario = row[0];
          console.log("usuario=>", this.usuario);
          this.$bvModal.show("modal-usuario");

          if (this.usuario.role == "admin") {
            this.checkAdmin = true;
          } else {
            this.checkAdmin = false;
          }
        }
      } else {
        this.showErrorNotification("Selecione um usuário para editar.");
      }
    },
    deleteUsuario(idUsuario) {
      this.$bvModal
        .msgBoxConfirm("Deseja remover este usuário ?", {
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
            usuarioService
              .delete(idUsuario)
              .then(() => {
                this.findUsuarios();
                this.showSuccessNotification("Usuário removido com sucesso.");
              })
              .catch((error) => {
                console.log(error);
                this.showErrorNotification(error.response);
              });
          }
        });
    },
    salvarUsuario() {
      if (this.usuario.id == undefined) {
        if (this.checkAdmin) {
          this.usuario.role = "admin";
        } else {
          this.usuario.role = "user";
        }
        usuarioService
          .save(this.usuario)
          .then(() => {
            this.findUsuarios();
            this.$bvModal.hide("modal-usuario");
            this.showSuccessNotification("Usuário incluído com sucesso.");
          })
          .catch((error) => {
            this.showErrorNotification(error.response);
          });
      } else {
        if (this.checkAdmin) {
          this.usuario.role = "admin";
        } else {
          this.usuario.role = "user";
        }
        
        usuarioService
          .patch(this.usuario)
          .then(() => {
            this.findUsuarios();
            this.$bvModal.hide("modal-usuario");
            this.showSuccessNotification("Usuário alterado com sucesso.");

            let usuarioSessao = JSON.parse(localStorage.getItem("usuario"));
            console.log(usuarioSessao);
            usuarioSessao.name = this.usuario.name;

            localStorage.setItem("usuario", JSON.stringify(usuarioSessao));
          })
          .catch((error) => {
            this.showErrorNotification(error.response);
          });
      }
    },
    cancelar() {
      this.$bvModal.hide("modal-usuario");
    },
    findUsuarios() {
      this.show = true;
      usuarioService
        .find()
        .then((response) => {
          console.log(response.data);
          this.usuarios = response.data.results;
          this.show = false;
        })
        .catch((error) => {
          this.usuarios = [];
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
      console.log(error);
      this.$notify({
        title: "Error",
        text: error.response ? error.response.data.message : error,
        type: "error",
      });
    },
  },
  mounted() {
    this.findUsuarios();
  },
};
</script>

<style></style>
