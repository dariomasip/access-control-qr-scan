import React from "react";
import moment from "moment/moment";

const ItemActivity = ({ recordCode }) => {
  return (
    <div className="home-contenedor__activity__items__item">
      <div>
        <p className="home-contenedor__activity__items__item__leyend">
          Se escaneó el código{" "}
          <span style={{ color: "#E0BE38" }}>{recordCode.code}</span>
          <br />
          <small className="home-contenedor__activity__items__item__reason">
            {recordCode.reason === "code_not_found" && "El código no existe."}
            {recordCode.reason === "code_already_scanned" &&
              "El código ya fue escaneado antes."}
            {recordCode.reason === "overtime" &&
              "Escaneado fuera de la hora estipulada."}
          </small>
        </p>
      </div>
      <div>
        <p className="home-contenedor__activity__items__item__info">
          <span
            style={
              recordCode.status === "valid"
                ? { color: "#5AA55D" }
                : { color: "#C94545" }
            }>
            {recordCode.status === "valid" ? "Válido" : "Inválido"}
          </span>{" "}
          • <span>{recordCode.type}</span> • <span>{recordCode.user}</span> •{" "}
          <span>{moment(recordCode.validatedAt).format("D/MM HH:mm")}</span>
        </p>
      </div>
    </div>
  );
};

export default ItemActivity;
