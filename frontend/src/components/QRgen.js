import React from "react";
import {QRCodeCanvas} from 'qrcode.react';  //importing component from QR library


function QRgen() {

  return (
    <div className="App">
    <header className="App-header">
      <p>Scan My QR Code</p>
      <QRCodeCanvas value="https://www.showwcase.com/shivam-katare" size={230} />,  {/* here the "value" is the prop. You can give any link here. */}
    </header>
  </div>
    );
}

export default QRgen;