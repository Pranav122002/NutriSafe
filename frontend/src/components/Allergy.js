import React, { useState, useEffect } from "react";
const API_BASE_URL = "http://localhost:5000/api";

const UserProfile = () => {
  const [allergies, setAllergies] = useState([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [showForm, setShowForm] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    // Fetch user allergies from the server on component mount
    const fetchAllergies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}/allergies`);
        const data = await response.json();
        // Initialize allergies as an empty array if it's undefined
        setAllergies(data.allergies || []);
      } catch (error) {
        console.error("Error fetching allergies:", error);
      }
    };

    fetchAllergies();
  }, [userId]);

  const handleSaveAllergy = async () => {
    try {
      // Send a request to the server to update user allergies
      await fetch(`${API_BASE_URL}/user/${userId}/add-allergies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allergies: [...allergies, newAllergy] }),
      });

      // Update local state
      setAllergies([...allergies, newAllergy]);
      setNewAllergy(""); // Clear input after saving
      setShowForm(false); // Hide the form after saving
    } catch (error) {
      console.error("Error updating allergies:", error);
    }
  };

  const handleDeleteAllergy = async (index) => {
    try {
      // Remove the selected allergy from the server
      await fetch(`${API_BASE_URL}/user/${userId}/delete-allergy`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });

      // Update local state by removing the selected allergy
      const updatedAllergies = [...allergies];
      updatedAllergies.splice(index, 1);
      setAllergies(updatedAllergies);
    } catch (error) {
      console.error("Error deleting allergy:", error);
    }
  };

  return (
    <div className="mt-40 userProfileContainer">
   
      <div className="text-left">
        <h3 className="text-4xl">Allergies:</h3>
        <ul>
          {allergies.map((allergy, index) => (
            <li key={index}>
              <div className="flex justify-between">
              {allergy}
              <button onClick={() => handleDeleteAllergy(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Allergy"}
        </button>
        {showForm && (
          <div>
            <select value={newAllergy} onChange={(e) => setNewAllergy(e.target.value)}>
              <option value="">Select Allergy</option>
              <option value="Peanuts">Peanuts</option>
              <option value="Eggs">Eggs</option>
              <option value="Shellfish">Shellfish</option>
              <option value="Gluten">Gluten</option>
              <option value="Fish">Fish</option>
              <option value="Eggs">Eggs</option>
              <option value="Soy">Soy</option>
              <option value="Sesame">Sesame</option>
              <option value="Meat">Meat</option>
              <option value="Treenuts">Treenuts</option>

            </select>
            <button onClick={handleSaveAllergy}>Save Allergy</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
