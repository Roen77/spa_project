import ContentTitle from "../components/ContentTitle";
import SignpView from "../components/SignupView";

class SignupPage {
  constructor($main) {
    this.$main = $main;
    console.log("signup constructor");
  }
  render() {
    const title = new ContentTitle(this.$main, "SignUp PeoPle");
    title.render();

    const singupView = new SignpView(this.$main);
    singupView.render();
  }
}
export default SignupPage;
