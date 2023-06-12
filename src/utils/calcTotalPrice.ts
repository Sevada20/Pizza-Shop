import { CartItem } from "../redux/slices/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return (sum += obj.price * obj.count);
  }, 0);
};
