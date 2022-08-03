import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoggys } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import { filterDogsByTemp } from "../actions/index";
import { orderByName } from "../actions/index";
import { filterCreated } from "../actions/index";
import { orderByWeight } from "../actions/index";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const auxTemps = useSelector((state) => state.temperaments);
  const allTemps = auxTemps.filter((e) => e.name !== "");
  const [currentPag, setCurrPag] = useState(1);
  const [dogsPorPag, setDogsPorPag] = useState(12);
  const indexOfLastDog = currentPag * dogsPorPag;
  const indexOfFirtsDog = indexOfLastDog - dogsPorPag;
  const currentDogs = allDogs.slice(indexOfFirtsDog, indexOfLastDog);
  const [order, setOrder] = useState("");

  const paginado = (pagNum) => {
    setCurrPag(pagNum);
  };

  useEffect(() => {
    dispatch(getDoggys());
  }, [dispatch]);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDoggys());
  }
  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsByTemp(e.target.value));
    setCurrPag(1);
    setOrder(e.target.value);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    //dispatch(getDoggys());
    dispatch(filterCreated(e.target.value));
    setCurrPag(1);
    setOrder(e.target.value);
  }
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrPag(1);
    setOrder(e.target.value);
  }
  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrPag(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <Link to="/createDog">Crear doggy</Link>
      <h1>Titulo de la pagina</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar todos los perros
      </button>
      <div>
      <select onChange={(e) => handleOrderByWeight(e)}>
          <option value="pUnordered">Ordenar por peso</option>
          <option value="pMinAsc">Peso Minimo Ascendente</option>
          <option value="pMinDesc">Peso Minimo Descendente</option>
          <option value="pMaxAsc">Peso Maximo Ascendente</option>
          <option value="pMaxDesc">Peso Maximo Descendente</option>
        </select>
        <select onChange={(e) => handleOrderByName(e)}>
          <option value={"ASCENDENT"}>A to Z</option>
          <option value={"DESCENDENT"}>Z to A</option>
        </select>
        <select onChange={(e) => handleFilterTemperament(e)}>
          <option value="TEMPERAMENTOS">Temperamentos</option>
          {allTemps?.map((element) => (
            <option value={element.name} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="fromApi">Proveniente de la API</option>
          <option value="fromDB">Proveniente de la DB</option>
        </select>
        <Paginado
          dogsPorPag={dogsPorPag}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <SearchBar/>
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
                createdInDB={el.createdInDB}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
