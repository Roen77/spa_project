import { changeUrl } from "../router";
import { getItem, setItem } from "../storage";

export default function SelectOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);
  this.state = initialState;
  let selectedList = null;

  this.getTotalPrice = () => {
    const { selectedOptions } = this.state;
    // const { price: productPrice } = product;

    return selectedOptions.reduce(
      (acc, option) => acc + option.price * option.quantity,
      0
    );
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { movie, selectedOptions } = this.state;
    if (!selectedOptions || !selectedOptions?.length) {
      $component.innerHTML = "<div><h3>선택된 장르가 없습니다.</h3></div>";
      return;
    }

    $component.innerHTML = `<div class="selected">
    <h3>선택된 장르 리스트</h3>
    ${selectedOptions
      .map(
        (v) => `<div class="ger_container"><div class="ger">
    <p>장르: ${v.name}</p>
    <p>가격: ${v.price}</p>
    <p>갯수: ${v.quantity}</p></div>
    <input type="text" data-option-id="${v.id}" value="${v.quantity}">
    </div>`
      )
      .join("")}

      <div><h3>총합: <p>${this.getTotalPrice()}원</p></h3></div>
      <button class="OrderButton">주문하기</button>
       </div>`;
  };
  this.render();

  $component.addEventListener("change", (e) => {
    const target = e.target;
    if (target.tagName === "INPUT") {
      console.log("e.target", target.value, target.dataset);

      const quantity = parseInt(target.value);
      if (typeof quantity === "number") {
        const { selectedOptions } = this.state;
        const selectedOption = selectedOptions.map((v) => {
          if (v.id === parseInt(target.dataset.optionId)) {
            return {
              ...v,
              quantity: target.value,
            };
          } else return v;
        });
        selectedList = selectedOption;
        this.setState({
          ...this.state,
          selectedOptions: selectedOption,
        });
      }
    }
  });

  $component.addEventListener("click", (e) => {
    //주문하기 클릭시
    if (e.target.className === "OrderButton") {
      console.log("주문", this.state);
      const { movie, selectedOptions } = this.state;
      const cartData = getItem("carts", []);
      const cartList = selectedOptions.map((v) => ({
        ...v,
        movieId: movie.id,
      }));
      setItem("carts", [...cartData, ...cartList]);
      changeUrl("/bookmark");
    }
  });
}
