import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";
import Home from "./pages/Home";
import MainLayout from "./Layouts/MainLayout";
import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import(/*webpackChunkName:"Cart"*/ "./pages/Cart"),
  loading: () => <h2>Loading Cart...</h2>,
});

const FullPizza = React.lazy(
  () => import(/*webpackChunkName:"FullPizza"*/ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName:"NotFound"*/ "./pages/NotFound")
);
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<h2>Loading Cart...</h2>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<h2>Loading FullPizza...</h2>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<h2>Loading Cart</h2>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
