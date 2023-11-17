import { useEffect, useState } from "react";

const useValidUserRanking = (recordsCodes, validCodes) => {
  const [combinedUserRanking, setCombinedUserRanking] = useState([]);

  useEffect(() => {
    const getCombinedUserRanking = (recordsCodes, validCodes) => {
      const userCount = {};

      // Filtrar y contar la cantidad de registros por usuario para validCodes
      validCodes.forEach((validCode) => {
        const user = validCode.user;
        userCount[user] = userCount[user] || { valid: 0, records: 0 };
        userCount[user].valid += 1;
      });

      // Filtrar y contar la cantidad de registros por usuario para códigos válidos
      recordsCodes
        .filter((recordCode) => recordCode.status === "valid")
        .forEach((validCode) => {
          const user = validCode.user;
          userCount[user] = userCount[user] || { valid: 0, recordsCodes: 0 };
          userCount[user].records += 1;
        });

      // Convertir el objeto en un array de pares [usuario, cantidad de validCodes, cantidad de recordsCodes]
      const userCountArray = Object.entries(userCount).map(([user, counts]) => [
        user,
        counts.valid,
        counts.records,
      ]);

      // Ordenar el array por la cantidad de registros (de mayor a menor)
      const sortedUserCount = userCountArray.sort(
        (a, b) => b[1] + b[2] - (a[1] + a[2])
      );

      return sortedUserCount;
    };

    // Obtener el ranking combinado de usuarios cuando los datos cambian
    const combinedRanking = getCombinedUserRanking(recordsCodes, validCodes);

    // Actualizar el estado del ranking combinado
    setCombinedUserRanking(combinedRanking);
  }, [recordsCodes, validCodes]);

  return combinedUserRanking;
};

export default useValidUserRanking;
