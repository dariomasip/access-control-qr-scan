import React, { useEffect, useState } from "react";
import "./Home.css";
import ItemActivity from "../components/ItemActivity/ItemActivity";
import { Link } from "react-router-dom";

const Home = ({ validCodes, recordsCodes }) => {
  const [validCodesRecords, setValidCodesRecords] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const v = recordsCodes?.filter((item) => item.status === "valid");
    setValidCodesRecords(v);

    const statsM = recordsCodes?.filter(
      (item) => item.status === "valid" && item.type === "Mujer"
    );

    const statsH = recordsCodes?.filter(
      (item) => item.status === "valid" && item.type === "Hombre"
    );

    const statsX5 = recordsCodes?.filter(
      (item) => item.status === "valid" && item.type === "Invitación X5"
    );

    const statsX10 = recordsCodes?.filter(
      (item) => item.status === "valid" && item.type === "Invitación X10"
    );

    const statsGlenda = recordsCodes?.filter(
      (item) => item.status === "valid" && item.user === "Glenda Roque"
    );

    const statsFabio = recordsCodes?.filter(
      (item) => item.status === "valid" && item.user === "Fabio Gomez"
    );

    const statsRomina = recordsCodes?.filter(
      (item) => item.status === "valid" && item.user === "Romina Roque"
    );
    const statsCarla = recordsCodes?.filter(
      (item) => item.status === "valid" && item.user === "Carla Gomez"
    );
    const statsLeandro = recordsCodes?.filter(
      (item) => item.status === "valid" && item.user === "Leandro De Yulis"
    );

    setStats([
      {
        type: "Mujer",
        cantidad: statsM?.length,
      },
      {
        type: "Hombre",
        cantidad: statsH?.length,
      },
      {
        type: "Invitación X5",
        cantidad: statsX5?.length,
      },
      {
        type: "Invitación X10",
        cantidad: statsX10?.length,
      },
      {
        type: "Glenda Perez",
        cantidad: statsGlenda?.length,
      },
      {
        type: "Fabio Gomez",
        cantidad: statsFabio?.length,
      },
      {
        type: "Romina Roque",
        cantidad: statsRomina?.length,
      },
      {
        type: "Carla Gomez",
        cantidad: statsCarla?.length,
      },
      {
        type: "Leandro De Yulis",
        cantidad: statsLeandro?.length,
      },
    ]);
  }, [recordsCodes]);

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
      <div className="home-contenedor__stats">
        {stats.map((item, key) => (
          <div
            key={key}
            className="home-contenedor__stats__item foreground-contenedor">
            <span>{item.type}</span>
            <h2>
              {item.cantidad} (
              {Math.round((item.cantidad / validCodesRecords?.length) * 100)}
              %)
            </h2>
          </div>
        ))}
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
