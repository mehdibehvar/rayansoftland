import { createContext, useReducer } from 'react';


export const settingContext = createContext();
const initialSettingState = {
  direction: "ltr",

};
export const settingActionType = {
  toggle_direction: 'TOGGLE-DIRECTION',

};

const settingReducer = (state, action) => {
  switch (action.type) {
    case settingActionType.toggle_direction:
      console.log(action.payload);
      return {
        ...state,
        direction:action.payload
      }

    default:
      return state;
  }
};

const SettingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingReducer, initialSettingState);
  const value = { state, dispatch };
  return <settingContext.Provider value={value}>{children}</settingContext.Provider>;
};

export default SettingProvider;
