import { getRequest } from "../api";
import ProductDetailView from "../components/ProductDetailView";

class ProductDetailPage {
  $page = null;
  constructor({ $target, $id }) {
    console.log("detail constructor");
    this.$target = $target;
    this.$id = $id;
    this.init();
  }

  init() {
    this.$page = document.createElement("div");
    this.$page.setAttribute("class", "product-detail");
    this.$target.appendChild(this.$page);
  }

  setState(newState) {
    this.state = newState;
    this.template();
  }

  template() {
    const productDetailView = new ProductDetailView(this.$page, {
      data: this.state,
      selectedOption: [],
    });
    productDetailView.render();
  }

  async getProductDetailList() {
    if (!this.$id) return;
    const data = await getRequest(`/products/${this.$id}`);
    console.log("data fetch", data);
    this.setState(data);
  }

  render() {
    this.getProductDetailList();
    this.template();
  }
}

export default ProductDetailPage;
