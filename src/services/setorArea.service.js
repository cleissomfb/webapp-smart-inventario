const baseURL = process.env.VUE_APP_API_LOCATION;
import Vue from "vue";

import { authHeader } from "../helpers";

export const setorAreaService = {
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

  return Vue.axios.get(baseURL + `/departments`, requestCfg);
}

function getById(idSetorArea) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.get(baseURL + `/departments/${idSetorArea}`, requestCfg);
}

function save(setorArea) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.post(baseURL + `/departments`, setorArea, requestCfg);
}

function put(setorArea) {
  const requestCfg = {
    method: "POST",
    headers: authHeader(),
  };

  return Vue.axios.put(
    baseURL + `/departments/${setorArea._id}`,
    setorArea,
    requestCfg
  );
}

function _delete(idSetorArea) {
  const requestCfg = {
    method: "GET",
    headers: authHeader(),
  };

  return Vue.axios.delete(baseURL + `/departments/${idSetorArea}`, requestCfg);
}
