import { createContext, useContext, useReducer } from "react";

// Create a context for managing state
export const StateContext = createContext();

// Create a provider component to manage the state
export const StateProvider = ({ initialState, reducer, children }) => {
  return (
    // Provide the state and dispatch function to the context
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// Create a hook to access the state and dispatch function from the context
export const useStateProvider = () => useContext(StateContext);
