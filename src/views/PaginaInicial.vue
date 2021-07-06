<template>
  <div class="background-pagina-inicial">
    <navbar />
    <div class="container-pagina-principal">
      <div class="card-container card-interno">
        <b-row>
          <b-col sm="12" md="12">
            <h2 class="text-center">Bem-vindo(a)!</h2>
          </b-col>
          <b-col sm="12" md="12">
            <div class="mt-3">
              <b-button
                @click="clickInventario"
                class="btn-home p-2"
                variant="primary"
                ><b-icon icon="building" class="margin-icon"></b-icon
                >Inventário</b-button
              >
            </div>
          </b-col>
          <b-col sm="12" md="12">
            <div class="mt-3">
              <b-button
                @click="clickCadastros"
                class="btn-home p-2"
                variant="primary"
                ><span
                  ><b-icon icon="pencil-fill" class="margin-icon"></b-icon
                  >Cadastros</span
                ></b-button
              >
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal id="modal-cadastro" hide-footer centered>
      <template #modal-title> Cadastros </template>
      <b-row>
        <b-col sm="12" md="12">
          <div class="mt-3">
            <b-button
              @click="clickCategorias"
              class="btn-modal-cadastro p-2"
              variant="primary"
              ><span
                ><b-icon icon="pencil-fill" class="margin-icon"></b-icon
                >Categorias</span
              ></b-button
            >
          </div>
        </b-col>
        <b-col sm="12" md="12">
          <div class="mt-3">
            <b-button
              @click="clickSetorArea"
              class="btn-modal-cadastro p-2"
              variant="primary"
              ><span
                ><b-icon icon="pencil-fill" class="margin-icon"></b-icon
                >Setor/Área</span
              ></b-button
            >
          </div>
        </b-col>
        <b-col sm="12" md="12" v-if="usuario.role == 'admin'">
          <div class="mt-3">
            <b-button
              @click="clickUsuarios"
              class="btn-modal-cadastro p-2"
              variant="primary"
              ><span
                ><b-icon icon="pencil-fill" class="margin-icon"></b-icon
                >Usuários</span
              ></b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "PaginaInicial",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      usuario: "usuario/usuario",
    }),
  },
  methods: {
    clickInventario() {
      this.$router.push({
        path: "/inventario",
      });
    },
    clickCadastros() {
      this.$bvModal.show("modal-cadastro");
      console.log(this.usuario);
    },
    clickCategorias() {
      this.$router.push({
        path: "/categorias",
      });
    },
    clickSetorArea() {
      this.$router.push({
        path: "/setorArea",
      });
    },
    clickUsuarios() {
      this.$router.push({
        path: "/usuarios",
      });
    },
  },
};
</script>

<style></style>
