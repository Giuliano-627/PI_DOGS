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

export function filterDogsByTemp(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "FILTER_BY_AtoZ",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "FILTER_BY_Weight",
    payload,
  };
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_DOGS_NAME",
        payload: json.data,
      });
    } catch (error) {
      alert("Hubo un error de busqueda:", error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: res.data,
    });
  };
}

export function postDog(payload) {
  return async function () {
    const resp = await axios.post("http://localhost:3001/dogs", payload);
    console.log("RESPUESTA DEL POST",resp)
    return resp;
  };
}
