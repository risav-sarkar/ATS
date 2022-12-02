import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//Actual Initial State
//No user logged in
const INITIAL_STATE = {
  token: null,
  type: null,
  profile: null,
  isFetching: false,
  error: false,
};

//For Testing
//Logged In As Candidate
// const INITIAL_STATE = {
//   token: 11,
//   type: "candidate",
//   profile: null,
//   isFetching: false,
//   error: false,
// };

//Logged In As Employer
// const INITIAL_STATE = {
//   token: 11,
//   type: "employer",
//   profile: null,
//   isFetching: false,
//   error: false,
// };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        type: state.type,
        profile: state.profile,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
