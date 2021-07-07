import decode from "jwt-decode";
import request from "./request";
import { store } from "@/store";

export async function signInUser(email, password) {
  await request("POST", "/auth", {
    email,
    password,
  }).then((data) => {
    if (data) {
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("usuario", JSON.stringify(data.user));
      store.dispatch("usuario/setUsuario", data.user);
      store.dispatch("usuario/setIdUsuario", data.user._id);
    }
  });
}

export function signOutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export function isSignedInUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não existe o token no LocalStorage
    return false; // significa que o usuário não está assinado.
  }
  try {
    const { exp: expiration } = decode(token);
    const isExpired = !!expiration && Date.now() > expiration * 1000;

    if (isExpired) {
      // Se o token tem uma data de expiração e
      return false; // essa data é menor que a atual o usuário
    } // não está mais assinado.
    return true;
  } catch (_) {
    // O "jwt-decode" lança erros pra tokens inválidos.
    return false; // Com um token inválido o usuário não está assinado.
  }
}
