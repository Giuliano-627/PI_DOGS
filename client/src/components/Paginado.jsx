import React from "react";

export default function Paginado({ dogsPorPag, allDogs, paginado }) {
  const pageNumbers = [];
  console.log("Entrando al for del paginado");
  for (let i = 1; i <= Math.ceil(allDogs / dogsPorPag); i++) {
    pageNumbers.push(i);
    console.log("Pusheando pagina", i);
  }
  console.log("pageNumbers:", pageNumbers);
  return (
      <nav>
        <ul>
          {console.log("entrando al map del paginado")}
          {pageNumbers.map((number) => {
            {console.log("listando la pagina",number)}
            <li className="paginado" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          })}
        </ul>
      </nav>
  );
}
