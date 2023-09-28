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
      fetchValidCodes(currentConcert);
      fetchRegistrationCodes(currentConcert);
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

  const [currentConcert, setCurrentConcert] = useState();
  const [currentUpdatedAt, setCurrentUpdatedAt] = useState();
  const [result, setResult] = useState("");
  const [validCodes, setValidCodes] = useState([]);
  const [recordsCodes, setRecordsCodes] = useState([]);
  const [toScan, setToScan] = useState(false);

  const fetchValidCodes = (currentConcert) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/valid/${
        currentConcert
          ? currentConcert
          : JSON.parse(localStorage.getItem("currentConcert"))
      }`,
      {
        headers: {
          authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setValidCodes(json.validationCodes);
        localStorage.setItem(
          "validationCodes",
          JSON.stringify(json.validationCodes)
        );
      });
  };

  const fetchRegistrationCodes = (currentConcert) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/registration/${
        currentConcert
          ? currentConcert
          : JSON.parse(localStorage.getItem("currentConcert"))
      }`,
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

  const fetchUpdatedAt = (currentConcert) => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/concerts/update-at/${currentConcert}`,
      {
        headers: {
          authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setCurrentUpdatedAt(json.updateAt);

        const localUpdatedAt = JSON.parse(localStorage.getItem("updatedAt"));
        if (json.updateAt !== localUpdatedAt) {
          fetchRegistrationCodes(currentConcert);
          fetchValidCodes(currentConcert);
          localStorage.setItem("updatedAt", JSON.stringify(json.updateAt));
        }
      });
  };

  const updateDataNextConcert = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1.0/concerts/get-next`, {
      headers: {
        authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCurrentConcert(json._id);
        const localConcert = JSON.parse(localStorage.getItem("currentConcert"));

        if (json._id !== localConcert) {
          fetchValidCodes(json._id);
          fetchRegistrationCodes(json._id);
          localStorage.setItem("currentConcert", JSON.stringify(json._id));
        }
      });
  };

  useEffect(() => {
    updateDataNextConcert();
  }, []);

  useEffect(() => {
    if (currentConcert) {
      fetchUpdatedAt(currentConcert);
    }
  }, [currentConcert]);

  useEffect(() => {
    const isStoraged = {
      registrationCodes: localStorage.getItem("registrationCodes"),
      validCodes: localStorage.getItem("validationCodes"),
    };
    if (
      !(isStoraged.registrationCodes && isStoraged.validCodes) &&
      currentConcert
    ) {
      fetchValidCodes(currentConcert);
      fetchRegistrationCodes(currentConcert);
    } else {
      setRecordsCodes(JSON.parse(isStoraged.registrationCodes));
      setValidCodes(JSON.parse(isStoraged.validCodes));
    }
  }, [currentConcert]);

  useEffect(() => {
    const isStoraged = {
      registrationCodes: localStorage.getItem("registrationCodes"),
      validCodes: localStorage.getItem("validationCodes"),
    };

    if (toScan && !(isStoraged.registrationCodes && isStoraged.validCodes)) {
      fetchValidCodes(currentConcert);
      fetchRegistrationCodes(currentConcert);
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
                currentConcert={currentConcert}
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
