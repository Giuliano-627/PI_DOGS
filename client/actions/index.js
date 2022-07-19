import axios from "axios";

export function getDoggys() {
  return async (dispatch) => {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_Dogs",
      payload: json.data,
    });
  };
}
