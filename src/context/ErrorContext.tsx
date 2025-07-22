import React, { createContext, useContext, useReducer } from "react";
import type { ErrorMap } from "../types/errorMap";

type ErrorAction =
  | { type: "SET_ERRORS"; section: keyof ErrorMap; errors: string[] }
  | { type: "CLEAR_ERRORS"; section: keyof ErrorMap; errors: string[] }
  | { type: "CLEAR_ALL_ERRORS" };

const initialErrorState: ErrorMap = {
  basic: [],
  advanced: [],
  tcpip: [],
  serial: [],
  auth: [],
  fsi: [],
  mapping: [],
};

function errorReducer(state: ErrorMap, action: ErrorAction): ErrorMap {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        [action.section]: Array.from(
          new Set([...state[action.section], ...action.errors])
        ), // avoid duplicates
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        [action.section]: state[action.section].filter(
          (err) => !action.errors.includes(err)
        ),
      };
    case "CLEAR_ALL_ERRORS":
      return { ...initialErrorState };
    default:
      return state;
  }
}

const ErrorContext = createContext<{
  state: ErrorMap;
  dispatch: React.Dispatch<ErrorAction>;
}>({
  state: initialErrorState,
  dispatch: () => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(errorReducer, initialErrorState);

  return (
    <ErrorContext.Provider value={{ state, dispatch }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => useContext(ErrorContext);
