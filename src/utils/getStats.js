const getUniqueValues = (data, key) => {
  const uniqueValues = new Set(data.map((item) => item[key]));
  return Array.from(uniqueValues).map((value) => ({ [key]: value }));
};

const getStats = (validCodes, recordCodes, keys) => {
  if (!Array.isArray(validCodes) || !Array.isArray(recordCodes)) {
    console.error("Invalid data format");
    return null;
  }
  const uniqueValues = keys.reduce((acc, key) => {
    acc[key] = getUniqueValues(validCodes, key);
    return acc;
  }, {});

  // Usar estadísticas para mapear datos adicionales
  const stats = keys.reduce((acc, key) => {
    acc[key] = uniqueValues[key].map((item) => {
      const filteredCodes = recordCodes.filter(
        (codes) => codes[key] === item[key] && codes.status === "valid"
      );

      return {
        [key]: item[key],
        count: filteredCodes.length,
      };
    });

    // Ordenar el array resultante de mayor a menor
    acc[key].sort((a, b) => b.count - a.count);

    return acc;
  }, {});

  return stats;
};

export { getStats };
