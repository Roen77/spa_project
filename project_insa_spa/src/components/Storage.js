export const setPersonalInfo = async () => {
  try {
    const res = await fetch("http://localhost:3000/personList");

    if (res.ok) {
      const data = await res.json();
      if (!localStorage.getItem("personalInfo")) {
        localStorage.setItem("personalInfo", JSON.stringify(data));
      }
      return data;
    }
  } catch (error) {
    console.log("error", errors);
  }
};

export const setCardStatus = () => {
  if (!localStorage.getItem("cardStatus")) {
    localStorage.setItem("cardStatus", JSON.stringify([]));
  }
};
