import { button, select, setInput } from "./Form";
const jobList = ["프론트엔드", "백엔드", "풀스택"];
const mbtiList = ["ENFJ", "ENTJ", "ENFP", "ENTP"];
class SignpView {
  constructor($main) {
    this.$main = $main;
  }
  render() {
    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "form_container");
    this.$main.appendChild(containerDiv);

    const form = document.createElement("form");
    form.setAttribute("id", "grepp_form");
    containerDiv.appendChild(form);

    setInput("text", "name", "이름", true);
    setInput("email", "email", "이메일", true);
    setInput("text", "nickname", "닉네임", true);

    const jobSelectList = ["직군을 선택해주세요", ...jobList];
    const mbtiSelectList = ["MBTI을 선택해주세요", ...mbtiList];
    select("job_select", jobSelectList, jobSelectList, "직군", true);
    select("mbti_select", mbtiSelectList, mbtiSelectList, "mbti", false);

    button("submit", "등록");

    form.addEventListener("submit", (e) => {
      // {name: "나희도", email: "heedo@grepp.co", nickname: "heedo", role: "프론트엔드", mbti: "ESTJ"}
      e.preventDefault();
      const target = e.target;
      const name = target.name.value;
      const email = target.email.value;
      const nickname = target.nickname.value;
      const role = target.job_select.value;
      const mbti = target.mbti_select.value;

      const personalStorage = localStorage.getItem("personalInfo");
      const personalList = JSON.parse(personalStorage);

      if (
        personalStorage &&
        personalList.filter((v) => v.email === email).length === 0 &&
        personalList.filter((v) => v.nickname === nickname).length === 0
      ) {
        const personalList = JSON.parse(personalStorage);
        personalList.push({
          name,
          email,
          nickname,
          role,
          mbti,
        });
        localStorage.setItem("personalInfo", JSON.stringify(personalList));
        alert("성공적으로 등록되었습니다.");
        // 아래만 하면 화면 안바뀜..
        window.history.pushState(null, null, "/");
        const urlChange = new CustomEvent("urlChange", {
          detail: { href: "/" },
        });
        document.dispatchEvent(urlChange);
      } else {
        alert("이메일 혹은 닉네임이 이미 등록되어 있습니다.");
      }
    });
  }
}
export default SignpView;
