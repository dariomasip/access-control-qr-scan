import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

const Scanner = ({ setResult, setToScan }) => {
  const [isScanned, setScanned] = useState(false);
  const navigate = useNavigate();

  const handleScanCode = (result) => {
    setResult(result);
    setScanned(true);
    navigate("/scan-result");
  };

  useEffect(() => {
    setToScan(true);
  }, []);

  return (
    <>
      <QrScanner
        onDecode={handleScanCode}
        onError={(error) => console.log(error?.message)}
      />
    </>
  );
};

export default Scanner;
