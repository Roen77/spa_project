import Header from "./components/Header";
import { setPersonalInfo } from "./components/Storage";
import HomePage from "./page/HomePage";
import SignupPage from "./page/SignupPage";

class App {
  constructor($body) {

    this.$body = $body;
    this.render();
  }

  async render() {
    // 헤더 그리기
    const header = new Header(this.$body);
    header.render();

    // main 그리기
    const main = document.createElement("main");
    main.setAttribute("id", "page_content");
    this.$body.appendChild(main);
    // 데이터 가져옴..
    // await setPersonalInfo();
    // const homePage = new HomePage(main);
    // const signupPage = new SignupPage(main);

    const { pathname } = location;
    console.log(pathname, "pathname change");

    // url변화에 따른화면 변경
    // switch (pathname) {
    //   case "/":
    //     homePage.render();
    //     break;
    //   case "/signup":
    //     signupPage.render();
    //     break;
    //   default:
    // }
    // url변화에 따른화면 변경
    main.innerHTML = "";
    switch (pathname) {
      case "/":
        new HomePage(main).render();
        break;
      case "/signup":
        new SignupPage(main).render();
        break;
      default:
    }

    // 버튼클릭시 url 변경
    document.addEventListener("urlChange", async (e) => {
      // await setPersonalInfo();
      let pathname = e.detail.href;
      main.innerHTML = "";
      switch (pathname) {
        case "/":
          // homePage.render();
          new HomePage(main).render();
          break;
        case "/signup":
          new SignupPage(main).render();
          break;
        default:
      }
    });

    window.addEventListener("popstate", async () => {
      const { pathname } = location;
      main.innerHTML = "";
      // url변화에 따른화면 변경
      switch (pathname) {
        case "/":
          homePage.render();
          break;
        case "/signup":
          signupPage.render();
          break;
        default:
      }
    });
  }
}

export default App;
