import { getRequest } from "../api";
import Header from "../components/Header";
import ProductListView from "../components/ProductListView";
//  async getProductList() 비동기 처리 위치에 영향받음
class ProductListPage {
  $page = null;
  constructor({ $target }) {
    this.$target = $target;
    this.state = null;
    this.$page = document.createElement("div");
    this.$page.setAttribute("class", "container list-container");
    this.$page.innerHTML = "<div><h4>aa</h4></div>";
  }

  setState(newState) {
    this.state = newState;
    // this.template();
    // this.mounted();
  }

  async getProductList() {
    // const data = await getRequest("/products?limit=10");
    const data = await getRequest("/now_playing?language=ko&page=1");
    console.log("data fetch", data);
    this.setState(data.results);
    // this.state = data;
  }

  template() {
    console.log("state 확인:", this.state);
    this.$page = document.createElement("div");
    this.$page.setAttribute("class", "container list-container");
  }
  // mounted() {}

  async render() {
    await this.getProductList();
    this.$target.appendChild(this.$page);
    const productListView = new ProductListView({
      $target: this.$page,
      initialState: this.state,
    });
    // productListView.render();
    // this.template();
  }
}

export default ProductListPage;
