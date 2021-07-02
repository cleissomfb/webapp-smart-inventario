import Vue from 'vue'

import { authHeader } from '../helpers'

export const categoriaService = {
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

  return Vue.axios.get(`/api/categorias/`, requestCfg)
}

function getById(idCategoria) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.get(`/api/categorias/${idCategoria}`, requestCfg)
}

function save(categoria) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader(),
  }

  return Vue.axios.post(`/api/categorias`, categoria, requestCfg)
}

function _delete(idCategoria) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.delete(`/api/categorias/${idCategoria}`, requestCfg)
}
