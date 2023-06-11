import React from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import Sort, { list } from "../components/Sort";
import {
  selectFilter,
  selectSort,
  setCategory,
  setCurrentPage,
  // setFilters,
} from "../redux/slices/filterSlice";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  fetchPizzas,
  selectPizza,
  // SearchPizzaParams,
} from "../redux/slices/pizzaSlice";
// import qs from "qs";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  // const isMounted = React.useRef(false);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizza);
  const { categoryId, currentPage, searchValue } =
    useSelector(selectFilter);
  const sort = useSelector(selectSort)
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = React.useCallback(
    (i: number) => dispatch(setCategory(i)),
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  }, [dispatch, order, sortBy, category, search, currentPage]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [navigate, sort.sortProperty, categoryId, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: +params.category,
  //         currentPage: +params.currentPage,
  //         sort: sort ? sort : list[0],
  //       })
  //     );
  //   }
  // }, [dispatch]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sort={sort} />
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
