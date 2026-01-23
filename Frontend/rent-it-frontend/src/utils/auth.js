export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  const role = localStorage.getItem("role");
  return role?.replace("ROLE_", "").toUpperCase();
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.clear();
};
