import CardView from "../components/CardView";
import ContentTitle from "../components/ContentTitle";
import { setPersonalInfo } from "../components/Storage";

class HomePage {
  constructor($main) {
    this.$main = $main;
    this.state = null;
    this.init = true;
    this.fetchPersonalList();

  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  async fetchPersonalList() {
    const res = await fetch("http://localhost:3000/personList");

    if (res.ok) {
      const data = await res.json();
      this.setState(data);
    }
  }
  catch(error) {
    console.log("error", errors);
  }

  async render() {
    console.log("this.state", this.state);

    const title = new ContentTitle(this.$main, "Great PeoPle");
    title.render();
    // await setPersonalInfo();
    const cardView = new CardView(this.$main);
    cardView.render();
  }
}
export default HomePage;
