// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// const Recipe = () => {
//   const location = useLocation();
//   const cartItems = location.state && location.state.cartItems;

//   const [selectedItems, setSelectedItems] = useState([]);

//   const addToSelectedItems = (item) => {
//     setSelectedItems([...selectedItems, item]);
//   };

//   return (
//     <div>
//       <h2>Recipe Page</h2>
//       {cartItems && (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item._id}>
//               {item.name} - {item.price}
//               <button onClick={() => addToSelectedItems(item)}>
//                 +
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <h3>Selected Items:</h3>
//       <ul>
//         {selectedItems.map((item) => (
//           <li key={item._id}>
//             {item.name} - {item.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Recipe;





import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";

const Recipe = () => {
  const location = useLocation();
  const cartItems = location.state && location.state.cartItems;

  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const addToSelectedItems = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const fetchRecipes = async () => {
    try {
      const userItemIds = selectedItems.map((item) => item._id);
      const response = await axios.post(`${API_BASE_URL}/recipes`,  { userItemIds }, {headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
      }});
      setRecipes(response.data.recipes);
      console.log("recipe = ", response.data.recipes);
      
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    // Fetch recipes when selectedItems change
    fetchRecipes();
  }, [selectedItems]);

  return (
    <div>
      <h2>Recipe Page</h2>
      {cartItems && (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - {item.price}
              <button onClick={() => addToSelectedItems(item)}>+</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Selected Items:</h3>
      <ul>
        {selectedItems.map((item) => (
          <li key={item._id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <button onClick={fetchRecipes}>Fetch Recipes</button>
      <h3>Recipes:</h3>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <strong>{recipe.name}</strong>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.amount} {ingredient.unit}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
