import React from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";
import Skeleton from "./components/PizzaBlock/Skeleton";

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  React.useEffect(() => {
    fetch("https://6466842bba7110b663a2c623.mockapi.io/items")
      .then((response) => response.json())
      .then((response) => {
        setShowSkeleton(false);
        setPizzas(response);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {showSkeleton ? (
              <Skeleton />
            ) : (
              pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
