import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:5000/api";

const Stores = () => {
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-stores`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setStores(data);
      } else if (data && typeof data === "object") {
        setStores(Object.values(data));
      } else {
        throw new Error("Invalid data format received from the server");
      }
    } catch (error) {
      console.log(
        "An error occurred while fetching store Stores",
        error.message
      );
    }
  };

  const handleStoreClick = (storeId) => {
    const selectedStoreData = stores.find((store) => store._id === storeId);
    setSelectedStore(selectedStoreData);
  };

  return (
    <>
      <div>
        <h2>View Item Details</h2>
        <ul>
          {stores.map((store) => (
            <li key={store._id}>
              <p>Name: {store.name}</p>
              <p>Location: {store.location}</p>
              <button onClick={() => handleStoreClick(store._id)}>
                Show Food Items
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedStore && (
        <div>
          <h2>Food Stores for {selectedStore.name}</h2>
          <ul>
            {selectedStore.foodItems.map((foodItem) => (
              <li key={foodItem._id}>
                <p>Name: {foodItem.name}</p>
                <p>Location-floor: {foodItem.location.floor} </p>
                <p>Location-department: {foodItem.location.department} </p>
                <p>Contains Allergens: {foodItem.containsAllergens.toString()}</p>
                <p>Price: {foodItem.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Stores;
