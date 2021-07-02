<template>
  <b-navbar class="navbar">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="d-flex justify-content-between">
      <b-navbar-nav>
        <b-nav-item
          ><router-link to="/paginaInicial"
            ><img
              src="@/assets/imagens/logo.jpeg"
              alt="Logo menor"/></router-link
        ></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav style="margin-right: 20px !important;">
        <b-nav-item-dropdown right>
          <template #button-content>
            <span class="aparecer-nome-usuario nome-usuario"
              ><b-icon icon="person-fill" class="margin-icon"></b-icon>Nome do
              Usuário</span
            >
            <b-icon-three-dots-vertical class="aparecer-tree-dots tree-dots" />
          </template>
          <b-dropdown-item @click="editarPerfil">Editar Perfil</b-dropdown-item>
          <div class="border-separador"></div>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    editarPerfil() {
      this.$router.push({
        path: "/editarPerfil",
      });
    },
    logout() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style></style>
