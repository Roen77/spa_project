import Theater from "./theater.js";

class App {
  constructor() {
    this.theaterBtn = document.querySelector("#theaterBtn");
    this.eventBinding();
  }

  handleTheater() {
    new Theater();
  }

  eventBinding() {
    this.theaterBtn.addEventListener("click", this.handleTheater);
  }
}

export default App;
