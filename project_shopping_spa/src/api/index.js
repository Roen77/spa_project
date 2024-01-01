// const BASE_URL = "https://fakestoreapi.com";
const BASE_URL = "https://api.themoviedb.org/3/movie";
export const IMAGE_URL = "https://image.tmdb.org/t/p/original/";

export const getRequest = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log("error");
  }
};
// "Content-Type": "application/json",
export const postRequest = async (url, payload = {}) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error");
  }
};
