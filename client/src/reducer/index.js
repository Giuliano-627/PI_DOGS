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
      const perrosFiltrados = state.allDogs.filter((e) => {
        if (action.payload === "TEMPERAMENTOS") {
          return state.allDogs;
        } else if (e.temperament && e.temperament.includes(action.payload))
          return e;
      });
      return {
        ...state,
        dogs: perrosFiltrados,
      };
    case "FILTER_CREATED": {
      let createdFilter;
      createdFilter =
        action.payload === "fromApi"
          ? state.allDogs.filter((el) => !el.createdInDB)
          : state.allDogs.filter((el) => el.createdInDB);
      return {
        ...state,
        dogs: createdFilter,
      };
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
    case "FILTER_BY_Weight":
      let doggys = state.allDogs;
      //console.log("action.payload:",action.payload) --> pAsc o pDsc respectivamente
      switch (action.payload) {
        case "pMinAsc":
          doggys = state.allDogs.sort((a, b) => {
            if (a.weightMin < b.weightMin) return -1;
            if (b.weightMin < a.weightMin) return 1;
            return 0;
          });
          break;
        case "pMinDesc":
          doggys = state.allDogs.sort((a, b) => {
            if (a.weightMin > b.weightMin) return -1;
            if (b.weightMin > a.weightMin) return 1;
            return 0;
          });
          break;
        case "pMaxAsc":
          doggys = state.allDogs.sort((a, b) => {
            if (a.weightMax < b.weightMax) return -1;
            if (b.weightMax < a.weightMax) return 1;
            return 0;
          });
          break;
        case "pMaxDesc":
          doggys = state.allDogs.sort((a, b) => {
            if (a.weightMax > b.weightMax) return -1;
            if (b.weightMax > a.weightMax) return 1;
            return 0;
          });
          break;
        default:
          doggys = state.allDogs;
          break;
      }
      return {
        ...state,
        dogs: doggys,
      };
    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "POST_NEW_DOG":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
