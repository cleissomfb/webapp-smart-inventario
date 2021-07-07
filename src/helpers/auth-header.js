export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return { "x-auth-token": token };
  } else {
    return {};
  }
}
