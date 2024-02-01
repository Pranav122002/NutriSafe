import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SelectedStore from "./SelectedStore";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

const Stores = () => {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (selectedStore) {
            navigate("/store", { state: { selectedStore: selectedStore } });
        }
    }, [selectedStore]);

    return (
        <>
            <div className="mt-20 w-5/6 ml-auto text-left">
            <h1 className="font-Rubik font-md ml-60 text-4xl">Nearby stores</h1>
                <div className="nbstores flex  justify-center">

                    {stores.map((store) => (
                        <>
                            <div className="w-[35%] ml-5 min-h-32 rounded-md mt-4 p-3 border-3">
                                <ul>
                                    <li key={store._id}>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-2xl">{store.name}</p>

                                                <p>Location: {store.location}</p>
                                            </div>
                                            <button className="bgbut w-20 text-white text-xl rounded-full shadow-sm" onClick={() => handleStoreClick(store._id)}>
                                                View
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ))}

                </div>
            </div>


        </>
    );
};

export default Stores;
