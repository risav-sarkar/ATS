const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER_START":
      return {
        ...state,
        token: null,
        type: null,
        profile: null,
        error: false,
        isFetching: true,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        type: action.payload.type,
        token: action.payload.token,
        error: false,
      };
    case "LOGIN_USER_FAILURE":
      return {
        ...state,
        token: null,
        type: null,
        profile: null,
        isFetching: false,
        error: action.payload,
      };
    case "USER_SIGNOUT":
      return {
        ...state,
        token: null,
        type: null,
        profile: null,
        isFetching: false,
        error: null,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
