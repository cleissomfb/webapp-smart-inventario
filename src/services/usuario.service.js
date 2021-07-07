const baseURL = process.env.VUE_APP_API_LOCATION;

import Vue from "vue";

import { authHeader } from "../helpers";

export const usuarioService = {
  find,
  getById,
  save,
  put,
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

function put(usuario) {
  const requestCfg = {
    method: "PUT",
    headers: authHeader(),
  };

  const idUser = usuario._id;

  usuario.isEmailVerified = undefined;
  usuario._id = undefined;
  // usuario.role = undefined;

  return Vue.axios.put(baseURL + `/users/${idUser}`, usuario, requestCfg);
}

function _delete(idUsuario) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/users/${idUsuario}`, requestCfg);
}
