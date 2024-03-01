import React, { useEffect, useState } from "react";
import config from "./config.json";
import Quagga from "quagga";
import searchProduct from "../functions/searchProduct";

import "../styles/Scanner.css"

const Scanner = props => {
  const { onDetected } = props;
  const [detectionOccurred, setDetectionOccurred] = useState(false);

  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    Quagga.onDetected(detected);
  }, [detectionOccurred]);

  const detected = async(result) => {
    if (!detectionOccurred) {
      console.log(result.codeResult.code);
      if(result.codeResult.code){
        try {
          const productData = await searchProduct(result.codeResult.code);
          console.error("barcode", result.codeResult.code, "not found");
          if(productData == -1 || productData.product_name == null){
            return;
          }
        }catch (error) {
          console.error('Error in onDetected:', error);
        }
      }
      setDetectionOccurred(true);
      onDetected(result.codeResult.code);
      Quagga.stop();
    }
  };

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
