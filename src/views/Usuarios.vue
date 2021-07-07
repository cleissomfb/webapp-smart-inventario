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
                <b-button class="m-1" @click="editUsuario(row.item._id)">
                  <b-icon icon="pencil-fill"></b-icon>
                </b-button>
                <b-button
                  class="m-1"
                  variant="danger"
                  @click="deleteUsuario(row.item._id)"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-usuario" centered>
      <template #modal-title>{{
        usuario._id == undefined ? "Adicionar usuário" : "Editar usuário"
      }}</template>
      <b-tabs content-class="mt-3">
        <b-tab title="Geral" active>
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
                <b-form-input
                  v-model="usuario.email"
                  type="email"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" v-if="password == true">
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
          </b-row>
        </b-tab>
        <b-tab title="Endereço">
          <b-row>
            <b-col sm="12" md="4">
              <b-form-group>
                <label for="name">CEP:</label>
                <b-form-input
                  v-model="cep"
                  @keyup="searchCep()"
                  v-mask="maskCep"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="8">
              <b-form-group>
                <label for="name">Endereço:</label>
                <b-form-input v-model="endereco" disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="4">
              <b-form-group>
                <label for="name">Número:</label>
                <b-form-input v-model="numero"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="8">
              <b-form-group>
                <label for="name">Complemento:</label>
                <b-form-input v-model="complemento"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12">
              <b-form-group>
                <label for="name">Bairro:</label>
                <b-form-input v-model="bairro" debounce=""></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="8">
              <b-form-group>
                <label for="name">Cidade:</label>
                <b-form-input v-model="cidade" disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="4">
              <b-form-group>
                <label for="name">Estado:</label>
                <b-form-input v-model="estado" disabled></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
      <template #modal-footer>
        <b-button @click="salvarUsuario()" variant="success"
          ><b-icon icon="check"></b-icon>Salvar</b-button
        >
        <b-button @click="cancelar()" class="mx-1" variant="danger"
          ><b-icon icon="x"></b-icon>Cancelar</b-button
        >
      </template>
    </b-modal>
    <b-modal id="modalCep" centered class="mt-5" title="Ops, atenção!">
      <p class="my-2">
        O CEP não foi digitado corretamente, tente novamente!
      </p>
      <template #modal-footer>
        <b-button size="md" class="float-right" @click="hideCep"
          ><b-icon icon="check" class="mr-1"></b-icon>
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { usuarioService, buscarCepService } from "@/services";
import Navbar from "../components/Navbar.vue";
import { mapGetters } from "vuex";
import { store } from "@/store";

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
      password: true,

      maskCep: "##.###-###",
      cep: null,
      endereco: null,
      numero: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
    };
  },
  computed: {
    ...mapGetters({
      // usuario: "usuario/usuario",
      idUsuario: "usuario/idUsuario",
    }),
  },
  methods: {
    addUsuario() {
      this.usuario = {};
      this.checkAdmin = false;
      this.password = true;

      this.cep = null;
      this.endereco = null;
      this.numero = null;
      this.complemento = null;
      this.bairro = null;
      this.cidade = null;
      this.estado = null;
      this.$bvModal.show("modal-usuario");
    },
    editUsuario(idUsuario) {
      this.$bvModal.show("modal-usuario");
      if (idUsuario) {
        let row = this.usuarios.filter((data) => data._id == idUsuario);
        if (row != null) {
          this.usuario = row[0];
          console.log("usuario=>", this.usuario);
          this.$bvModal.show("modal-usuario");

          this.password = false;

          if (this.usuario.role == "admin") {
            this.checkAdmin = true;
          } else {
            this.checkAdmin = false;
          }

          this.cep = null;
          this.endereco = null;
          this.numero = null;
          this.complemento = null;
          this.bairro = null;
          this.cidade = null;
          this.estado = null;

          if (this.usuario.zipCode) {
            this.cep = this.usuario.zipCode;
            this.endereco = this.usuario.address;
            this.numero = this.usuario.number;
            this.complemento = this.usuario.complement;
            this.bairro = this.usuario.district;
            this.cidade = this.usuario.city;
            this.estado = this.usuario.state;
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
      if (this.usuario._id == undefined) {
        this.usuario.role = undefined;
        if (this.checkAdmin) {
          this.usuario.role = "admin";
        } else {
          this.usuario.role = "user";
        }

        this.usuario.zipCode = this.cep;
        this.usuario.address = this.endereco;
        this.usuario.number = this.numero;
        this.usuario.complement = this.complemento;
        this.usuario.district = this.bairro;
        this.usuario.city = this.cidade;
        this.usuario.state = this.estado;

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
        this.usuario.role = undefined;
        if (this.checkAdmin) {
          this.usuario.role = "admin";
        } else {
          this.usuario.role = "user";
        }

        this.usuario.zipCode = this.cep;
        this.usuario.address = this.endereco;
        this.usuario.number = this.numero;
        this.usuario.complement = this.complemento;
        this.usuario.district = this.bairro;
        this.usuario.city = this.cidade;
        this.usuario.state = this.estado;

        usuarioService
          .put(this.usuario)
          .then((response) => {
            this.findUsuarios();
            this.$bvModal.hide("modal-usuario");
            this.showSuccessNotification("Usuário alterado com sucesso.");

            let usuarioSessao = JSON.parse(localStorage.getItem("usuario"));
            usuarioSessao.name = this.usuario.name;

            if (this.idUsuario == response.data._id) {
              store.dispatch("usuario/setUsuario", usuarioSessao);
              localStorage.setItem("usuario", JSON.stringify(usuarioSessao));
            }
          })
          .catch((error) => {
            this.showErrorNotification(error.response);
          });
      }
    },
    searchCep() {
      const parsed = this.cep
        .normalize("NFD")
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "");
      if (parsed.length == 8) {
        this.show = true;
        buscarCepService
          .buscarCep(parsed)
          .then((response) => {
            this.data = response.data;
            console.log(response.data);
            this.cep = this.data.code;
            this.endereco = this.data.address;
            this.estado = this.data.state;
            this.cidade = this.data.city;
            this.bairro = this.data.district;
            // console.log(this.data);
            if (this.data.status == "404") {
              this.$bvModal.show("modalCep");
            }
          })
          .catch((error) => {
            console.log(error);
            this.show = false;
            this.$bvModal.show("modalCep");
          });
      }
    },
    cancelar() {
      this.$bvModal.hide("modal-usuario");
    },
    hideCep() {
      this.$bvModal.hide("modalCep");
    },
    findUsuarios() {
      this.show = true;
      usuarioService
        .find()
        .then((response) => {
          this.usuarios = response.data;
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
