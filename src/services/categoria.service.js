const baseURL = process.env.VUE_APP_API_LOCATION;

import Vue from "vue";

import { authHeader } from "../helpers";

export const categoriaService = {
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

  return Vue.axios.get(baseURL + `/categories`, requestCfg);
}

function getById(idCategoria) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/categories/${idCategoria}`, requestCfg);
}

function save(categoria) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/categories`, categoria, requestCfg);
}

function put(categoria) {
  const requestCfg = {
    method: "PUT",
    headers: authHeader(),
  };

  return Vue.axios.put(
    baseURL + `/categories/${categoria._id}`,
    categoria,
    requestCfg
  );
}

function _delete(idCategoria) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/categories/${idCategoria}`, requestCfg);
}
