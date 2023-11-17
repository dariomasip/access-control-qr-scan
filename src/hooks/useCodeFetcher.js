import { useState, useEffect } from "react";

const useCodeFetcher = (
  codeType,
  currentConcertData,
  fetchDataSocket,
  hasUpdatedData
) => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentConcertData) {
      return;
    }
    // Verificar si hay información en el localStorage y el currentConcert es el mismo
    const isStoredDataValid =
      localStorage.getItem(`${codeType}Codes`) &&
      currentConcertData &&
      currentConcertData ===
        JSON.parse(localStorage.getItem("currentConcert")) &&
      !hasUpdatedData;

    if (isStoredDataValid) {
      // Utilizar datos almacenados en localStorage
      setCodes(JSON.parse(localStorage.getItem(`${codeType}Codes`)));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        let currentConcert =
          // Use the provided currentConcert, if available
          currentConcertData ||
          JSON.parse(localStorage.getItem("currentConcert"));

        // Check if currentConcert is null or undefined before making the fetch
        if (!currentConcert) {
          throw new Error("Current concert is null or undefined.");
        }

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/${codeType}/${currentConcert}`,
          {
            headers: {
              authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los códigos");
        }

        const json = await response.json();
        setCodes(json[codeType + "Codes"]);
        localStorage.setItem(
          `${codeType}Codes`,
          JSON.stringify(json[codeType + "Codes"])
        );
      } catch (error) {
        setError([
          [`Falló al obtener los códigos (${codeType})`, error.message],
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [codeType, currentConcertData, fetchDataSocket, hasUpdatedData]);

  return { codes, loading, error };
};

export default useCodeFetcher;
