import React from "react";

export default function Paginado({ dogsPorPag, allDogs, paginado, key }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPorPag); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li className="paginado" key={number}>
            <a
              onClick={() => {
                paginado(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
