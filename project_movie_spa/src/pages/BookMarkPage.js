import { request } from "../api";
import Cart from "../components/Cart";
import { changeUrl } from "../router";
import { getItem } from "../storage";
// 이페이지는 또 되네..차이가뭐지..
// 차이는 아래가 있냐 없냐의 차이..

// this.setState = (nextState) => {
//     this.state = nextState;
//     this.render();
//   };
export default function BookMarkpage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "movie_bookmark container";
  $page.innerHTML = "<div><h2>북마크</h2></div>";
  const cartData = getItem("carts", []);

  let cartComponent = null;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.fetchMovieList = async () => {
    if (cartData.length === 0) return;
    const data = await Promise.all(
      cartData.map(async (cart) => {
        const res = await request(`/${cart.movieId}?language=ko`);
        // console.log("option", res);

        return {
          ...res,
          options: cart,
        };
      })
    );
    this.setState(data);
    // console.log("data", data);
  };
  this.render = () => {
    if (cartData.length === 0) {
      alert("장바구니가 비어있습니다.");
      return changeUrl("/");
    } else {
      $target.appendChild($page);
      //   cart
      if (!cartComponent && this.state) {
        new Cart({ $target: $page, initialState: this.state });
      }
    }
  };

  this.fetchMovieList();
}
