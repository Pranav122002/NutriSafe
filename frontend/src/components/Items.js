import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const API_BASE_URL = "http://localhost:5000/api";

const Items = () => {
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const [storeitem, setStoreItem] = useState([]);

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-store-items`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setStoreItem(data);
      } else if (data && typeof data === "object") {
        setStoreItem(Object.values(data));
      } else {
        throw new Error("Invalid data format received from the server");
      }
    } catch (error) {
      console.log(
        "An error occurred while fetching store items",
        error.message
      );
    }
  };

  useEffect(() => {
    console.log(storeitem);
  }, [storeitem]); // Log the state whenever storeitem changes

  return (
    <>
      <div>
        <h2>View Item Details</h2>
        <ul>
          {storeitem.map((item) => (
            <li key={item._id}>
              <p>Name: {item.name}</p>
              <p>Location: {item.location}</p>
              {/* {item.foodItems.map((fitem) => (
                <li key={fitem._id}>
                  <p>Name: {fitem.name}</p>
                  <p>Location: {fitem.location}</p>
                  <p>Location: {fitem.containsAllergens}</p>
                  <p>Location: {fitem.price}</p>
                </li>
              ))} */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Items;
