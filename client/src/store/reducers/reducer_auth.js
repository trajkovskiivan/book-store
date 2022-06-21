import { CLEAN_AUTH_STATE, SAVE_AUTH_STATE } from "../types";

const INITIAL_STATE = {
  user: {
    email: "",
    password: "",
  },
  authenticated: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case SAVE_AUTH_STATE:
      return { ...payload };
    case CLEAN_AUTH_STATE:
      return {
        user: {
          email: "",
          password: "",
        },
        authenticated: false,
      };
    default:
      return state;
  }
};
