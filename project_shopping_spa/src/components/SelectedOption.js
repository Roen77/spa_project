import { onChangeUrl } from "../router";
import { getItem, setItem } from "../utils/Storage";

class SelectedOption {
  inputOption = 0;
  constructor($target, initialState) {
    this.$target = $target;
    this.state = initialState;
  }

  setState(newState) {
    this.state = newState;
    if (this.state.istemplate) {
      this.template();
    } else this.render();
  }
  getTotalPrice(price, count) {
    return price * count;
  }

  template() {
    if (!this.state) return;
    const { data, selectedOption } = this.state;
    console.log("tataol!!!", this.inputOption);
    const totalCount = parseInt(selectedOption[0] || 1) + this.inputOption;
    this.totalPrice = this.getTotalPrice(data.price, totalCount);
    this.$target.innerHTML = `<div><p>총 선택한 수량: ${totalCount}</p>
    <p>총 합 ${this.totalPrice}</p>
    <input type="text" value="${this.inputOption || 0}"  />
    <button class="cart-button">장바구니 담기</button>
    </div>`;
  }
  mounted() {
    const { data, selectedOption } = this.state;
    this.$target.addEventListener("change", (e) => {
      if (e.target.tagName === "INPUT") {
        console.log("input", e.target.value);
        if (typeof parseInt(e.target.value) !== "number") return;
        this.inputOption = parseInt(e.target.value);
        this.setState({
          ...this.state,
          //   selectedOption: [parseInt(selectedOption[0] || 1)],
          istemplate: true,
        });
      }
    });

    this.$target.addEventListener("click", (e) => {
      if (!e.target.classList.contains("cart-button")) return;
      const totalCount = parseInt(selectedOption[0] || 1) + this.inputOption;

      const data = {
        ...this.state.data,
        selectedOption: totalCount,
        totalPrice: this.getTotalPrice(this.state.data.price, totalCount),
      };

      let cartList = getItem("carts");
      if (!cartList || cartList?.length === 0) {
        cartList = [];
        cartList.push(data);
        setItem("carts", cartList);
        console.log("cartList", cartList, !cartList);
      } else {
        const sameProduct = cartList.filter((v) => v.id === data.id);
        if (!!sameProduct.length) {
          cartList.splice(
            cartList.findIndex((v) => v.id === data.id),
            1,
            data
          );
        } else cartList = [...cartList, data];
        console.log(sameProduct, "same");
        setItem("carts", cartList);
      }

      onChangeUrl("/carts");
    });
  }
  render() {
    this.template();
    this.mounted();
  }
}

export default SelectedOption;
