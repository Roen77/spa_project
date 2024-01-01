class Header {
  constructor($body) {
    this.$body = $body;
  }

  createMenuElem(divClass, spanClass, spanId, menuText) {
    const div = document.createElement("div");
    div.setAttribute("class", divClass);

    const span = document.createElement("span");
    span.setAttribute("class", spanClass);
    span.setAttribute("id", spanId);
    span.appendChild(document.createTextNode(menuText));
    div.appendChild(span);
    return div;
  }

  render() {
    const header = document.createElement("header");
    const home_menu = this.createMenuElem(
      "header header_left",
      "menu_name",
      "menu_home",
      "HOME"
    );
    const signup_menu = this.createMenuElem(
      "header header_right",
      "menu_name",
      "menu_signup",
      "SIGNUP"
    );
    header.appendChild(home_menu);
    header.appendChild(signup_menu);
    // 헤더 넣기
    this.$body.appendChild(header);

    // 이벤트
    home_menu.addEventListener("click", () => {
      // 버튼을 누를때 이벤트를 디스패치해야 작동한다...
      window.history.pushState(null, null, "/");
      const urlChange = new CustomEvent("urlChange", {
        detail: { href: "/" },
      });
      document.dispatchEvent(urlChange);
    });

    signup_menu.addEventListener("click", () => {
      window.history.pushState(null, null, "/signup");
      const urlChange = new CustomEvent("urlChange", {
        detail: { href: "/signup" },
      });
      document.dispatchEvent(urlChange);
    });
  }
}
export default Header;
