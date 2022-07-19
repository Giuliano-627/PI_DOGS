import React from "react";

export default function Card({name, image, weight, temp}){
return(
    <div>
        <h3>{name}</h3>
        <h5>Peso: {weight}</h5>
        <h5>Temperamento: {temp}</h5>
        <img src={image} alt="no hay imagen del doggy solicitado" width="200px" height="250px"/>
    </div>
)
}