import React from "react";
import "./Stats.css";
import useValidUserRanking from "../hooks/useValidUserRanking";

const Stats = ({ recordsCodes, validCodes }) => {
  const validUserRanking = useValidUserRanking(recordsCodes, validCodes);
  console.log(
    "🚀 ~ file: Stats.jsx:7 ~ Stats ~ validUserRanking:",
    validUserRanking
  );

  return (
    <div className="stats-contenedor">
      <div>
        <ul className="stats-contenedor__ranking">
          {validUserRanking.map((item, key) => (
            <li className="stats-contenedor__ranking__item" key={key}>
              <div className="number__position">{key + 1}°</div>
              <div className="stats-contenedor__ranking__item__info">
                <div className="stats-contenedor__ranking__item__info__user">
                  {item[0]}
                </div>
                <div className="stats-contenedor__ranking__item__info__codes">
                  {item[2]} códigos registrados / {item[1]} códigos asignados
                </div>
              </div>
              <div className="efectividad">
                {Math.round((item[2] / item[1]) * 100)}%
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stats;
