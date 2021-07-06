const baseURL = process.env.VUE_APP_API_LOCATION;

import Vue from "vue";

import { authHeader } from "../helpers";

export const categoriaService = {
  find,
  getById,
  save,
  delete: _delete,
};

function find() {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/api/categorias/`, requestCfg);
}

function getById(idCategoria) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/api/categorias/${idCategoria}`, requestCfg);
}

function save(categoria) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/api/categorias`, categoria, requestCfg);
}

function _delete(idCategoria) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(
    baseURL + `/api/categorias/${idCategoria}`,
    requestCfg
  );
}
