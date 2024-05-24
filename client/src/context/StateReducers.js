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
        console.log("ssSetUserInfo",{userInfo: action.userInfo})
      return{
        ...state,
        userInfo: action.userInfo,
      }
      case reducerCases.SET_NEW_USER:
        console.log("ssNewUserInfo",{userInfo: action.userInfo})
        return{
            ...state,
            newUser:action.newUser,
        }
      default:
        return state;
    }
  };
  
  export default reducer;