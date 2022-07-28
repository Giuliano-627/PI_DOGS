const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_Dogs":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        temperaments: action.temperaments,
      };
    case "FILTER_BY_TEMPERAMENTS":
      const allDoggys = state.allDogs;
      const perrosFiltrados =
        action.payload === "TEMPERAMENTOS"
          ? allDoggys
          : allDoggys.filter((el) => el.temperament.includes(action.payload));
      return {
        ...state,
        dogs: perrosFiltrados,
      };
    case "FILTER_CREATED": {
      const allDoggys = state.allDogs
      let createdFilter;
      if(action.payload === "all"){
        createdFilter =  state.allDogs
      } 
      else{
        createdFilter = action.payload === "fromApi" ? state.allDogs.filter(el => !el.createdInDB) : state.allDogs.filter(el => el.createdInDB) 
      }
      return{
        ...state,
        dogs: createdFilter
      } 
    }
    case "FILTER_BY_AtoZ":
      let order;
      if (action.payload === "ASCENDENT") {
        order = state.allDogs.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
      }
      if (action.payload === "DESCENDENT") {
        order = state.allDogs.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
      }

      return {
        ...state,
        dogs: order,
      };
    default:
      return state;
  }
}

export default rootReducer;
