import React from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { setCategory } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ searchValue }) => {
  const {
    categoryId,
    sort: { sortProperty },
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const order = sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6466842bba7110b663a2c623.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sortBy}${search}&order=${order}`
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
  }, [order, sortBy, category, search, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => dispatch(setCategory(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(index) => setCurrentPage(index)} />
    </div>
  );
};
export default Home;
