import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebaseUtils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type in userReducer: ${type}`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // useReducer returns the state object and dispatch function
  // needs a reducer function and initial state value as parameters
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // listen for changes to auth token
    const unsubscribe = onAuthStateChangedListener((user) => {
      // create user document from auth token
      user && createUserDocumentFromAuth(user);

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
