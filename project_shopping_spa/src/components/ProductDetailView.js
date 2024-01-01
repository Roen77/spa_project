import SelectedOption from "./SelectedOption";

class ProductDetailView {
  select = null;
  constructor($target, $props) {
    this.$target = $target;
    this.state = $props;
  }

  setState(newState) {
    this.state = newState;
    // this.template();
    // this.mounted();

    if (this.select) {
      this.select.setState({
        ...this.state,
        selectedOption: this.state.selectedOption,
      });
    }
  }

  createOption(optionList) {
    console.log(optionList, "list", this.state);

    return `<select>${optionList.map(
      (option, i) => `<option   value="${option}">${option}</option>`
    )}</select>`;
  }

  template() {
    if (!this.state || !this.state?.data) {
      return (this.$target.innerHTML = "<div><p>loading...</p></div>");
    } else {
      this.$target.innerHTML = `<div class="select-container">
        <h3>${this.state.data.title}</h3>
      <div class="container">
      <div class="left">
      <img width="300" height="500" src="${this.state.data.image}"/>
      <p>price : ${this.state.data.price}</p>
    <p>rate : ${this.state.data.rating.rate || 0}</p>
    </div>
    <div class="right">
    <p>수량</p>
    ${this.createOption(Array.from({ length: 5 }, (v, i) => i + 1))}
    <div class="select-options"></div>
    </div>
      </div>
        </div>`;

      this.select = new SelectedOption(
        document.querySelector(".select-options"),
        this.state
      );
      this.select.render();
    }
  }

  mounted() {
    const $selectContainer = document.querySelector(".select-container");
    // console.log($selectContainer, "select");
    if (!$selectContainer) return;
    $selectContainer.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT") {
        const { selectedOption } = this.state;
        // console.log("select", e.target.value);
        const selected = e.target.value;
        console.log(
          selectedOption.find((v) => v === selected),
          "무엇.."
        );
        if (!selectedOption.find((v) => v === selected)) {
          this.setState({
            ...this.state,
            // selectedOption: [...selectedOption, selected],
            selectedOption: [selected],
          });
        }
      }
    });
  }

  render() {
    this.template();
    this.mounted();
  }
}
export default ProductDetailView;
