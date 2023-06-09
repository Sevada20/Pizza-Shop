import React from "react";
import {
  Skeleton,
  Categories,
  PizzaBlock,
  Pagination,
  Sort,
} from "../components";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { selectFilter, selectSort } from "../redux/slices/filter/selectors";
import { setCategory, setCurrentPage } from "../redux/slices/filter/slice";
import { selectPizza } from "../redux/slices/pizza/selectors";
import { fetchPizzas } from "../redux/slices/pizza/slice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectPizza);
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sort = useSelector(selectSort);
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
