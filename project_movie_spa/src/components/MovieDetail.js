import { IMAGE_URL } from "../api";
import SelectOptions from "./SelectOptions";

export default function MovieDetail({ $target, initialState }) {
  const $movieDetail = document.createElement("div");
  let isInitialized = false;
  $movieDetail.className = "movie_detail";
  $target.appendChild($movieDetail);
  this.state = initialState;

  // let으로 생성만 해둡니다.
  let selectedOptions = null;

  this.setState = (nextState) => {
    this.state = nextState;

    // render해주면... 화면다시그리면서 셀렉트 없어져서 주석처리해줌..
    // this.render();
    if (selectedOptions) {
      selectedOptions.setState({
        ...this.state,
        selectedOptions: this.state.selectedOptions,
      });
    }
  };

  this.render = () => {
    if (!isInitialized) {
      if (!this.state)
        return ($movieDetail.innerHTML = "<div><h2>영화가 없어요..</h2></div>");

      const { poster_path, title, runtime, vote_average, genres } =
        this.state.movie || {};

      $movieDetail.innerHTML = `
       <div class="detail_inner">
       <div class="left">
       <img width="200" height="300" src="${IMAGE_URL}${poster_path}"/>
       <div><p>${title}</p></div>
       <div><p>runtime
       :${runtime}분</p></div>
       <div><p>평점
       :${vote_average}</p></div>
       </div>
       <div class="right">
       <div><h3>장르</h3></div>
       <select>
       <option>선택하세요.</option>
       ${(genres || [])
         .map((value) => `<option value="${value.id}">${value.name}</option>`)
         .join("")}
       </select>
       <div class="ProductDetail__selectedOptions"></div>
       </div>
       </div>
      `;

      selectedOptions = new SelectOptions({
        $target: $movieDetail.querySelector(".ProductDetail__selectedOptions"),
        initialState: this.state,
      });
      isInitialized = true;
    }
  };

  this.render();

  $movieDetail.addEventListener("change", (e) => {

    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      //   빈배열, 빈객체는 false가 아니라 값이기 때문에 주의하자..
      // filter는 무조건 없으면빈배열 find는 없으면 undefined 빈배열은 ![] => false []=>[] !![]=>true
      const { movie, selectedOptions } = this.state;

      const option = movie.genres.filter((v) => v.id === selectedOptionId);

      //   selectedOptions에 이미 같은 값이 있는지 없는지 확인
      const isSelectedMovie = selectedOptions.find(
        (v) => v.id === selectedOptionId
      );
      //   if (!isSelectedMovie && !!option.length) {
      //     this.setState({
      //       ...this.state,
      //       selectedOptions: [...selectedOptions, ...option],
      //     });
      //   }
      if (!isSelectedMovie && !!option.length) {
        this.setState({
          ...this.state,
          selectedOptions: [...selectedOptions, ...option].map((v, i) => ({
            ...v,
            price: 1000 * (i + 1),
            quantity: 1 + i,
          })),
        });
      }
    }
    console.log("price", this.state.selectedOptions);
  });
}
