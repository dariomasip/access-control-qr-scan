import React from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import ItemsMenu from "../data/Menu.json";

const Menu = () => {
  return (
    <div className="contenedor__nav-contenedor">
      <nav className="nav-contenedor">
        {ItemsMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="nav-contenedor__nav-item">
            <img
              className="nav-contenedor__nav-item__icon"
              src={item.iconSrc}
              alt="NAV"
            />
            {!(item.name === "Escanear") && (
              <span className="nav-contenedor__nav-item__leyend">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Menu;
