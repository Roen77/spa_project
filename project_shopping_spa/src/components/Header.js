import { onChangeUrl } from "../router";

class Header {
  constructor({ $target }) {
    this.$target = $target;
  }

  template() {
    const $header = document.createElement("header");
    // 왼쪽 메뉴
    const $leftMenu = document.createElement("button");
    $leftMenu.setAttribute("class", "left");
    $leftMenu.appendChild(document.createTextNode("홈"));
    $header.appendChild($leftMenu);

    //오른쪽 메뉴
    const $rightMenu = document.createElement("button");
    $rightMenu.setAttribute("class", "right");
    $rightMenu.appendChild(document.createTextNode("장바구니"));
    $header.appendChild($rightMenu);

    this.$target.appendChild($header);
  }

  //  화면을
  mounted() {
    const $leftMenu = document.querySelector(".left");
    const $rightMenu = document.querySelector(".right");

    $leftMenu.addEventListener("click", () => {
      onChangeUrl("/");
    });
    $rightMenu.addEventListener("click", () => {
      onChangeUrl("/carts");
    });
  }
  render() {
    this.template();
    this.mounted();
  }
}
export default Header;
