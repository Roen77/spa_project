export const setInput = (type, id, text, required) => {
  const span = document.createElement("span");
  span.setAttribute("class", "form_elem");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.appendChild(document.createTextNode(text));
  span.appendChild(label);

  const markSpan = document.createElement("span");
  markSpan.setAttribute("class", "amrk");
  markSpan.appendChild(document.createTextNode("(필수*)"));
  label.appendChild(markSpan);

  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  input.setAttribute("placeholder", text);
  input.appendChild(document.createTextNode(text));
  //   유효성 체크
  if (id == "name") {
    input.setAttribute("pattern", "^([가-힣]){2,4}$");
    input.setAttribute("title", "2~4 글자의 한글만 입력이 가능합니다.");
  }

  span.appendChild(input);
  document.getElementById("grepp_form").appendChild(span);

  if (required) {
    input.setAttribute("required", "a");
  }
};

export const select = (id, valueList, textList, labelText, required) => {
  const span = document.createElement("span");
  span.setAttribute("class", "form_elem");

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.appendChild(document.createTextNode(labelText));
  span.appendChild(label);

  if (required) {
    const markSpan = document.createElement("span");
    markSpan.setAttribute("class", "amrk");
    markSpan.appendChild(document.createTextNode("(필수*)"));
    label.appendChild(markSpan);
  }

  const select = document.createElement("select");
  select.setAttribute("id", id);
  select.setAttribute("name", id);

  valueList.map((value, i) => {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    option.appendChild(document.createTextNode(textList[i]));
    select.appendChild(option);
  });

  span.appendChild(select);
  document.getElementById("grepp_form").appendChild(span);

  if (required) {
    select.setAttribute("required", "a");
  }
};

export const button = (type, text) => {
  const span = document.createElement("span");
  span.setAttribute("class", "form_elem");
  span.setAttribute("type", type);

  const button = document.createElement("button");
  button.appendChild(document.createTextNode(text));

  span.appendChild(button);
  document.getElementById("grepp_form").appendChild(span);
};

{
  /* <span class="form_elem">
    <select id="role" name="role">
        <option value="">직군을 선택해주세요</option>
        <option value="backend">백엔드</option>
        <option value="frontend">프론트엔드</option>
        <option value="fullstack">풀스택</option>
    </select>
</span> */
}
