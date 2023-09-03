import React from "react";
import "./Menu.css";
import { NavLink, useLocation } from "react-router-dom";
import ItemsMenu from "../data/Menu.json";

const Menu = () => {
  const location = useLocation();

  return (
    <div className="contenedor__nav-contenedor">
      <nav className="nav-contenedor">
        {ItemsMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={item.disabled ? { opacity: ".6" } : null}
            className="nav-contenedor__nav-item">
            <img
              className="nav-contenedor__nav-item__icon"
              src={
                location.pathname === item.path
                  ? item.iconSrcActive
                  : item.iconSrc
              }
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
