import "@babel/polyfill"; // 이 라인을 지우지 말아주세요!
// 1. 템플릿 복사
const templates = {
  month: document.querySelector("#month").content,
  week: document.querySelector("#week").content
};

// 2. 요소 선택
const rootEl = document.querySelector(".container");
const dayPageEl = document.querySelector(".btn-day");
const weekPageEl = document.querySelector(".btn-week");
const monthPageEl = document.querySelector(".btn-month");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDay();
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

// 카테고리 작업
dayPageEl.addEventListener("click", e => {
  e.preventDefault();
});
weekPageEl.addEventListener("click", e => {
  e.preventDefault();
  drawWeekPage();
});
monthPageEl.addEventListener("click", e => {
  e.preventDefault();
  drawMonthPage();
});

// 인덱스페이지
async function drawindexPage() {
  drawMonthPage();
}

// 월간달력페이지
async function drawMonthPage(month, year) {
  const frag = document.importNode(templates.month, true);

  const monthAndYearEl = frag.querySelector(".monthAndYear");
  const nextEl = frag.querySelector(".btn-next");
  const prevEl = frag.querySelector(".btn-prev");
  const tbl = frag.querySelector(".calendar-body");

  nextEl.addEventListener("click", e => {
    e.preventDefault();
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    drawMonthPage(currentMonth, currentYear);
  });

  prevEl.addEventListener("click", e => {
    e.preventDefault();
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    drawMonthPage(currentMonth, currentYear);
  });

  let firstDay = new Date(year, month).getDay();
  console.log("firstDay", firstDay);

  console.log("sun", currentDay);

  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  monthAndYearEl.innerHTML = `${year}.${months[month]}`;

  tbl.textContent = "";

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg__today");
        }
        // if ( === 0) {
        //   cell.classList.add("bg__red");
        // }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
  rootEl.textContent = "";
  rootEl.appendChild(frag);
}

// 주간달력페이지
async function drawWeekPage() {
  const frag = document.importNode(templates.week, true);
  rootEl.textContent = "";
  rootEl.appendChild(frag);
}

// 일간달력페이지
async function drawDayPage() {
  const frag = document.importNode(templates.day, true);
  rootEl.textContent = "";
  rootEl.appendChild(frag);
}
drawindexPage();

// 페이지 그리는 함수 작성 순서
// 1. 템플릿 복사
// 2. 요소 선택
// 3. 필요한 데이터 불러오기
// 4. 내용 채우기
// 5. 이벤트 리스너 등록하기
// 6. 템플릿을 문서에 삽입
