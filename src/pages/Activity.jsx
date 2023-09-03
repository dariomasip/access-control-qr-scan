import React, { useEffect, useState } from "react";
import "./Activity.css";
import ItemActivity from "../components/ItemActivity/ItemActivity";

const Activity = ({ recordsCodes }) => {
  const [filteredRecordsCodes, setFilteredRecordsCodes] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    setFilteredRecordsCodes(recordsCodes);
  }, [recordsCodes]);

  useEffect(() => {
    if (valueSearch.length > 0) {
      const filteredResults = filteredRecordsCodes.filter((record) => {
        return record.code
          .toLowerCase()
          .replace(/ /g, "")
          .trim()
          .includes(valueSearch.toLowerCase().trim().replace(/ /g, "").trim());
      });

      setFilteredRecordsCodes(filteredResults);
    } else {
      setFilteredRecordsCodes(recordsCodes);
    }
  }, [valueSearch]);

  return (
    <div className="activity-contenedor">
      <div className="activity-contenedor__searcher">
        <input
          onChange={(e) => setValueSearch(e.target.value)}
          placeholder="Buscar"
          type="search"
          name=""
          id=""
        />
      </div>
      <div className="activity-contenedor__list">
        {filteredRecordsCodes.length > 0 ? (
          filteredRecordsCodes
            .map((item, key) => <ItemActivity recordCode={item} key={key} />)
            .reverse()
        ) : filteredRecordsCodes.length === 0 && valueSearch.length > 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#afafaf",
              alignSelf: "center",
            }}>
            Sin resultados.
          </p>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#afafaf",
              alignSelf: "center",
            }}>
            Sin actividad.
          </p>
        )}
      </div>
    </div>
  );
};

export default Activity;
