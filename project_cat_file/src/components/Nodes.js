const imageType = {
  DIRECTORY: "directory",
  FILE: "file",
};
import prevImg from "../../assets/prev.png";

import directory from "../../assets/directory.png";
import file from "../../assets/file.png";
export default function Nodes({ $target, initalState, onClick }) {
  this.state = initalState;
  this.$container = document.createElement("div");
  this.$container.className = "Nodes";
  $target.appendChild(this.$container);

  this.createItem = (item) => {
    const itemHtml = `<div class="Node" data-type="${item.type}" data-id="${
      item.id
    }">
    <img src="${item.type === "DIRECTORY" ? directory : file}">
    <div>${item.name}</div>
  </div>`;
    return itemHtml;
  };

  this.render = () => {
    const { nodes = [], depth = [], isRoot } = this.state;
    const itemElem = nodes;
    const rootElem = !isRoot
      ? `<div class="Node">
    <img src="${prevImg}">
  </div>
  `
      : "";
    this.$container.innerHTML = `${rootElem}${itemElem
      .map((node) => this.createItem(node))
      .join("")}`;
  };
  this.eventBinding = () => {
    this.$container.addEventListener("click", (e) => {
      const nodeItem = e.target.closest(".Node");

      if (nodeItem) {
        const { id, type } = nodeItem.dataset;
        onClick({ id: id, type });
      }
    });
  };
  this.render();
  this.eventBinding();
}
