const BASE_URL = "https://api.themoviedb.org/3/movie";
export const IMAGE_URL = "https://image.tmdb.org/t/p/original/";
export const request = async (url, options) => {
  try {
    const res = await fetch(
      `${BASE_URL}${url}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
      options
    );
    if (res.ok) {
      // fetch는 결과를 json으로 변경해주어야하고 promise값이기 때문에 await등의 비동기 처리가 필요
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};
