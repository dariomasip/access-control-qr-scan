import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ validCodes, recordsCodes }) => {
  const [validCodesQR, setValidCodesQR] = useState([]);

  useEffect(() => {
    const v = recordsCodes.filter((item) => item.status === "valid");
    setValidCodesQR(v);
  }, [recordsCodes]);

  return (
    <div className="home-contenedor">
      <div className="home-contenedor__main-content">
        <div className="home-contenedor__main-content__porcentil">
          <h3>Escaneados de generados</h3>
          <div className="home-contenedor__main-content__porcentil__value">
            <span>
              {Math.floor((validCodesQR.length / validCodes.length) * 100)}%
            </span>
          </div>
        </div>
        <h1>
          <strong>
            {validCodesQR.length} / {validCodes.length}
          </strong>
        </h1>
      </div>
    </div>
  );
};

export default Home;
