import { cache } from "../api";

export default function Breadcrumb({ $target, initialState }) {
  const $nav = document.createElement("nav");
  $nav.className = "Breadcrumb";
  $target.appendChild($nav);
  this.state = initialState;

  this.render = () => {
    const { nodes = [], isRoot, depth = [], depthCount } = this.state;

    const items = !!depth.length ? depth.slice(0, depthCount) : [];
    // console.log("items", items);


    $nav.innerHTML = `<div class="nav-item">root</div>${
      !isRoot
        ? items
            .map((node) => `<div data-id="${node.id}">${node.name}</div>`)
            .join("")
        : ""
    }`;
  };

  this.render();
}
