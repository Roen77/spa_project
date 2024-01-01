import CartPage from "./page/CartPage";
import ProductDetailPage from "./page/ProductDetailPage";
import ProductListPage from "./page/ProductListPage";

const ROUTE_CHANGE_EVENT = "route_change_event";
const routes = {
  "/": ProductListPage,
  "/products": ProductDetailPage,
  "/carts": CartPage,
};

// url를 변경해주는 함수
export const onChangeUrl = (pathname, params) => {
  // history.pushState 로 url 변경
  const url = params ? `${pathname}${params}` : pathname;
  window.history.pushState(null, null, url);
  //   ROUTE_CHANGE_EVENT 라는 커스텀 이벤트를 생성하여 이벤트를 전달해준다.
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        pathname,
        search: params,
      },
    })
  );
};

class Router {
  constructor($target) {
    this.$target = $target;
  }

  route(currentPathname, search = "") {
    // 화면 초기화
    this.$target.innerHTML = "";
    // if (currentPathname === "/") {
    //   new ProductListPage({ $target: this.$target }).render();
    // }
    Object.entries(routes).map(([pathname, route]) => {
      const urlParams = new URLSearchParams(search);
      if (pathname === currentPathname.split("?")[0]) {
        urlParams.get("id")
          ? new route({
              $target: this.$target,
              $id: urlParams.get("id"),
            }).render()
          : new route({ $target: this.$target }).render();
      }
    });
  }
  //   라우터 처리
  render() {
    const { pathname, search } = location;

    this.route(pathname, search);

    // ROUTE_CHANGE_EVENT가 발생했을때 라우터에 따라 화면을 변경해준다.
    window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
      console.log("detail:", e.detail);
      this.route(e.detail.pathname, e.detail.search);
    });
    window.addEventListener("popstate", () => {
      const { pathname, search } = location;
      this.route(pathname, search);
    });
  }
}

export default Router;
