import Vue from 'vue'

import { authHeader } from '../helpers'

export const usuarioService = {
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

  return Vue.axios.get(`/api/usuarios/`, requestCfg)
}

function getById(idUsuario) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.get(`/api/usuarios/${idUsuario}`, requestCfg)
}

function save(usuario) {
  const requestCfg = {
    method: 'POST',
    headers: authHeader(),
  }

  return Vue.axios.post(`/api/usuarios`, usuario, requestCfg)
}

function _delete(idUsuario) {
  const requestCfg = {
    method: 'GET',
    headers: authHeader(),
  }

  return Vue.axios.delete(`/api/usuarios/${idUsuario}`, requestCfg)
}
