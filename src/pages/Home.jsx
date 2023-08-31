import React from "react";
import "./Home.css"

const Home = () => {
  return (
    <div className="home-contenedor">
        <div className="home-contenedor__main-content">
          <div className="home-contenedor__main-content__porcentil">
            <h3>Escaneados de generados</h3>
            <div className="home-contenedor__main-content__porcentil__value">
              <span>30%</span>
            </div>
          </div>
            <h1><strong>40 / 600</strong></h1>
      </div>
    </div>
  );
};

export default Home;
