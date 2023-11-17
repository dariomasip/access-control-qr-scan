import { useState, useEffect } from "react";

const useUpdateAtFetcher = (currentConcert, setHasUpdatedData) => {
  const [updateInfo, setUpdateInfo] = useState({
    currentUpdatedAt: null,
    hasUpdate: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUpdateAt = async () => {
      try {
        if (!currentConcert) {
          return;
        }

        setUpdateInfo((prevUpdateInfo) => ({
          ...prevUpdateInfo,
          loading: true,
        }));

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1.0/concerts/update-at/${currentConcert}`,
          {
            headers: {
              authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener la última actualización");
        }

        const json = await response.json();
        const localUpdatedAt = JSON.parse(localStorage.getItem("updatedAt"));

        if (json.updateAt !== localUpdatedAt) {
          setUpdateInfo({
            currentUpdatedAt: json.updateAt,
            hasUpdate: true,
            loading: false,
            error: null,
          });

          setHasUpdatedData(true);

          localStorage.setItem("updatedAt", JSON.stringify(json.updateAt));
        } else {
          setUpdateInfo({
            currentUpdatedAt: json.updateAt,
            hasUpdate: false,
            loading: false,
            error: null,
          });

          setHasUpdatedData(false);
        }
      } catch (error) {
        console.error("Error fetching updateAt:", error);
        setUpdateInfo({
          currentUpdatedAt: null,
          hasUpdate: false,
          loading: false,
          error: [
            "Falló al intentar buscar la última actualización.",
            error.message,
          ],
        });
        setHasUpdatedData(false);
      }
    };

    fetchUpdateAt();
  }, [currentConcert]);

  return updateInfo;
};

export default useUpdateAtFetcher;
