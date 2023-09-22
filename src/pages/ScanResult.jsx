import React, { useEffect, useState } from "react";
import "./ScanResult.css";

const ScanResult = ({
  result,
  validCodes,
  recordsCodes,
  setToScan,
  setRecordsCodes,
  socket,
}) => {
  const [validationCode, setValidationCode] = useState([{}]);
  const [isValidCode, setValidCode] = useState(null);
  const [codeScanned, setCodeScanned] = useState();

  useEffect(() => {
    console.log("🚀 ~ file: ScanResult.jsx:12 ~ socket:", socket);
    setToScan(false);

    const isValidCode = validCodes.find((item) => item.code === result);
    setCodeScanned(isValidCode);
    const isUniqueCode = recordsCodes.some(
      (item) => item.code === result && item?.reason !== "code_not_found"
    );

    const newValidationCode = [
      { type: "valid", validated: isValidCode },
      { type: "unique", validated: !isUniqueCode },
    ];

    const validCode = newValidationCode.every((item) => item.validated);

    setValidationCode(newValidationCode);
    setValidCode(validCode);

    let reason;
    for (const iterator of newValidationCode) {
      if (!iterator.validated) {
        switch (iterator.type) {
          case "valid":
            reason = "code_not_found";
            break;

          case "inAnHour":
            reason = "overtime";
            break;

          case "unique":
            reason = "code_already_scanned";
            break;

          default:
            break;
        }
      }
    }

    const newRecordCode = {
      code: result,
      status: validCode ? "valid" : "invalid",
      type: isValidCode?.type,
      validatedAt: new Date(),
      reason: reason || null,
    };

    const jsonData = JSON.stringify(newRecordCode);

    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1.0/codes/add-record/650db5f8b724d3def45c1f6b`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
        },
        body: jsonData,
      }
    ).then(() => {
      const registrationCodesLocalStorage =
        localStorage.getItem("registrationCodes");

      const newRecordLocalStorage = [
        ...JSON.parse(registrationCodesLocalStorage),
        newRecordCode,
      ];

      setRecordsCodes(newRecordLocalStorage);

      localStorage.setItem(
        "registrationCodes",
        JSON.stringify(newRecordLocalStorage)
      );

      socket.emit("record_code", "Código escaneado.");
    });
  }, [result]);

  return (
    <>
      {isValidCode === null ? null : (
        <div className="result-contenedor">
          <div className="result-contenedor__main">
            <div className="result-contenedor__main__text">
              <code className="result-contenedor__main__code">{result}</code>
              <img
                width={"30rem"}
                src={
                  isValidCode ? "/icons/check_circle.svg" : "/icons/cancel.svg"
                }
                alt=""
              />
              <span style={{ color: "#cacaca" }}>{codeScanned?.type}</span>
            </div>
            <h4
              style={isValidCode ? { color: "#5AA55D" } : { color: "#C94545" }}
              className="result-contenedor__main__status">
              {isValidCode ? "Válido" : "Inválido"}
            </h4>
            <div className="result-contenedor__main__passed">
              <ul className="result-contenedor__main__passed__list">
                {validationCode.map((item, index) =>
                  item.validated ? (
                    <li
                      key={index}
                      className="result-contenedor__main__passed__list__item">
                      <span>
                        <img
                          width={"15rem"}
                          src="/icons/check_circle.svg"
                          alt=""
                        />
                        {item.type === "valid" && "El código existe."}
                        {item.type === "unique" &&
                          "El código fue escaneado por única vez."}
                      </span>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="result-contenedor__main__passed__list__item">
                      <span>
                        <img width={"15rem"} src="/icons/cancel.svg" alt="" />
                        {item.type === "valid" && "El código no existe."}
                        {item.type === "unique" &&
                          "El código ya fue escaneado antes."}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScanResult;
