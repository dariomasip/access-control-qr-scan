import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ currentConcert, isLoading, loadingMessage, errors }) => {
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    setCurrentDate(currentConcert?.dateConcert);
  }, [currentConcert]);

  useEffect(() => {
    let storedDate = localStorage.getItem("CurrentConcertDate");

    if (storedDate !== null) {
      storedDate = JSON.parse(storedDate);
    } else {
      console.log("La clave 'CurrentConcertDate' no existe en localStorage");
    }

    if (storedDate) {
      // Intenta crear el objeto Date solo si storedDate no es null o undefined
      const dateObject = new Date(storedDate);

      // Verifica si dateObject es un objeto de fecha válido
      if (!isNaN(dateObject.getTime())) {
        setCurrentDate(dateObject);
      } else {
        console.error("Fecha almacenada en formato no válido:", storedDate);
      }
    }
  }, [currentConcert]);

  const opcionesDeFormato = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formatoFecha = new Intl.DateTimeFormat("es-ES", opcionesDeFormato);

  return (
    <header>
      <div className={`contenedor-header ${errors.length > 0 && "error"}`}>
        {!isLoading && !(errors.length > 0) && (
          <div className="contenedor-header__currentDate">
            {currentDate && formatoFecha.format(currentDate)} •{" "}
            {currentConcert?.locationConcert}
          </div>
        )}
        {errors.length > 0 && (
          <div className="contenedor-header__error">
            <p className="contenedor-header__error__count">{errors.length}</p>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>
                  <p>{error[0]}</p>
                  <em>{error[1]}</em>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && !(errors.length > 0) && <p>{loadingMessage}</p>}
      </div>
    </header>
  );
};

export default Header;
