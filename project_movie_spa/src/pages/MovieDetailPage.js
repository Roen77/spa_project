import { request } from "../api";
import MovieDetail from "../components/MovieDetail";

export default function MovieDetailPage({ $target, movieId }) {
  this.state = {
    movieId,
    movie: null,
  };
  const $page = document.createElement("div");
  $page.className = "movie_detail container";
  // $page.innerHTML = "<div><h2>detail</h2></div>";


  console.log("this.state", this.state);

  this.render = async () => {
    if (!this.state.movie) {
      $target.innerHTML = "loading..";
    }
    await fetchMovieDetail();
    $target.innerHTML = `<div><h2>${this.state.movie.title}</h2></div>`;
    $target.appendChild($page);
    new MovieDetail({
      $target: $page,
      initialState: { movie: this.state.movie, selectedOptions: [] },
    });

    // await fetchMovieDetail();
    // if (!this.state.movie) {
    //   $target.innerHTML = "loading..";
    // } else {
    //   $target.innerHTML = "";
    //   // 상세 페이지 랜더링
    //   $target.appendChild($page);
    // }
  };

  const fetchMovieDetail = async () => {
    if (!this.state.movieId) return;
    const res = await request(`/${this.state.movieId}?language=ko`);
    this.state = {
      ...this.state,
      movie: res,
    };
  };
}
