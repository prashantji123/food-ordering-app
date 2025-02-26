import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext); // ✅ Use the backend food list

  if (!food_list || food_list.length === 0) {
    console.error("No food items found!");
    return <p>Loading food items...</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you!</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image} // ✅ Now correctly fetching from backend
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
