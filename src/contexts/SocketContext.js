import React, { createContext, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  // Configura la instancia de Socket.IO con la URL de tu servidor Socket.IO
  const socket = io(`${process.env.REACT_APP_BASE_URL}`); // Reemplaza con tu URL

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
