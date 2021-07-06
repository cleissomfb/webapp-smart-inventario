import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Login from "../views/Login.vue";
import VerificarEmail from "../views/VerificarEmail.vue";
import PaginaInicial from "../views/PaginaInicial.vue";
import EditarPerfil from "../views/EditarPerfil.vue";
import Inventario from "../views/Inventario.vue";
import InventarioEdit from "../views/InventarioEdit.vue";
import Categorias from "../views/Categorias";
import SetorArea from "../views/SetorArea";
import Usuarios from "../views/Usuarios";

import { isSignedInUser } from "../auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/verificarEmail",
    name: "VerificarEmail",
    component: VerificarEmail,
  },
  {
    path: "/paginaInicial",
    name: "PaginaIncial",
    component: PaginaInicial,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      // next("/");
    },
  },
  {
    path: "/editarPerfil",
    name: "EditarPerfil",
    component: EditarPerfil,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: Inventario,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/inventario/novoInventario",
    component: InventarioEdit,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/inventario/:idInventario",
    name: "InventarioEdit",
    component: InventarioEdit,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/categorias",
    name: "Categoria",
    component: Categorias,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/setorArea",
    name: "SetorArea",
    component: SetorArea,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
    beforeEnter(_, __, next) {
      // Impede usuários não assinados
      if (isSignedInUser()) {
        // de acessar a página Home.
        next();
        return;
      }
      next("/");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
