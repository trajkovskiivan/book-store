export const cacheUser = ({ email, password }) => {
  localStorage.setItem("user", JSON.stringify({ email, password }));
};

export const uncacheUser = () => {
  localStorage.removeItem("user");
};

export const getCacheUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    return console.error(e);
  }
};
