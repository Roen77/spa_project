class Theater {
  constructor() {
    this.state = {
      selectedAdult: 0,
      selectedMinor: 0,
      selectedAdultSeatList: [],
      selectedMucSeatList: [],
      selectedhandicapSeatList: [],
      //  장애인 여부 체크
      isCheckHandicap: false,
      selectedHandicap: false,
      totalPrice: 0,
    };

    // 잔여좌석
    this.remainSeat = document.querySelector("#remainSeatCnt");
    // 비용
    this.amount = document.querySelector("#amount");
    this.adultBtn = document.querySelector("#adultBtn");
    this.minorBtn = document.querySelector("#youthBtn");
    this.handicap = document.querySelector("#checkHandicap");
    this.theaterSeat = document.querySelector("#theaterSeat");
    this.adultItems = [...this.adultBtn.children];
    this.minorItems = [...this.minorBtn.children];

    this.init();
    this.eventBinding();
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.setBtnToggle(this.adultItems, this.state.selectedAdult);
    this.setBtnToggle(this.minorItems, this.state.selectedMinor);
    this.setHandicap(this.isCheckHandicap());
    this.setSeat();
    this.setPrice();
  }

  setPrice() {
    this.amount.innerText = totalPrice;
  }

  resetSeat() {
    this.setState({
      selectedAdultSeatList: [],
      selectedMucSeatList: [],
      selectedhandicapSeatList: [],
      //  장애인 여부 체크
      isCheckHandicap: false,
      selectedHandicap: false,
      totalPrice: 0,
    });
    Array.from(this.theaterSeat.children).forEach((elem) => {
      if (elem.classList.contains("clicked")) elem.classList.remove("clicked");
    });
  }
  setBtnToggle(elem, btnIndex) {
    elem[btnIndex].classList.add("toggle");
  }
  setHandicap(isCheck) {
    this.handicap.disabled = !isCheck;
  }
  setSeat() {
    const {
      selectedAdult,
      selectedMinor,
      selectedHandicap,
      selectedAdultSeatList,
      selectedMucSeatList,
      selectedhandicapSeatList,
    } = this.state;
    const seatItems = Array.from(this.theaterSeat.children);
    const selectedSeatCount = selectedAdult + selectedMinor;

    const isAdultSeatChack =
      !!selectedAdultSeatList.length &&
      selectedSeatCount === selectedAdultSeatList.length;
    const isMusSeatChack =
      !!selectedMucSeatList.length &&
      selectedSeatCount === selectedMucSeatList.length;
    const ishandicapChack =
      !!selectedhandicapSeatList.length &&
      selectedSeatCount === selectedhandicapSeatList.length;

    this.remainSeat.innerText =
      seatItems.length -
      selectedAdultSeatList.length -
      selectedMucSeatList.length -
      selectedhandicapSeatList.length;

    seatItems.forEach((elem, i) => {
      const handicapSeatElem = elem.classList.contains("handicap");
      const musSeatElem = elem.classList.contains("musseukbox");
      const seatElem = !handicapSeatElem && !musSeatElem;
      // 초기화
      if (selectedSeatCount === 0) {
        return elem.classList.add("disabled");
      } else {
        if (selectedSeatCount > 3) {
          !handicapSeatElem
            ? elem.classList.remove("disabled")
            : elem.classList.add("disabled");
        } else elem.classList.remove("disabled");
      }

      //   장애인 선택시
      if (selectedHandicap) {
        if (!handicapSeatElem) {
          elem.classList.add("disabled");
        } else {
          if (ishandicapChack) {
            elem.classList.add("disabled");
            // seatItems.map((elem) => elem.classList.add("disabled"));
            selectedhandicapSeatList.forEach((elem) => {
              seatItems[elem].classList.remove("disabled");
            });
          } else {
            // selectedSeatCount !== selectedAdultSeatList.length &&
            elem.classList.remove("disabled");
          }
        }
        return;
      }

      //   어른선택시
      if (!!selectedAdultSeatList.length) {
        if (!seatElem) {
          elem.classList.add("disabled");
        } else {
          if (isAdultSeatChack) {
            elem.classList.add("disabled");
            // seatItems.map((elem) => elem.classList.add("disabled"));
            selectedAdultSeatList.forEach((elem) => {
              seatItems[elem].classList.remove("disabled");
            });
          } else {
            // selectedSeatCount !== selectedAdultSeatList.length &&
            elem.classList.remove("disabled");
          }
        }
        return;
      }
      //   머슥 선택시
      if (!!selectedMucSeatList.length) {
        if (!musSeatElem) {
          elem.classList.add("disabled");
        } else {
          if (isMusSeatChack) {
            elem.classList.add("disabled");
            // seatItems.map((elem) => elem.classList.add("disabled"));
            selectedMucSeatList.forEach((elem) => {
              seatItems[elem].classList.remove("disabled");
            });
          } else {
            elem.classList.remove("disabled");
          }
          //   selectedSeatCount !== selectedMucSeatList.length &&
          //   elem.classList.remove("disabled");
        }
        return;
      }

      //   if (selectedAdult || selectedMinor) elem.classList.remove("disabled");
      //   else elem.classList.add("disabled");
    });
  }

  isCheckHandicap() {
    const { selectedAdult, selectedMinor } = this.state;
    if (
      selectedAdult + selectedMinor === 0 ||
      selectedAdult + selectedMinor >= 4 ||
      selectedAdult >= 4 ||
      selectedMinor >= 4
    )
      return false;
    return true;
  }

  //   초기 셋팅
  init() {
    this.adultItems.forEach((elem) => {
      if (elem.classList.contains("toggle")) {
        elem.classList.remove("toggle");
      }
    });
    this.minorItems.forEach((elem) => {
      if (elem.classList.contains("toggle")) {
        elem.classList.remove("toggle");
      }
    });

    this.setState({
      selectedAdult: 0,
      selectedMinor: 0,
      isCheckHandicap: true,
    });
  }

  eventBinding() {
    this.adultBtn.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const {
        selectedMinor,
        selectedAdult,
        selectedHandicap,
        selectedAdultSeatList,
        selectedhandicapSeatList,
        selectedMucSeatList,
      } = this.state;
      const totalSelectedSeact =
        !!selectedAdultSeatList.length ||
        !!selectedMucSeatList.length ||
        !!selectedhandicapSeatList.length;
      const { innerText } = e.target;
      const currentSelectedBtn = parseInt(innerText);
      if (selectedAdult === currentSelectedBtn) return;
      if (selectedHandicap && selectedAdult + currentSelectedBtn >= 4) {
        alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
        return;
      }
      if (
        totalSelectedSeact &&
        selectedMinor + currentSelectedBtn < selectedMinor + selectedAdult
      ) {
        alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
        this.resetSeat();
        this.init();
        return;
      }
      this.setState({
        selectedAdult: currentSelectedBtn,
      });
      this.adultItems[selectedAdult].classList.remove("toggle");
    });
    this.minorBtn.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const {
        selectedMinor,
        selectedAdult,
        selectedHandicap,
        selectedAdultSeatList,
        selectedMucSeatList,
        selectedhandicapSeatList,
      } = this.state;
      const { innerText } = e.target;
      const totalSelectedSeact =
        !!selectedAdultSeatList.length ||
        !!selectedMucSeatList.length ||
        !!selectedhandicapSeatList.length;
      const currentSelectedBtn = parseInt(innerText);
      if (selectedMinor === currentSelectedBtn) return;
      if (selectedHandicap && selectedAdult + currentSelectedBtn >= 4) {
        alert("머쓱관의 장애인 관람석은 3석으로, 3인 이하로 선택해주세요.");
        return;
      }
      if (
        totalSelectedSeact &&
        selectedAdult + currentSelectedBtn < selectedMinor + selectedAdult
      ) {
        alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
        this.resetSeat();
        this.init();
        return;
      }
      this.setState({
        selectedMinor: currentSelectedBtn,
      });
      this.minorItems[selectedMinor].classList.remove("toggle");
    });

    // 장애인 여부 체크
    this.handicap.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      if (!isChecked) {
        alert("선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까?");
        this.resetSeat();
        this.init();
      } else {
        this.setState({
          selectedHandicap: isChecked,
        });
      }
    });

    // 좌석체크
    this.theaterSeat.addEventListener("click", (e) => {
      const {
        selectedAdultSeatList,
        selectedMucSeatList,
        selectedhandicapSeatList,
        selectedAdult,
        selectedMinor,
        selectedHandicap,
        totalPrice,
      } = this.state;
      if (e.target.tagName !== "BUTTON") return;
      const musSeat = e.target.classList.contains("musseukbox");
      const handicap = e.target.classList.contains("handicap");
      const seat = !musSeat && !handicap;

      const targetIndex = Array.from(e.target.parentElement.children).findIndex(
        (v) => v === e.target
      );

      if (seat) {
        const isAdultPrice =
          selectedAdult >= this.state.selectedAdultSeatList.length + 1;

        if (
          selectedAdultSeatList.find((v) => v === targetIndex) === undefined
        ) {
          this.setState({
            selectedAdultSeatList: [
              ...this.state.selectedAdultSeatList,
              targetIndex,
            ],
            totalPrice: totalPrice + (isAdultPrice ? 10000 : 7000),
          });
          (e.target.dataset.price = isAdultPrice ? 10000 : 7000),
            e.target.classList.add("clicked");
        } else {
          this.setState({
            selectedAdultSeatList: selectedAdultSeatList.filter(
              (v) => v !== targetIndex
            ),
            totalPrice: totalPrice - parseInt(e.target.dataset.price),
          });
          e.target.dataset.price = 0;
          e.target.classList.remove("clicked");
        }
      } else if (musSeat) {
        const isMusPrice =
          selectedAdult >= this.state.selectedMucSeatList.length + 1;
        if (
          selectedAdult % 2 !== 0 ||
          selectedMinor % 2 !== 0 ||
          (selectedAdult + selectedMinor) % 2 !== 0
        ) {
          return alert(
            "선택하신 ‘MUSSEUKBOX’ 좌석은 2인 좌석입니다. 2인 단위로 인원을 선택해주세요."
          );
        }
        // 이러면 0번째... 없다고 인식
        // if (!selectedMucSeatList.find((v) => v === targetIndex)) {
        if (selectedMucSeatList.find((v) => v === targetIndex) === undefined) {
          this.setState({
            selectedMucSeatList: [
              ...this.state.selectedMucSeatList,
              targetIndex,
            ],
            totalPrice: totalPrice + (isMusPrice ? 10000 : 7000) * 0.7,
          });
          e.target.dataset.price = (isMusPrice ? 10000 : 7000) * 0.7;
          e.target.classList.add("clicked");
        } else {
          this.setState({
            selectedMucSeatList: selectedMucSeatList.filter(
              (v) => v !== targetIndex
            ),
            totalPrice: totalPrice - parseInt(e.target.dataset.price),
          });
          e.target.dataset.price = 0;
          e.target.classList.remove("clicked");
        }
      } else if (handicap) {
        if (!selectedHandicap) {
          return alert(
            "선택하신 좌석은 장애인석으로 일반고객은 예매할 수 없는 좌석입니다."
          );
        }
        // if (!selectedhandicapSeatList.find((v) => v === targetIndex)) {
        if (
          selectedhandicapSeatList.find((v) => v === targetIndex) === undefined
        ) {
          this.setState({
            selectedhandicapSeatList: [
              ...this.state.selectedhandicapSeatList,
              targetIndex,
            ],
            totalPrice: totalPrice + 5000,
          });
          e.target.dataset.price = 5000;
          e.target.classList.add("clicked");
        } else {
          this.setState({
            selectedhandicapSeatList: selectedhandicapSeatList.filter(
              (v) => v !== targetIndex
            ),
            totalPrice: totalPrice - parseInt(e.target.dataset.price),
          });
          e.target.dataset.price = 0;
          e.target.classList.remove("clicked");
        }
      }
    });
  }
}

export default Theater;
