import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoggys } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  console.log("Se entro a home");
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const auxTemps = useSelector((state) => state.temperaments);
  console.log("ALLDOGS:", allDogs);
  const allTemps = auxTemps.filter(e=>e.name!=="")
  console.log("AllTemps:", allTemps);
  const [currentPag, setCurrPag] = useState(1);
  const [dogsPorPag, setDogsPorPag] = useState(12);
  const indexOfLastDog = currentPag * dogsPorPag;
  const indexOfFirtsDog = indexOfLastDog - dogsPorPag;
  const currentDogs = allDogs.slice(indexOfFirtsDog, indexOfLastDog);

  const paginado = (pagNum) => {
    setCurrPag(pagNum);
  };

  useEffect(() => {
    dispatch(getDoggys());
  }, []);
  function handleClick(e) {
    console.log("a punto de traer los doggys desde la api");
    e.preventDefault();
    console.log("Trayendo doggys desde la api");
    dispatch(getDoggys());
    console.log("doggys traidos de la api y despachados");
  }
  console.log("Entrando al return");
  return (
    <div>
      <Link to="/dogs">Crear doggy</Link>
      <h1>Titulo de la pagina</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar todos los perros
      </button>
      <div>
        <select>
          <option value="pAsc">Peso Ascendente</option>
          <option value="pDesc">Peso Descendente</option>
        </select>
        <select>
          <option value="alfAsc">A-Z</option>
          <option value="alfDes">Z-A</option>
        </select>
        <select>
          <option value="">Temperamentos</option>
          {allTemps?.map((element) => (
            <option value={element.name} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
        <select>
          <option value="createdApi">Proveniente de la API</option>
          <option value="createdDb">Proveniente de la DB</option>
        </select>
        <Paginado 
          dogsPorPag={dogsPorPag}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        {currentDogs.map((el) => {
          return (
            <Fragment>
              <Card
                image={el.image}
                name={el.name}
                weight={`De ${el.weightMin} a ${el.weightMax} kg`}
                temp={el.temperament}
                id={el.id}
                key={el.id}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
