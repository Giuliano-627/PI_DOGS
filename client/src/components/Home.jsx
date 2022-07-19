import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoggys } from "../../actions";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    dispatch(getDoggys());
  }, []);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDoggys());
  }
  return (
    <div>
      <link to="/dogs">Crear doggy</link>
      <h1>Titulo de la pagina</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar todos los perros
      </button>
      <div>
        <Select>
          <option value="pAsc">Peso Ascendente</option>
          <option value="pDesc">Peso Descendente</option>
        </Select>
        <Select>
            <option value="alfAsc">A-Z</option>
            <option value="alfDes">Z-A</option>
        </Select>
        <Select>
            <option value="temp1">t1</option>
            <option value="temp2">t2</option>
        </Select>
        <Select>
            <option value="createdApi">Proveniente de la API</option>
            <option value="createdDb">Proveniente de la DB</option>
        </Select>
      </div>
    </div>
  );
}
