import { IMAGE_URL } from "../api";
import { changeUrl } from "../router";
import { removeItem } from "../storage";

export default function Cart({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "Cart";
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    return this.state.reduce(
      (acc, cur) => acc + cur.options.price * cur.options.quantity,
      0
    );
  };
  $target.appendChild($component);
  this.render = () => {

    $component.innerHTML = `<div>${this.state
      .map(
        (movie) => `
        <img width="200" height="300" src="${IMAGE_URL}${movie.poster_path}"/>
    <div><p>제목:${movie.title}</p>
    <p>장르:${movie.options.name}</p>
    <p>갸격:${movie.options.price}</p>
    <p>수량:${movie.options.quantity}</p>
    </div>`
      )
      .join("")}
      <div><h3>총합</h3></div>
      <div><p>${this.getTotalPrice()}원</p></div>
      <button class="OrderButton">주문하기</button>
      </div>`;
  };

  this.render();

  $component.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("주문 되었습니다!");
      removeItem("carts");
      changeUrl("/");
    }
  });
}
