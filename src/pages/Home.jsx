import React from "react";
import qs from "qs";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const {
    categoryId,
    currentPage,
    sort: { sortProperty },
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const order = sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onChangePage = (id) => {
    dispatch(setCurrentPage(id));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://6466842bba7110b663a2c623.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sortBy}${search}&order=${order}`
      )
      .then(({ data }) => {
        setIsLoading(false);
        setItems(data);
      })
      .catch(() => {
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [order, sortBy, category, search, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [navigate, sortProperty, categoryId, currentPage]);

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
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
