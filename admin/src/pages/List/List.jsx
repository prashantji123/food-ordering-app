import React, { useState, useEffect } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);

      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setList(response.data.data);
      } else {
        console.error("Invalid response format:", response.data);
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                |X|
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
