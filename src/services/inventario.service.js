import Vue from 'vue'

import { authHeader } from '../helpers'

export const inventarioService = {
  find,
  getById,
  save,
  delete: _delete,
}

function find() {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.get(`/api/inventario/`, requestCfg)
}

function getById(idInventario) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.get(`/api/inventario/${idInventario}`, requestCfg)
}

function save(inventario) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader(),
  }

  return Vue.axios.post(`/api/inventario`, inventario, requestCfg)
}

function _delete(idInventario) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.delete(`/api/inventario/${idInventario}`, requestCfg)
}
