import { useEffect, useState } from "react";
import { useSocket } from "./contexts/SocketContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Scanner from "./pages/Scanner";
import ScanResult from "./pages/ScanResult";
import Activity from "./pages/Activity";

function App() {
  const socket = useSocket();

  useEffect(() => {
    // Maneja eventos o acciones cuando se conecta al servidor
    socket.on("connect", () => {
      console.log("Conectado al servidor Socket.IO");
    });

    socket.on("fetch_data", () => {
      fetchValidCodes("650db5f8b724d3def45c1f6b");
      fetchRegistrationCodes("650db5f8b724d3def45c1f6b");
    });

    // Maneja eventos cuando se desconecta del servidor
    socket.on("disconnect", () => {
      console.log("Desconectado del servidor Socket.IO");
    });

    // Importante: asegúrate de cerrar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const [result, setResult] = useState("");
  const [validCodes, setValidCodes] = useState([]);
  const [recordsCodes, setRecordsCodes] = useState([]);
  const [toScan, setToScan] = useState(false);

  const fetchValidCodes = (code) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/valid/${code}`, {
      headers: {
        authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setValidCodes(json.validationCodes);
        localStorage.setItem(
          "validationCodes",
          JSON.stringify(json.validationCodes)
        );
      });
  };

  const fetchRegistrationCodes = (code) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/registration/${code}`,
      {
        headers: {
          authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setRecordsCodes(json.registrationCodes);
        localStorage.setItem(
          "registrationCodes",
          JSON.stringify(json.registrationCodes)
        );
      });
  };

  useEffect(() => {
    const isStoraged = {
      registrationCodes: localStorage.getItem("registrationCodes"),
      validCodes: localStorage.getItem("validationCodes"),
    };
    if (!(isStoraged.registrationCodes && isStoraged.validCodes)) {
      fetchValidCodes("650db5f8b724d3def45c1f6b");
      fetchRegistrationCodes("650db5f8b724d3def45c1f6b");
    } else {
      setRecordsCodes(JSON.parse(isStoraged.registrationCodes));
      setValidCodes(JSON.parse(isStoraged.validCodes));
    }
  }, []);

  useEffect(() => {
    const isStoraged = {
      registrationCodes: localStorage.getItem("registrationCodes"),
      validCodes: localStorage.getItem("validationCodes"),
    };

    if (toScan && !(isStoraged.registrationCodes && isStoraged.validCodes)) {
      fetchValidCodes("650db5f8b724d3def45c1f6b");
      fetchRegistrationCodes("650db5f8b724d3def45c1f6b");
    }
  }, [toScan]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home recordsCodes={recordsCodes} validCodes={validCodes} />
            }></Route>
          <Route
            exact
            path="/scan"
            element={
              <Scanner setToScan={setToScan} setResult={setResult} />
            }></Route>
          <Route
            exact
            path="/scan-result"
            element={
              <ScanResult
                result={result}
                validCodes={validCodes}
                recordsCodes={recordsCodes}
                setToScan={setToScan}
                setRecordsCodes={setRecordsCodes}
                socket={socket}
              />
            }></Route>
          <Route
            exact
            path="/actividad"
            element={<Activity recordsCodes={recordsCodes} />}></Route>
        </Routes>
        <Menu setResult={setResult} />
      </BrowserRouter>
    </>
  );
}

export default App;
