<template>
  <div class="background-login">
    <div class="container-login">
      <div class="card-container-login card-interno-login">
        <b-row>
          <b-col sm="12" md="12">
            <div class="logotipo"></div>
          </b-col>
          <b-col sm="12" md="12" class="mt-3">
            <b-form-group id="email" label="E-mail:" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                class="mt-2"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="12" class="mt-3">
            <b-form-group id="password" label="Senha:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                class="mt-2"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="12" class="my-2 d-flex d-flex justify-content-end">
            <a href="/verificarEmail"
              ><small class="text-secondary">Esqueci minha senha</small></a
            >
          </b-col>
          <b-col sm="12" md="12">
            <b-button @click="login" class="btn-home mt-2" variant="primary"
              ><b-icon icon="person-fill" class="margin-icon"></b-icon
              >Login</b-button
            >
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push({
        path: "/paginaInicial",
      });
    },
  },
};
</script>
