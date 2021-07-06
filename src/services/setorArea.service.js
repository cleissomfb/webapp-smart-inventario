const baseURL = process.env.VUE_APP_API_LOCATION;
import Vue from "vue";

import { authHeader } from "../helpers";

export const setorAreaService = {
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

  return Vue.axios.get(baseURL + `/api/setorArea/`, requestCfg);
}

function getById(idSetorArea) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/api/setorArea/${idSetorArea}`, requestCfg);
}

function save(setorArea) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/api/setorArea`, setorArea, requestCfg);
}

function _delete(idSetorArea) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/api/setorArea/${idSetorArea}`, requestCfg);
}
