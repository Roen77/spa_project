export default function ImageView({ $target, initialState, onClose }) {
  this.state = initialState;
  this.$modal = document.createElement("div");
  this.$modal.className = "Modal ImageViewer";
  $target.appendChild(this.$modal);
  //     <div class="ImageViewer">
  //   <div class="content">
  //     <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public/images/a2i.jpg">
  //   </div>
  // </div>

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    console.log("this.state image", this.state);
    this.$modal.style.display = this.state ? "block" : "none";
    if (this.state) {
      this.$modal.innerHTML = ` <div class="content">
        <img src="${this.state}">
      </div>`;
    }
  };

  this.eventbinding = () => {
    this.$modal.addEventListener("click", (e) => {
      console.log("e.target", e.target.classList.contains("ImageViewer"));
      if (e.target.classList.contains("ImageViewer")) {
        onClose();
      }
    });
  };

  this.render();
  this.eventbinding();
}
