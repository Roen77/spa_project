import { cardDiv, cardPlane } from "./Card";
import { setCardStatus } from "./Storage";

class CardView {
  constructor($main) {
    this.$main = $main;
  }

  render() {
    setCardStatus();
    const div = document.createElement("div");
    div.setAttribute("id", "cards_container");
    this.$main.appendChild(div);

    const personalInfo = localStorage.getItem("personalInfo");
    if (personalInfo) {
      const personalList = JSON.parse(personalInfo);
      personalList.forEach((person, i) => {
        const card = cardDiv(i);
        card.appendChild(cardPlane("front", person.nickname));
        card.appendChild(cardPlane("back", person.mbti));
        div.appendChild(card);
      });
    }
  }
}

export default CardView;
