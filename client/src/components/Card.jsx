import React from "react";
import { Link } from "react-router-dom";
export default function Card({ name, image, weight, temp, id }) {
  return (
    <div key={id}>
      <Link to={"/home/" + id}>
        <img
          src={image}
          alt="no hay imagen del doggy solicitado"
          width="200px"
          height="250px"
        />
      </Link>
      <h3>{name}</h3>
      <h5>Peso: {weight}</h5>
      <h5>Temperamento: {temp}</h5>
      <h6>Click en la img para mas informacion</h6>
    </div>
  );
}
