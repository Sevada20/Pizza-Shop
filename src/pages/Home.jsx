import React from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortType.sortProperty.replace("-", "");
  const category = categoryId > 0 ? categoryId : "";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6466842bba7110b663a2c623.mockapi.io/items?category=${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setItems(response);
      })
      .catch(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [order, sortBy, category, searchValue]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};
export default Home;
