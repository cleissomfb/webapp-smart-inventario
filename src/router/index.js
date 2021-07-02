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
  },
  {
    path: "/editarPerfil",
    name: "EditarPerfil",
    component: EditarPerfil,
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: Inventario,
  },
  {
    path: "/inventario/novoInventario",
    component: InventarioEdit,
  },
  {
    path: "/inventario/:idInventario",
    name: "InventarioEdit",
    component: InventarioEdit,
  },
  {
    path: "/categorias",
    name: "Categoria",
    component: Categorias,
  },
  {
    path: "/setorArea",
    name: "SetorArea",
    component: SetorArea,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
