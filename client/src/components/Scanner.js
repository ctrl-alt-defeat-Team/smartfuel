import React, { useEffect, useState } from "react";
import config from "./config.json";
import Quagga from "quagga";
import searchProduct from "../functions/searchProduct";
import _debounce from "lodash/debounce";

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

    Quagga.onDetected(debouncedDetected);
  }, []);


  const detected = async(result) => {
    Quagga.pause();
    //console.log("camera stopped");
    if (!detectionOccurred) {
      setDetectionOccurred(true);
      //console.log(result.codeResult.code);
      if(result.codeResult.code){
        try {
          const productData = await searchProduct("barcode",result.codeResult.code);
        //  console.log(productData);
          if(productData == undefined ||
            productData == -1  ||
            productData.product_name == null){
            console.error("barcode", result.codeResult.code, "not found");
            setDetectionOccurred(false);
            Quagga.start();
            return;
          }
        }catch (error) {
          console.error('Error in onDetected:', error);
        }
      }
      setDetectionOccurred(true);
      console.log("barcode detected", result.codeResult.code);
      onDetected(result.codeResult.code);
      Quagga.stop();
    }
    else return;
  };

  const debouncedDetected = _debounce(detected, 200, { leading: true, trailing: false });

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
