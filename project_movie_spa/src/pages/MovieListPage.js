import { request } from "../api";
import MovieList from "../components/MovieList";

export default function MovieListPage({ $target }) {
  console.log("movielist page");
  const $page = document.createElement("div");
  $page.className = "movie_list container";
  $page.innerHTML = "<div><h2>home</h2></div>";
  // this.state = { movieList: null };

  const fetchMovieList = async () => {
    const res = await request("/now_playing?language=ko&page=1");

    if (res && res.results) {

      this.state = res.results;
    }
  };

  this.render = async () => {
    // 데이터를 패치한 이후에 화면그려주면 데이터가 있는상태에서 화면을 append하니 안깜박거림
    await fetchMovieList();
    $target.appendChild($page);
    new MovieList({ $target: $page, initialState: this.state });
  };
}
