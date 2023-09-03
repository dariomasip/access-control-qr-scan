import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Scanner from "./pages/Scanner";
import ScanResult from "./pages/ScanResult";
import Activity from "./pages/Activity";

function App() {
  const [result, setResult] = useState("PV-PBYN66");
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
    console.count(fetchValidCodes);
    console.count(fetchRegistrationCodes);
    fetchValidCodes("64effa691db394b49e4685f6");
    fetchRegistrationCodes("64effa691db394b49e4685f6");
  }, []);

  useEffect(() => {
    if (toScan) {
      console.count(fetchValidCodes);
      console.count(fetchRegistrationCodes);
      fetchValidCodes("64effa691db394b49e4685f6");
      fetchRegistrationCodes("64effa691db394b49e4685f6");
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
