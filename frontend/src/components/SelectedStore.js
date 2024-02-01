import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const SelectedStore = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleCartClick = () => {
    setIsCartVisible(!isCartVisible);
  };

  const selectedStore = location.state && location.state.selectedStore;

  const addToCart = (foodItem) => {
    setCart([...cart, foodItem]);
    toast.success(`${foodItem.name} added to cart`);
  };

  const removeFromCart = (foodItemId) => {
    const updatedCart = cart.filter((item) => item._id !== foodItemId);
    setCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const groupFoodItemsByLocation = (foodItems) => {
    const groupedItems = {};
    foodItems.forEach((foodItem) => {
      const { floor, department } = foodItem.location;
      if (!groupedItems[floor]) {
        groupedItems[floor] = {};
      }
      if (!groupedItems[floor][department]) {
        groupedItems[floor][department] = [];
      }
      groupedItems[floor][department].push(foodItem);
    });
    return groupedItems;
  };

  const navigateToRecipePage = () => {
    navigate("/recipe", { state: { cartItems: cart } });
  };

  const ViewCart = () => (
    <>
      <img
        src="./cart.png"
        className="w-20 absolute z-999 right-5 bg-white p-3 shadow-md rounded-full cursor-pointer"
        alt=""
        onClick={handleCartClick}
      />
      {isCartVisible && (
        <div className="mt-24 z-243 absolute text-left w-1/6 right-10 bg-gray-100 shadow-md rounded-lg p-4">
          <div className="maincart">
            <h3 className="text-2xl">Shopping Cart</h3>
            <ul className="right-10">
              {cart.map((cartItem) => (
                <li className="ml-5 bg-white mt-4 border-3 p-3 rounded-lg" key={cartItem._id}>
                  <p>Name: {cartItem.name}</p>
                  <p>Price: {cartItem.price}</p>
                  <button
                    onClick={() => removeFromCart(cartItem._id)}
                    className="bg-red-500 mt-2 text-white p-2 rounded"
                  >
                    Remove from Cart
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4">Total Price: ${cart.reduce((sum, item) => sum + item.price, 0)}</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="w-screen">
        <ViewCart />
        {selectedStore && (
          <div className="mt-20 w-4/6 ml-auto mr-10 text-left">
            <h2 className="text-4xl font-Rubik">{selectedStore.name} Store </h2>
            {Object.entries(groupFoodItemsByLocation(selectedStore.foodItems)).map(
              ([floor, departments]) => (
                <div className="mt-10 w-5/6 , bg-gray-100 shadow-md rounded-lg p-4" key={floor}>
                  <h3 className="text-2xl">Floor {floor}</h3>
                  <div>
                    {Object.entries(departments).map(([department, items]) => (
                      <div className="mt-4" key={department}>
                        <h4>Department: {department}</h4>
                        <ul className="flex  w-5/6 flex-wrap">
                          {items.map((foodItem) => (
                            <li className="ml-5 bg-white  mt-4 border-3 p-3 rounded-lg w-60" key={foodItem._id}>
                              <img className="w-32 ml-auto mr-auto" src="./foodicon.png" alt="" />
                              <p className="text-xl">{foodItem.name}</p>
                              <p>{foodItem.price} $</p>
                              <button
                                onClick={() => addToCart(foodItem)}
                                className="bg-blue-500 mt-2 text-white p-2 rounded"
                              >
                                Add to Cart
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <button onClick={navigateToRecipePage} className="bg-green-500 mt-2 text-white p-2 rounded">
        Go to Recipe Page
      </button>
    </>
  );
};

export default SelectedStore;