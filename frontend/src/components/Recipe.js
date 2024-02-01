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
      const response = await axios.post(`${API_BASE_URL}/recipes`, { userItemIds }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          'Content-Type': 'application/json',
        }
      });
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
    <div className="w-4/6 ml-auto mr-10 mt-20 text-left">
      <h2 className="text-3xl">Choose items for recipe</h2>
      <div className="shadow-md p-3 rounded-lg bg-gray-100 mt-4 w-5/6">
        <h2 className="text-xl">Item List</h2>
        {cartItems && (
          <ul>
            {cartItems.map((item) => (
              <li className=" colaowascq p-2 mt-2 border-2  ml-auto mr-auto rounded-md  w-5/6" key={item._id}>
                <div className="flex justify-between text-white text-2xl">
                  <h1 className="ml-2  ">{item.name}</h1>
                  <button className="mr-4" onClick={() => addToSelectedItems(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="shadow-md p-3 rounded-lg bg-gray-100 mt-4 w-5/6">
        <h3 className="text-xl">Selected Items</h3>
        <ul className="flex ">
          {selectedItems.map((item) => (
            <li className="colaowascq ml-4 p-2 text-white text-lg rounded-md mt-2" key={item._id}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      {/* <button onClick={fetchRecipes}>Fetch Recipes</button> */}
      <div className="shadow-md p-3 rounded-lg bg-gray-100 mt-4 w-5/6">
        <h3  className="text-xl">Recipes</h3>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h1 className="colaowascq text-white p-2 rounded-lg text-lg mt-3">{recipe.name}</h1>
              <ul className="pl-2">
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
    </div>
  );
};

export default Recipe;
