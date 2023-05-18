import React from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [s, setS] = React.useState(0);
  React.useEffect(() => {
    fetch("https://6466842bba7110b663a2c623.mockapi.io/items")
      .then((response) => response.json())
      .then((response) => setPizzas(response));
  }, []);

  return (
    <div className="wrapper">
      <button onClick={() => setS(s + 1)}>{s}</button>
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock {...obj} key={obj.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
