const initialState = {
  dogs: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_Dogs":
      return {
        ...state,
        dogs: action.payload,
        temperaments: action.temperaments,
      };
    default:
      return state;
  }
}

export default rootReducer;
