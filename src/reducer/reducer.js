import * as actionTypes from "../actionTypes/actionTypes";

const initState = {
  profileData: {},
  value: 'select',
};

export default (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.CREATE_PROFILE:
      return {...state, profileData: action.profileData};
    case actionTypes.SUBMIT_DATA:
      return {...state, value: action.value};
    default:
      return state;
  }
}
