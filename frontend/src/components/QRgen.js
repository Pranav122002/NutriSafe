import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";

const CLOUD_NAME = "pranav-cloud";
const UPLOAD_PRESET = "nutrisafe";
const API_BASE_URL = "http://localhost:5000/api";

function QRgen() {
  // Toast functions
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const [image, setImage] = useState(null);

  const jsonData = {
    name: "Burger",
    ingredients:
      "Chicken patty, lettuce, tomato, cheese, pickles, mayonnaise",
    containsAllergens: "False",
    price: "5.99",
  };

  const jsonString = JSON.stringify(jsonData);

  const uploadQR = async () => {
    try {
      // Get the image data URL from the QRCodeCanvas component
      const canvas = document.getElementById("qrcode-canvas");
      const imageDataURL = canvas.toDataURL("image/png");

      // Convert the data URL to a Blob
      const imageBlob = await fetch(imageDataURL).then((res) => res.blob());

      // Set the image state
      setImage(imageBlob);

      const data = new FormData();
      data.append("file", imageBlob);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);

      // Upload the QR code image to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
        }
      );
      const cloudinaryData = await cloudinaryResponse.json();

      // Save the QR code details along with the Cloudinary image URL on the server
      const response = await fetch(`${API_BASE_URL}/saveQR`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ data: jsonString, url: cloudinaryData.url }),
      });

      if (response.ok) {
        // Notification on successful save
        notifySuccess("QR Code saved successfully!");
      } else {
        // Notification on failed save
        notifyError("Failed to save QR Code. Please try again.");
      }
    } catch (error) {
      // Notification on error
      notifyError("An error occurred while saving QR code. Please try again.");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Scan My QR Code</p>
        <QRCodeCanvas id="qrcode-canvas" value={jsonString} size={230} />
        <button onClick={uploadQR}>upload QR</button>
      </header>
    </div>
  );
}

export default QRgen;
