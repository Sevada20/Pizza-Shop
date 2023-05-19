import React from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://6466842bba7110b663a2c623.mockapi.io/items")
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setPizzas(response);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const skeletonsArray = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletonsArray
          : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};
export default Home;
