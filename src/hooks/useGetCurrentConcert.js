const getCurrentConcert = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/concerts/get-next`,
      {
        headers: {
          authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    const json = await response.json();

    const idConcert = json._id ?? null;
    const dateConcert = json.date ?? null;
    const locationConcert = json.location ?? null;
    const localConcert = JSON.parse(localStorage.getItem("currentConcert"));

    if (json._id !== localConcert) {
      localStorage.setItem("currentConcert", JSON.stringify(json._id));
      localStorage.setItem("CurrentConcertDate", JSON.stringify(json.date));
      localStorage.setItem(
        "CurrentConcertLocation",
        JSON.stringify(json.location)
      );
    }

    return { idConcert, dateConcert, locationConcert };
  } catch (error) {
    console.error("Error fetching current concert:", error);
    throw error; // Puedes manejar el error aquí o dejar que se propague
  }
};

export { getCurrentConcert };
