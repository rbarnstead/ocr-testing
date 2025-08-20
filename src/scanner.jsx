import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, BrowserPDF417Reader } from "@zxing/browser";
import { NotFoundException, ChecksumException } from "@zxing/library";

export default function Scanner() {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const codeReader = new BrowserPDF417Reader();
    let controls; // store stop handle

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setResult(result.getText());
          // optional: stop scanning after success
          if (controls) controls.stop();
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
        if (err && !(err instanceof ChecksumException)) {
          console.error(err);
        }
      })
      .then((c) => {
        controls = c; // store returned controls object
      })
      .catch((err) => console.error("Camera error:", err));

    return () => {
      if (controls) controls.stop(); // stop when unmounting
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>PDF417 / Barcode Scanner</h2>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "2px solid #333",
          borderRadius: "8px",
        }}
      />
      <p><strong>Decoded Data:</strong></p>
      <textarea
        readOnly
        value={result}
        style={{ width: "100%", height: "150px" }}
      />
    </div>
  );
}
