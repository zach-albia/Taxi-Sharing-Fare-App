import actionTypes from "./actionTypes";

export const exampleInitialState = {
  appBarTitle: ""
};

export default function(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_APPBAR_TITLE:
      return {
        ...state,
        ...{ appBarTitle: action.payload }
      };
    default:
      return state;
  }
}
