import { createContext, useContext, useReducer } from "react";

// Create the context
export const StateContext = createContext();

// Create the provider component
export const StateProvider = ({ initialState, reducer, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state
export const useStateProvider = () => useContext(StateContext);