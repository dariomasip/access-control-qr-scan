import React, { useEffect, useState } from "react";
import "./Home.css";
import ItemActivity from "../components/ItemActivity/ItemActivity";
import { Link } from "react-router-dom";
import { getStats } from "../utils/getStats";

const Home = ({ validCodes, recordsCodes }) => {
  const [validCodesRecords, setValidCodesRecords] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectorStat, setSelectorStat] = useState("type");

  useEffect(() => {
    const v = recordsCodes?.filter((item) => item.status === "valid");
    setValidCodesRecords(v);

    // Calcular estadísticas usando getUniqueValues
    const statsTest = getStats(validCodes, recordsCodes, ["type", "user"]);
    setStats(statsTest);
  }, [recordsCodes, validCodes]);

  return (
    <div className="home-contenedor">
      <div className="home-contenedor__main-content foreground-contenedor">
        <div className="home-contenedor__main-content__porcentil">
          <h3 className="home-contenedor__main-content__porcentil__title">
            Escaneados de generados
          </h3>
          <div className="home-contenedor__main-content__porcentil__value">
            <span>
              {Math.round(
                (validCodesRecords?.length / validCodes?.length) * 100
              )}
              %
            </span>
          </div>
        </div>
        <h1>
          <strong>
            {validCodesRecords?.length} / {validCodes?.length}
          </strong>
        </h1>
      </div>
      <div className="home-contenedor__stats__header">
        <h2>Estadísticas</h2>
        <Link
          to="/estadisticas"
          className="home-contenedor__activity__header__action">
          VER TODO
        </Link>
      </div>
      <div className="home-contenedor__stats__selector">
        <ul className="home-contenedor__stats__selector__items">
          <li
            className={`home-contenedor__stats__selector__items__item ${
              selectorStat === "type" && "active"
            }`}
            onClick={() => setSelectorStat("type")}>
            Tipo
          </li>
          <li
            className={`home-contenedor__stats__selector__items__item ${
              selectorStat === "user" && "active"
            }`}
            onClick={() => setSelectorStat("user")}>
            Usuario
          </li>
        </ul>
      </div>
      <div className="home-contenedor__stats">
        <div className="home-contenedor__stats__content">
          {stats?.[selectorStat]?.map((item, key) => (
            <div
              key={key}
              className="home-contenedor__stats__item foreground-contenedor">
              <span>{item.type || item.user}</span>
              <h2>
                {item.count} (
                {Math.round((item.count / validCodesRecords?.length) * 100)}
                %)
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="home-contenedor__activity foreground-contenedor">
        <div className="home-contenedor__activity__header">
          <h3 className="home-contenedor__activity__header__title">
            Última actividad
          </h3>
          <Link
            to="/actividad"
            className="home-contenedor__activity__header__action">
            VER TODO
          </Link>
        </div>
        <div className="home-contenedor__activity__items">
          {recordsCodes?.length > 0 ? (
            recordsCodes
              .map((item, key) => <ItemActivity recordCode={item} key={key} />)
              .reverse()
              .slice(0, 5)
          ) : (
            <p
              style={{
                textAlign: "center",
                padding: "2.5rem 0",
                color: "#afafaf",
              }}>
              No hay movimientos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
