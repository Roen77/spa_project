import { onChangeUrl } from "../router";

class CartListView {
  constructor($target, initialState) {
    this.$target = $target;
    this.state = initialState;
  }
  render() {
    if (!this.state) {
      alert("장바구니에 상품이 없어요.");
      return onChangeUrl("/");
    }
    this.$target.innerHTML = this.state
      .map(
        (value, i) => `<div>
    <p>${value.title}</p>
    <img src="${value.image}" width="300" height="400"/>
    <div>총 수량 : ${value.selectedOption}</div>
    <div>총 가격 : ${value.totalPrice}</div>
    </div>`
      )
      .join("");
  }
}

export default CartListView;
