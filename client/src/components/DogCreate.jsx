import React from "react";
import { useState, useEffect } from "react";
import { getTemperaments, postDog } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory()
  const temperaments = useSelector((state) => state.temperaments);
  const [input, setInput] = useState({
    name: "",
    heightMax: "",
    heightMin: "",
    weightMax: "",
    weightMin: "",
    temperament: [],
    createdInDB:true
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Doggy creado");
    setInput({
      name: "",
      heightMax: "",
      heightMin: "",
      weightMax: "",
      weightMin: "",
      temperament: [],
    });
    history.push("/home")
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear nueva raza</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Peso Maximo:</label>
          <input
            type="number"
            value={input.weightMax}
            name="weightMax"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Peso Minimo:</label>
          <input
            type="number"
            value={input.weightMin}
            name="weightMin"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Altura Maxima:</label>
          <input
            type="number"
            value={input.heightMax}
            name="heightMax"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Altura Minima:</label>
          <input
            type="number"
            value={input.heightMin}
            name="heightMin"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Imagen:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temperamentos:</label>
          <select onChange={(e) => handleSelect(e)}>
            <option value="disabled">Temperamentos:</option>
            {temperaments.map((temp) => (
              <option required value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          <ul>
            <li>{input.temperament.map((el) => el + " ,")}</li>
          </ul>
          <button type="submit">Crear Raza Nueva</button>
        </div>
      </form>
    </div>
  );
}
