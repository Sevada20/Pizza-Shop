import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const navigate = useNavigate();
  const [pizzaItem, setPizzaItem] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizzaItem() {
      try {
        const { data } = await axios.get(
          `https://6466842bba7110b663a2c623.mockapi.io/items/${id}`
        );
        setPizzaItem(data);
      } catch (error) {
        console.log(error);
        alert("Error while retrieving pizza");
        navigate("/");
      }
    }
    fetchPizzaItem();
  }, [id, navigate]);

  if (!pizzaItem) return <h2 style={{ marginLeft: "50px" }}>Loading</h2>;

  return (
    <div className="container">
      <img src={pizzaItem.imageUrl} alt="photoPizza" />
      <h2>{pizzaItem.title}</h2>
      <h3>{pizzaItem.price}₽</h3>
    </div>
  );
};
export default FullPizza;
