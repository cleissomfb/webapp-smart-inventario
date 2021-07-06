const baseURL = process.env.VUE_APP_API_LOCATION;

import Vue from "vue";

import { authHeader } from "../helpers";

export const usuarioService = {
  find,
  getById,
  save,
  patch,
  delete: _delete,
};

function find() {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/users`, requestCfg);
}

function getById(idUsuario) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/users/${idUsuario}`, requestCfg);
}

function save(usuario) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/users`, usuario, requestCfg);
}

function patch(usuario) {
  const requestCfg = {
    method: "PATCH",
    headers: authHeader(),
  };

  const idUser = usuario.id;

  usuario.isEmailVerified = undefined;
  usuario.id = undefined;
  usuario.role = undefined;

  return Vue.axios.patch(baseURL + `/users/${idUser}`, usuario, requestCfg);
}

function _delete(idUsuario) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/users/${idUsuario}`, requestCfg);
}
