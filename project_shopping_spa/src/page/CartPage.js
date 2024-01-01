import CartListView from "../components/CartListView";
import { getItem } from "../utils/Storage";

class CartPage {
  $page = null;
  constructor({ $target }) {
    console.log("cart constructor");
    this.$target = $target;
    this.init();
  }

  init() {
    this.$page = document.createElement("div");
    this.$page.setAttribute("class", "cart-container");
  }

  render() {
    const cartList = getItem("carts");
    console.log(cartList, "cartList");
    new CartListView(this.$page, cartList).render();

    this.$target.appendChild(this.$page);
  }
}

export default CartPage;
