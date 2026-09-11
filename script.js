// ==========================
// 요소 가져오기
// ==========================

const checkboxes = document.querySelectorAll(".task-check");

const progressBar = document.getElementById("progress-bar");
const progressNumber = document.getElementById("progress-number");

const homeProgressBar = document.getElementById("home-progress-bar");
const homeProgressNumber = document.getElementById("home-progress-number");

const themeToggle = document.getElementById("theme-toggle");


// ==========================
// 체크리스트 진행률 계산
// ==========================

function updateProgress() {

  // 체크박스가 없는 페이지에서는 실행하지 않음
  if (checkboxes.length === 0) {
    return;
  }


  const total = checkboxes.length;

  const checked =
    document.querySelectorAll(".task-check:checked").length;

  const percent =
    Math.round((checked / total) * 100);


  // Start Here 진행률
  if (progressBar) {
    progressBar.style.width = percent + "%";
  }


  if (progressNumber) {
    progressNumber.textContent = percent + "%";
  }


  // Home 진행률
  if (homeProgressBar) {
    homeProgressBar.style.width = percent + "%";
  }


  if (homeProgressNumber) {
    homeProgressNumber.textContent = percent + "%";
  }

}


// ==========================
// 체크리스트 저장
// ==========================

function saveChecklist() {

  if (checkboxes.length === 0) {
    return;
  }


  const checklistState = [];


  checkboxes.forEach(function(checkbox) {

    checklistState.push(checkbox.checked);

  });


  localStorage.setItem(
    "datalabChecklist",
    JSON.stringify(checklistState)
  );

}


// ==========================
// 체크리스트 불러오기
// ==========================

function loadChecklist() {

  if (checkboxes.length === 0) {
    return;
  }


  const savedData =
    localStorage.getItem("datalabChecklist");


  if (savedData) {

    const checklistState =
      JSON.parse(savedData);


    checkboxes.forEach(function(checkbox, index) {

      if (checklistState[index] !== undefined) {

        checkbox.checked =
          checklistState[index];

      }

    });

  }


  updateProgress();

}


// ==========================
// 체크박스 이벤트
// ==========================

if (checkboxes.length > 0) {

  checkboxes.forEach(function(checkbox) {

    checkbox.addEventListener(
      "change",
      function() {

        updateProgress();

        saveChecklist();

      }
    );

  });

}


// ==========================
// 다크모드 아이콘 변경
// ==========================

function updateThemeIcon() {

  // 다크모드 버튼이 없는 페이지에서는 종료
  if (!themeToggle) {
    return;
  }


  if (
    document.body.classList.contains("dark-mode")
  ) {

    themeToggle.textContent = "☀️";

  } else {

    themeToggle.textContent = "🌙";

  }

}


// ==========================
// 저장된 다크모드 불러오기
// ==========================

function loadTheme() {

  const savedTheme =
    localStorage.getItem("darkMode");


  if (savedTheme === "true") {

    document.body.classList.add("dark-mode");

  } else {

    document.body.classList.remove("dark-mode");

  }


  updateThemeIcon();

}


// ==========================
// 다크모드 버튼 이벤트
// ==========================

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    function() {

      document.body.classList.toggle(
        "dark-mode"
      );


      const isDarkMode =
        document.body.classList.contains(
          "dark-mode"
        );


      localStorage.setItem(
        "darkMode",
        isDarkMode
      );


      updateThemeIcon();

    }
  );

}


// ==========================
// 페이지 시작
// ==========================

loadTheme();

loadChecklist();