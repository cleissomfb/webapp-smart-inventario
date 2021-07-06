const baseURL = process.env.VUE_APP_API_LOCATION;

import Vue from "vue";

import { authHeader } from "../helpers";

export const inventarioService = {
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

  return Vue.axios.get(baseURL + `/inventories`, requestCfg);
}

function getById(idInventario) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/inventories/${idInventario}`, requestCfg);
}

function save(inventario) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/inventories`, inventario, requestCfg);
}

function patch(inventario) {
  const requestCfg = {
    method: "PATCH",
    headers: authHeader(),
  };

  return Vue.axios.patch(baseURL + `/inventories`, inventario, requestCfg);
}

function _delete(idInventario) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/inventories/${idInventario}`, requestCfg);
}
