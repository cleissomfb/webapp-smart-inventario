<template>
  <div class="background-pagina-inicial">
    <Navbar />
    <div class="container mt-5">
      <b-row>
        <b-col cols="12">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col cols="12">
                  <h5 class="primary mt-2">Editar Perfil</h5>
                </b-col>
              </b-row>
            </div>
            <b-row>
              <b-col sm="12" md="12">
                <b-form-group>
                  <label for="name">Nome:</label>
                  <b-form-input v-model="perfil.name"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="12">
                <b-button
                  @click="atualizarPerfil()"
                  class="mt-3"
                  variant="success"
                  ><b-icon icon="check"></b-icon>Salvar</b-button
                >
                <b-button @click="cancelar()" class="mt-3 mx-3" variant="danger"
                  ><b-icon icon="x"></b-icon>Cancelar</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { usuarioService } from "@/services";
import { mapGetters } from "vuex";
import { store } from "@/store";

export default {
  name: "EditarPerfil",
  components: {
    Navbar,
  },
  data() {
    return {
      perfil: {},
    };
  },
  computed: {
    ...mapGetters({
      usuario: "usuario/usuario",
      idUsuario: "usuario/idUsuario",
    }),
  },
  methods: {
    atualizarPerfil() {
      const userAux = this.usuario;
      userAux.name = this.perfil.name;
      userAux.id = this.idUsuario;

      usuarioService
        .patch(this.perfil)
        .then(() => {
          this.showSuccessNotification("Usuário editado com sucesso.");
          store.dispatch("usuario/setUsuario", userAux);
          this.$router.push("/paginaInicial");
        })
        .catch((error) => {
          this.showErrorNotification(error.response);
        });
    },
    cancelar() {
      this.$router.push({
        path: "/paginaInicial",
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
    this.perfil = this.usuario;
  },
};
</script>

<style></style>
