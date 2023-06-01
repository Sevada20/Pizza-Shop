import { Link } from "react-router-dom";
import emptyCart from "../assets/img/empty-cart.png";
const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        The Cart is empty <span>😕</span>
      </h2>
      <p>
        Most likely, you haven't ordered pizza yet.
        <br />
        To order pizza, please go to the main page.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};
export default CartEmpty;
