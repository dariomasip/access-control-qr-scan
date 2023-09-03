import React, { useEffect, useState } from "react";
import "./Home.css";
import moment from "moment/moment";

const Home = ({ validCodes, recordsCodes }) => {
  const [validCodesRecords, setValidCodesRecords] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const v = recordsCodes.filter((item) => item.status === "valid");
    setValidCodesRecords(v);

    const statsPV = recordsCodes.filter(
      (item) => item.status === "valid" && item.type === "Palco VIP"
    );

    const statsM = recordsCodes.filter(
      (item) => item.status === "valid" && item.type === "Mujer"
    );

    const statsH = recordsCodes.filter(
      (item) => item.status === "valid" && item.type === "Hombre"
    );

    setStats([
      {
        type: "Palco VIP",
        cantidad: statsPV.length,
      },
      {
        type: "Mujer",
        cantidad: statsM.length,
      },
      {
        type: "Hombre",
        cantidad: statsH.length,
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
              {Math.floor((validCodesRecords.length / validCodes.length) * 100)}
              %
            </span>
          </div>
        </div>
        <h1>
          <strong>
            {validCodesRecords.length} / {validCodes.length}
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
              {Math.round((item.cantidad / validCodesRecords.length) * 100)}%)
            </h2>
          </div>
        ))}
      </div>
      <div className="home-contenedor__activity foreground-contenedor">
        <div className="home-contenedor__activity__header">
          <h3 className="home-contenedor__activity__header__title">
            Última actividad
          </h3>
          <span className="home-contenedor__activity__header__action">
            VER TODO
          </span>
        </div>
        <div className="home-contenedor__activity__items">
          {recordsCodes.length > 0 ? (
            recordsCodes
              .map((item, key) => (
                <div
                  key={key}
                  className="home-contenedor__activity__items__item">
                  <div>
                    <p className="home-contenedor__activity__items__item__leyend">
                      Se escaneó el código{" "}
                      <span style={{ color: "#E0BE38" }}>{item.code}</span>
                      <br />
                      <small className="home-contenedor__activity__items__item__reason">
                        {item.reason === "code_not_found" &&
                          "El código no existe."}
                        {item.reason === "code_already_scanned" &&
                          "El código ya fue escaneado antes."}
                        {item.reason === "overtime" &&
                          "Escaneado fuera de la hora estipulada."}
                      </small>
                    </p>
                  </div>
                  <div>
                    <p className="home-contenedor__activity__items__item__info">
                      <span
                        style={
                          item.status === "valid"
                            ? { color: "#5AA55D" }
                            : { color: "#C94545" }
                        }>
                        {item.status === "valid" ? "Válido" : "Inválido"}
                      </span>{" "}
                      • <span>{item.type}</span> •{" "}
                      <span>
                        {moment(item.validatedAt).format("D/MM HH:mm")}
                      </span>
                    </p>
                  </div>
                </div>
              ))
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
