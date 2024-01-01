import { IMAGE_URL } from "../api";
import { changeUrl } from "../router";

export default function MovieList({ $target, initialState }) {

  this.state = initialState;
  const $movieList = document.createElement("ul");
  $movieList.classList = "movie_list";
  // $target.appendChild($movieList);


  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    $movieList.innerHTML = `
    ${this.state
      .map(
        (value) => `<li class="list" data-movie-id="${value.id}">
    <img width="200" height="300" src="${IMAGE_URL}${value.poster_path}"/>
    <div><p>${value.title}</p></div>
    </li>`
      )
      .join("")}`;
    // join안해주면 ","가 들어가져있다..
    $target.appendChild($movieList);
  };
  this.render();

  //   이벤트 위임
  $movieList.addEventListener("click", (e) => {
    // console.log("e.target", e.currentTarget, e.target.closest("li"));
    const target = e.target.closest("li");
    const { movieId } = target.dataset;
    console.log("target data", movieId);
    if (movieId) {
      changeUrl(`/movies?id=${movieId}`);
    }
  });
}
