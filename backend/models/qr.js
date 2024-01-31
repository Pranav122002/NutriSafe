const fs = require('fs');
const qr = require('qrcode');

// Text or data you want to encode into the QR code
const qrText = 'SMelly Cheese';

// File path where you want to save the generated QR code image
const filePath = '../qr/qrcode.png';

// Generate QR code
qr.toFile(filePath, qrText, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    return;
  }
  console.log('QR code generated successfully!');
});
