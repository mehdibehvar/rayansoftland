import { createContext, useReducer } from 'react';
import { getItem } from '../utils/storage.service';

export const authContext = createContext();
const initialAuthState = {
  loading: false,
  email:getItem("email")?JSON.parse(getItem("email")):null,
  error: null,
};
export const actionType = {
  login_request: 'LOGIN-REQUEST',
  login_success: 'LOGIN-SUCCESS',
  login_error: 'LOGIN-ERROR',
  logout: 'LOGOUT'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionType.login_request:
      return {
        ...state,
        loading:true
      };
    case actionType.login_success:
      return {
        ...state,
        loading:false,
        email:action.payload.email,
      };
case actionType.login_error:
    return{
        ...state,
        error:action.payload.error,
        loading:false,
    }
case actionType.logout:
    return{
        ...state,
       email:null
    }
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const value = { state, dispatch };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
