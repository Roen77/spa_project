export const cardDiv = (index) => {
  const card_div = document.createElement("div");
  card_div.setAttribute("idx", index);
  card_div.setAttribute("class", "card");

  const cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
  if (!cardStorage[index]) {
    card_div.setAttribute("class", "card");
    cardStorage.push({ idx: index, status: card_div.getAttribute("class") });
    localStorage.setItem("cardStatus", JSON.stringify(cardStorage));
  } else {
    card_div.setAttribute("class", cardStorage[index].status);
  }

  card_div.addEventListener("click", () => {
    let cardStorage = JSON.parse(localStorage.getItem("cardStatus"));
    card_div.classList.toggle("is-flipped");
    cardStorage[index].status = card_div.getAttribute("class");
    localStorage.setItem("cardStatus", JSON.stringify(cardStorage));
  });
  return card_div;
};

export const cardPlane = (side, data) => {
  const div = document.createElement("div");
  div.setAttribute("class", `card_plane card_plane--${side}`);
  div.appendChild(document.createTextNode(data));
  return div;
};
