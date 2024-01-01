const ROUTE_CHANGE_EVENT = "ROUTE_CHANGE";

export const init = (onRouteChange) => {
  console.log("init 화면 이동");
  window.addEventListener(ROUTE_CHANGE_EVENT, () => {
    onRouteChange();
  });
};

export const changeUrl = (url, parmas) => {
  // pustState만 하면 url만 바뀌고 화면은 바뀌지않는다..그래서 this.route함수를 호출해주어야함
  window.history.pushState(null, null, url);
  //   아래 추가해야 위의 pushState로 url이 변경되면서 화면을 그려줌.. 한가지 문제가더있다.. 뒤로가기했을때 화면 안보임.. popState이벤트를 추가해주어야함
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: parmas,
    })
  );
};
