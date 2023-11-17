import { useEffect, useState } from "react";
import { useSocket } from "./contexts/SocketContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Header from "./components/Header/Header";
import Scanner from "./pages/Scanner";
import ScanResult from "./pages/ScanResult";
import Activity from "./pages/Activity";
import { getCurrentConcert } from "./hooks/useGetCurrentConcert";
import useCodeFetcher from "./hooks/useCodeFetcher";
import useUpdateAtFetcher from "./hooks/useUpdateAtFetcher";

function App() {
  const socket = useSocket();

  const [currentConcert, setCurrentConcert] = useState();
  const [result, setResult] = useState("");
  const [validCodes, setValidCodes] = useState([]);
  const [recordsCodes, setRecordsCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Cargando...");
  const [errors, setErrors] = useState([]);
  const [fetchDataSocket, setFetchDataSocket] = useState(false);
  const [hasUpdatedData, setHasUpdatedData] = useState(false);

  const updateAtInfo = useUpdateAtFetcher(
    currentConcert?.idConcert,
    setHasUpdatedData
  );

  useEffect(() => {
    // Maneja eventos o acciones cuando se conecta al servidor
    socket.on("connect", () => {
      console.log("Conectado al servidor Socket.IO");
    });

    socket.on("fetch_data", () => {
      setFetchDataSocket(!fetchDataSocket);
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

  const fetchCurrentConcert = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage("Obteniendo el concierto actual...");
      const concertData = await getCurrentConcert();
      setCurrentConcert(concertData);
    } catch (error) {
      console.error("Error fetching current concert:", error);
      setErrors((prevErrors) => [
        ...prevErrors,
        ["Falló al intentar obtener el concierto actual.", error.message],
      ]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCurrentConcert();
  }, []);

  const {
    codes: registrationCodes,
    loading: registrationLoading,
    error: registrationError,
  } = useCodeFetcher(
    "registration",
    currentConcert?.idConcert,
    fetchDataSocket,
    hasUpdatedData
  );

  const {
    codes: validationCodes,
    loading: validationLoading,
    error: validationError,
  } = useCodeFetcher(
    "validation",
    currentConcert?.idConcert,
    fetchDataSocket,
    hasUpdatedData
  );

  useEffect(() => {
    if (updateAtInfo.loading) {
      if (isLoading) {
        setTimeout(() => {
          setIsLoading(updateAtInfo.loading);
          setLoadingMessage("Buscando una actualización de datos...");
        }, 2000);
      } else {
        setTimeout(() => {
          setIsLoading(updateAtInfo.loading);
          setLoadingMessage("Buscando una actualización de datos...");
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage("");
      }, 2000);
    }

    if (updateAtInfo.error) {
      // Manejar errores
      const updatedAtErrors = updateAtInfo.error || [];

      // Agregar errores al array de errores
      setErrors((prevErrors) => [...prevErrors, updatedAtErrors]);
    }
  }, [updateAtInfo.loading, updateAtInfo.error]);

  useEffect(() => {
    // Actualizar isLoading cuando registrationLoading o validationLoading cambien
    if (currentConcert && (registrationLoading || validationLoading)) {
      setIsLoading(registrationLoading || validationLoading);
      setLoadingMessage("Obteniendo códigos...");
    } else {
      setTimeout(() => {
        setLoadingMessage("");
        setIsLoading(false);
      }, 1000);
    }

    // Manejar errores
    const registrationErrors = registrationError || [];
    const validationErrors = validationError || [];

    // Agregar errores al array de errores
    setErrors([...registrationErrors, ...validationErrors]);

    if (validationCodes && registrationCodes) {
      setRecordsCodes(registrationCodes);
      setValidCodes(validationCodes);
    }
  }, [
    registrationLoading,
    validationLoading,
    validationCodes,
    registrationCodes,
    updateAtInfo.hasUpdate,
    validationError,
    registrationError,
    currentConcert,
  ]);

  return (
    <>
      <BrowserRouter>
        <Header
          currentConcert={currentConcert}
          isLoading={isLoading}
          loadingMessage={loadingMessage}
          errors={errors}
        />
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
                setRecordsCodes={setRecordsCodes}
                socket={socket}
                currentConcert={currentConcert?.idConcert}
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
