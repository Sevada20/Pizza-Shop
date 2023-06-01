import React from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import Sort, { list } from "../components/Sort";
import {
  selectFilter,
  setCategory,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";
import qs from "qs";

const Home = () => {
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizza);
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);

  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onChangePage = (id) => {
    dispatch(setCurrentPage(id));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
    window.scrollTo(0, 0);
  }, [dispatch, order, sortBy, category, search, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [navigate, sort.sortProperty, categoryId, currentPage]);

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
      {status === "error" ? (
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h2 style={{ color: "red" }}>error</h2>
          <h4>
            Something went wrong <br /> We couldn't retrieve the pizza
          </h4>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
