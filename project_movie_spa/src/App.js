import BookMarkpage from "./pages/BookMarkPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MovieListPage from "./pages/MovieListPage";
import { init } from "./router";

export default function App({ $target }) {
  this.route = () => {
    const { pathname, search } = location;
    $target.innerHTML = "";
    if (pathname === "/") {
      new MovieListPage({ $target }).render();
    } else if (pathname.indexOf("/movies") === 0) {
      const urlParams = new URLSearchParams(search);

      //   이미 new하는순간 함수전체가 호출됨  new MovieDetailPage($target);
      //   그중에 렌더함수를 호출하면 그제야 랜더함수가 작동됨
      new MovieDetailPage({
        $target,
        movieId: urlParams.get("id"),
      }).render();
    } else if (pathname === "/bookmark") {
      new BookMarkpage({ $target }).render();
    }
  };
  //   이거안해주면 화면이동이 안됨.. url만 변경될뿐.. pushState에 버튼클릭햇을때 대응하려고..
  init(this.route);
  window.addEventListener("popstate", this.route);
  // 주소창에 직접칠때의 변화
  this.route();
}
