export function saveToken(token, tokenType) {
  localStorage.setItem(tokenType, token);
}

export function getToken() {
  return localStorage.getItem("access_token");
}

export function getTokenData(decodedToken) {
  if (decodedToken["is_active"]) {
    return decodedToken["username"];
  }
  return false;
}
