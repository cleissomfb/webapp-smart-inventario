<template>
  <div class="background-inventario">
    <Navbar />
    <div class="container my-5">
      <b-row>
        <b-col cols="12">
          <b-card>
            <div slot="header">
              <b-row>
                <b-col cols="10">
                  <h5
                    class="primary mt-1"
                    v-if="inventario.id == null || inventario.id == undefined"
                  >
                    Adicionar Inventário
                  </h5>
                  <h5
                    class="primary mt-1"
                    v-if="inventario.id != null || inventario.id != undefined"
                  >
                    Editar Inventário
                  </h5>
                </b-col>
              </b-row>
            </div>
            <b-row>
              <b-col cols="2">
                <b-form-group label="Data Inclusão:" class="my-3">
                  <b-form-input
                    v-model="inventario.dataInclusao"
                    type="date"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="2">
                <b-form-group label="Data do Registro:" class="my-3">
                  <b-form-input
                    v-model="inventario.dataRegistro"
                    type="date"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Setor/Área:" class="my-3">
                  <b-form-select
                    id="setorArea"
                    name="setorArea"
                    v-model="inventario.idSetorArea"
                  >
                    <b-form-select-option :value="null"
                      >Selecione um setor/área</b-form-select-option
                    >
                    <b-form-select-option
                      v-for="(setorArea, idx) in setorAreas"
                      :key="idx"
                      :value="setorArea.id"
                    >
                      {{ setorArea.descricao }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Local:" class="my-3">
                  <b-form-input
                    v-model="inventario.local"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group label="Nro Patrimônio:" class="my-3">
                  <b-form-input
                    v-model="inventario.nroPatrimonio"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="9">
                <b-form-group label="Nome do Item:" class="my-3">
                  <b-form-input
                    v-model="inventario.nomeItem"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Marca:" class="my-3">
                  <b-form-input
                    v-model="inventario.marca"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Modelo:" class="my-3">
                  <b-form-input
                    v-model="inventario.modelo"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Nro Série:" class="my-3">
                  <b-form-input
                    v-model="inventario.nroSerie"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Categoria:" class="my-3">
                  <b-form-select
                    id="categoria"
                    name="categoria"
                    v-model="inventario.idCategoria"
                  >
                    <b-form-select-option :value="null"
                      >Selecione uma categoria</b-form-select-option
                    >
                    <b-form-select-option
                      v-for="(categoria, idx) in categorias"
                      :key="idx"
                      :value="categoria.id"
                    >
                      {{ categoria.descricao }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Estado de Conservação:" class="my-3">
                  <b-form-select
                    id="EstadoConservacao"
                    name="EstadoConservacao"
                    v-model="inventario.idEstadoConsercacao"
                  >
                    <b-form-select-option :value="null"
                      >Selecione uma categoria</b-form-select-option
                    >
                    <b-form-select-option value="S"
                      >Sucata</b-form-select-option
                    >
                    <b-form-select-option value="A">Ruim</b-form-select-option>
                    <b-form-select-option value="R"
                      >Regular</b-form-select-option
                    >
                    <b-form-select-option value="B">Bom</b-form-select-option>
                    <b-form-select-option value="O">Ótimo</b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group label="Ausência de Etiquetas:" class="my-3">
                  <b-form-select
                    id="ausenciaEtiquetas"
                    name="ausenciaEtiquetas"
                    v-model="inventario.idAusenciaEtiquetas"
                  >
                    <b-form-select-option :value="null"
                      >Selecione uma categoria</b-form-select-option
                    >
                    <b-form-select-option value="S">Sim</b-form-select-option>
                    <b-form-select-option value="N">Não</b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Situação do Item:" class="my-3">
                  <b-form-textarea
                    v-model="inventario.situacaoItem"
                    type="text"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Observação:" class="my-3">
                  <b-form-textarea
                    v-model="inventario.obsercacao"
                  ></b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col cols="12" class="d-flex justify-content-end">
                <b-button
                  @click="salvarInventario()"
                  class="mt-3 mx-3"
                  variant="success"
                  ><b-icon icon="check"></b-icon>Salvar</b-button
                >
                <b-button @click="cancelar()" class="mt-3" variant="danger"
                  ><b-icon icon="x"></b-icon>Cancelar</b-button
                >
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  inventarioService,
  setorAreaService,
  categoriaService,
} from "@/services";

import Navbar from "../components/Navbar.vue";
export default {
  name: "InventarioEdit",
  components: {
    Navbar,
  },
  data() {
    return {
      inventario: {},
      setorAreas: [],
      categorias: [],
    };
  },
  methods: {
    findInventarioById(idInventario) {
      inventarioService
        .getById(idInventario)
        .then((response) => {
          this.inventario = response.data;
        })
        .catch((error) => {
          this.showErrorNotification(error.response);
        });
    },
    findCategoria() {
      categoriaService
        .find()
        .then((response) => {
          this.categorias = response.data;
        })
        .catch((error) => {
          this.categoria = [];
          this.show = false;
          this.showErrorNotification(error.response);
        });
    },
    findSetorArea() {
      setorAreaService
        .find()
        .then((response) => {
          this.setorAreas = response.data;
          this.show = false;
        })
        .catch((error) => {
          this.setorAreas = [];
          this.showErrorNotification(error.response);
        });
    },
    salvarInventario() {
      inventarioService
        .save(this.inventario)
        .then(() => {
          this.showSuccessNotification("Inventário incluído com sucesso.");
          this.$router.push({
            path: "/inventario",
          });
        })
        .catch((error) => {
          this.showErrorNotification(error.response);
        });
    },
    cancelar() {
      this.$router.push({
        path: "/inventario",
      });
    },
    showSuccessNotification(msg) {
      this.$notify({
        title: "Confirmação",
        text: msg,
        type: "success",
      });
    },
    showErrorNotification(error) {
      this.$notify({
        title: "Error",
        text: error.response ? error.response.data.message : error,
        type: "error",
      });
    },
  },
  mounted() {
    const idInventario = this.$route.params.idInventario;

    if (idInventario != undefined) {
      this.findInventarioById(idInventario);
    }

    this.findCategoria();
    this.findSetorArea();
  },
};
</script>

<style></style>
