const BASE_URL = "http://localhost:3000/picturelist";

export const cache = {};

export const getNodeList = async (id = "") => {
  if (cache[id]) return cache[id];
  if (!id && cache["root"]) {
    return cache["root"];
  }
  const res = await fetch(`${BASE_URL}${id}`);
  if (res.ok) {
    const json = await res.json();
    cache[id || "root"] = json;
    return json;
  }
  throw new Error("에러가 발생했습니다.");
};
