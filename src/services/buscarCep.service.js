import Vue from 'vue'

export const buscarCepService = {
  buscarCep
}

function buscarCep (cep) {
  const requestCfg = {
    method: 'GET'
  }
  return Vue.axios.get(`https://us-central1-clique-estagios-336ac.cloudfunctions.net/getCep?cep=${cep}`, requestCfg)
}

// function buscarCep (cep) {
//   const requestCfg = {
//     method: 'GET'
//   }
//   return Vue.axios.get(`https://ws.apicep.com/cep/${cep}.json/`, requestCfg)
// }