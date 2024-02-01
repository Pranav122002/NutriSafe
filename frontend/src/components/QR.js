// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useState, useEffect } from "react";

// export default function QR() {

//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner("reader", {
//       qrbox: { width: 250, height: 250 },
//       fps: 5,
//     });

//     scanner.render(success, error);

//     function success(result) {
//       scanner.clear();
//       setScanResult(result);
//     }

//     function error(err) { 
//       console.warn(err);
//     }
//   }, []);

//   return (
//     <>
//       <div>QR reader Scanner</div>
//       <div>
//         {scanResult ? (
//           <div>
//             Success: <a href={"http://" + scanResult}>{scanResult}</a>{" "}
//           </div>
//         ) : (
//           <div id="reader"></div>
//         )}
//       </div>
//     </>
//   );
// }


import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function Test(props) {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};