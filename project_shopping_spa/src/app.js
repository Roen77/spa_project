import Header from "./components/Header";
import Router from "./router";

class App {
  $main = document.createElement("main");
  constructor({ $target }) {
    this.$target = $target;

    this.render();
  }
  render() {
    const $main = document.createElement("main");
    this.$target.appendChild($main);

    // this.$target.appendChild(document.createElement("div"));
    // header;
    // const header = new Header({ $target: this.$target });
    // header.render();

    // // main
    // const $main = document.createElement("main");
    const router = new Router($main);
    router.render();

    // header;
    // const header = new Header({ $target: this.$target });
    // header.render();
  }
}
export default App;
