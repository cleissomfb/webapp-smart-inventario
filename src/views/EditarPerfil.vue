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
                  <b-form-input v-model="perfil.nome"></b-form-input>
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
  methods: {
    atualizarPerfil() {},
    cancelar() {
      this.$router.push({
        path: "/paginaInicial",
      });
    },
  },
};
</script>

<style></style>
