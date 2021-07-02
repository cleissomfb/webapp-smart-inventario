<template>
  <div class="background-login">
    <div class="container-verifica-email">
      <div class="card-container-verifica-email card-interno-verifica-email">
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
          <b-col sm="12" md="12">
            <b-button @click="login" class="btn-home mt-2" variant="primary"
              ><b-icon icon="envelope" class="margin-icon"></b-icon>Enviar
              e-mail de recuperação</b-button
            >
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificarEmail",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    login() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
