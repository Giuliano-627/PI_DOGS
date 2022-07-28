import axios from "axios";

export function getDoggys() {
  return async (dispatch) => {
    var json = await axios.get("http://localhost:3001/dogs");
    const temperaments = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_Dogs",
      payload: json.data,
      temperaments: temperaments.data,
    });
  };
}

export function filterDogsByTemp(payload){
  return{
    type: "FILTER_BY_TEMPERAMENTS",
    payload
  }
}

export function filterCreated(payload){
  return {
    type: "FILTER_CREATED",
    payload
  }
}

export function orderByName(payload){
  return {
    type: "FILTER_BY_AtoZ",
    payload
  }
}
