import { reducerCases } from "./constants";

// Initial state
export const initialState = {
    userInfo: undefined,
    newUser:false,
  };
  
// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      // Log action type and updated userInfo
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_NEW_USER:
      // Log action type and updated newUser
      return {
        ...state,
        newUser: action.newUser,
      };
    default:
      return state;
  }
};

export default reducer;
