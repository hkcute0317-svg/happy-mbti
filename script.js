const QUESTIONS = [
  
  {
    id: 1,
    axis: "AP",
    direction: "A",
    badge: "행복의 성격 (A / P)",
    question: "[A 성향에 가까운 질문 삽입]"
  },

  {
    id: 2,
    axis: "AP",
    direction: "P",
    badge: "행복의 성격 (A / P)",
    question: "[P 성향에 가까운 질문 삽입]"
  },

  {
    id: 3,
    axis: "MD",
    direction: "M",
    badge: "행복의 지속 (M / D)",
    question: "[M 성향에 가까운 질문 삽입]"
  },

  {
    id: 4,
    axis: "MD",
    direction: "D",
    badge: "행복의 지속 (M / D)",
    question: "[D 성향에 가까운 질문 삽입]"
  },

  {
    id: 5,
    axis: "TL",
    direction: "T",
    badge: "행복의 관계 (T / L)",
    question: "[T 성향에 가까운 질문 삽입]"
  },

  {
    id: 6,
    axis: "TL",
    direction: "L",
    badge: "행복의 관계 (T / L)",
    question: "[L 성향에 가까운 질문 삽입]"
  },

  {
    id: 7,
    axis: "RV",
    direction: "R",
    badge: "행복의 환경 (R / V)",
    question: "[R 성향에 가까운 질문 삽입]"
  },

  {
    id: 8,
    axis: "RV",
    direction: "V",
    badge: "행복의 환경 (R / V)",
    question: "[V 성향에 가까운 질문 삽입]"
  }

];



/* =========================
   결과 데이터
========================= */

const TYPE_DATA = {

  AMTR: {
    title: "행복 설계자",
  },

  AMTV: {
    title: "모험의 선구자",
  },

  AMLR: {
    title: "고독한 개척자",
  },

  AMLV: {
    title: "미지의 탐험가",
  },

  ADTR: {
    title: "행복의 정원사",
  },

  ADTV: {
    title: "미래의 혁신가",
  },

  ADLR: {
    title: "성취의 장인",
  },

  ADLV: {
    title: "지식의 탐구자",
  },

  PMTR: {
    title: "추억의 이야기꾼",
  },

  PMTV: {
    title: "축제의 모험가",
  },

  PMLR: {
    title: "행복 수집가",
  },

  PMLV: {
    title: "자유로운 방랑자",
  },

  PDTR: {
    title: "행복의 수호자",
  },

  PDTV: {
    title: "추억의 여행가",
  },

  PDLR: {
    title: "평온한 안식처",
  },

  PDLV: {
    title: "일상의 발견자",
  }

};



/* =========================
   변수
========================= */

let currentQuestionIndex = 0;

let userAnswers = [];


/* 특수질문 관련 */

let specialQuestions = [];

let currentSpecialQuestionIndex = 0;

let specialAnswers = {};

let finalScores = {};



/* =========================
   이미지 회전
========================= */

let rotation = 0;


function rotateTurnImage(degree) {

  rotation += degree;

  const image =
    document.querySelector(".turn-image");

  if (image) {

    image.style.transform =
      `rotate(${rotation}deg)`;

  }

}



/* 회전 초기화 */

function resetTurnImage() {

  rotation = 0;

  const image =
    document.querySelector(".turn-image");

  if (image) {

    image.style.transform =
      "rotate(0deg)";

  }

}



/* =========================
   화면 이동
========================= */

function goToScreen(screenId) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {

      screen.classList.remove("active");

    });


  document
    .getElementById(screenId)
    .classList.add("active");

}



/* =========================
   테스트 시작
========================= */

function startTest() {

  currentQuestionIndex = 0;

  userAnswers = [];

  specialQuestions = [];

  currentSpecialQuestionIndex = 0;

  specialAnswers = {};

  finalScores = {};

  resetTurnImage();

  goToScreen("question-screen");

  renderQuestion();

  rotateTurnImage(90);

}



/* =========================
   질문 표시
========================= */

function renderQuestion() {

  const q =
    QUESTIONS[currentQuestionIndex];


  /* 질문 번호 */

  document.getElementById(
    "question-counter"
  ).innerText =
    `질문 ${currentQuestionIndex + 1} / ${QUESTIONS.length}`;



  /* 진행률 */

  const percent =
    Math.round(
      ((currentQuestionIndex + 1) /
        QUESTIONS.length) * 100
    );


  document.getElementById(
    "progress-percent"
  ).innerText =
    `${percent}%`;


  document.getElementById(
    "progress-bar"
  ).style.width =
    `${percent}%`;



  /* 축 이름 */

  document.getElementById(
    "axis-badge"
  ).innerText =
    q.badge;



  /* 질문 */

  document.getElementById(
    "question-text"
  ).innerText =
    q.question;



  /* 양쪽 설명 */

  const scaleLeft =
    document.getElementById("scale-left");

  const scaleRight =
    document.getElementById("scale-right");


  if (scaleLeft) {

    scaleLeft.innerText =
      q.direction;

  }


  if (scaleRight) {

    const opposite =
      getOppositeType(q.direction);

    scaleRight.innerText =
      opposite;

  }



  /* 이전 질문 버튼 */

  const prevBtn =
    document.getElementById("prev-btn");


  if (currentQuestionIndex > 0) {

    prevBtn.classList.remove("hidden");

  } else {

    prevBtn.classList.add("hidden");

  }



  /* 기존 선택 초기화 */

  document
    .querySelectorAll(".scale-btn")
    .forEach(button => {

      button.classList.remove("selected");

    });



  /* 이전에 선택한 답이 있다면 표시 */

  if (
    userAnswers[currentQuestionIndex] !== undefined
  ) {

    const selectedIndex =
      userAnswers[currentQuestionIndex];

    const buttons =
      document.querySelectorAll(".scale-btn");

    if (buttons[selectedIndex]) {

      buttons[selectedIndex]
        .classList.add("selected");

    }

  }

}



/* =========================
   반대 성향 가져오기
========================= */

function getOppositeType(type) {

  const opposites = {

    A: "P",
    P: "A",

    M: "D",
    D: "M",

    T: "L",
    L: "T",

    R: "V",
    V: "R"

  };


  return opposites[type];

}



/* =========================
   7단계 척도 선택
========================= */

function selectScale(index) {

  const buttons =
    document.querySelectorAll(".scale-btn");


  buttons.forEach(button => {

    button.classList.remove("selected");

  });


  if (buttons[index]) {

    buttons[index].classList.add("selected");

  }



  /* 답 저장 */

  userAnswers[currentQuestionIndex] =
    index;



  /* 다음 질문 */

  setTimeout(() => {

    if (
      currentQuestionIndex + 1 <
      QUESTIONS.length
    ) {

      currentQuestionIndex++;

      renderQuestion();

      rotateTurnImage(90);

    } else {

      calculateResult();

    }

  }, 250);

}



/* =========================
   이전 질문
========================= */

function prevQuestion() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    renderQuestion();

    rotateTurnImage(-90);

  }

}



/* =========================
   점수 계산
========================= */

function calculateResult() {

  goToScreen("loading-screen");


  setTimeout(() => {

    const scores = {

      A: 0,
      P: 0,

      M: 0,
      D: 0,

      T: 0,
      L: 0,

      R: 0,
      V: 0

    };



    userAnswers.forEach((answerIndex, questionIndex) => {

      const q =
        QUESTIONS[questionIndex];


      if (answerIndex === undefined) {
        return;
      }


      const weights = [
        3,
        2,
        1,
        0,
        -1,
        -2,
        -3
      ];


      const weight =
        weights[answerIndex];


      if (weight > 0) {

        scores[q.direction] += weight;

      } else if (weight < 0) {

        scores[
          getOppositeType(q.direction)
        ] += Math.abs(weight);

      }

    });



    /* 점수 저장 */

    finalScores = scores;


    /* =====================
       동점 축 찾기
    ===================== */

    specialQuestions = [];



    if (scores.A === scores.P) {

      specialQuestions.push({
        axis: "AP",
        badge: "행복의 성격 (A / P)",
        question: "A랑 P가 같을 때의 특수질문",
        option1: "A 유형",
        option2: "P 유형",
        type1: "A",
        type2: "P"
      });

    }



    if (scores.M === scores.D) {

      specialQuestions.push({
        axis: "MD",
        badge: "행복의 지속 (M / D)",
        question: "M이랑 D가 같을 때의 특수질문",
        option1: "M 유형",
        option2: "D 유형",
        type1: "M",
        type2: "D"
      });

    }



    if (scores.T === scores.L) {

      specialQuestions.push({
        axis: "TL",
        badge: "행복의 관계 (T / L)",
        question: "T랑 L이 같을 때의 특수질문",
        option1: "T 유형",
        option2: "L 유형",
        type1: "T",
        type2: "L"
      });

    }



    if (scores.R === scores.V) {

      specialQuestions.push({
        axis: "RV",
        badge: "행복의 환경 (R / V)",
        question: "R이랑 V가 같을 때의 특수질문",
        option1: "R 유형",
        option2: "V 유형",
        type1: "R",
        type2: "V"
      });

    }



    /* =====================
       동점이 있다면
       특수질문 시작
    ===================== */

    if (specialQuestions.length > 0) {

      currentSpecialQuestionIndex = 0;

      setTimeout(() => {

        goToScreen(
          "special-question-screen"
        );

        renderSpecialQuestion();

        rotateTurnImage(90);

      }, 300);

      return;

    }



    /* 동점이 없다면 바로 결과 */

    const resultCode =
      getResultCode(scores);


    setTimeout(() => {

      showResultScreen(
        resultCode,
        scores
      );

    }, 300);

  }, 1200);

}



/* =========================
   결과 코드 만들기
========================= */

function getResultCode(scores) {

  const codeAxis1 =
    scores.A > scores.P
      ? "A"
      : "P";


  const codeAxis2 =
    scores.M > scores.D
      ? "M"
      : "D";


  const codeAxis3 =
    scores.T > scores.L
      ? "T"
      : "L";


  const codeAxis4 =
    scores.R > scores.V
      ? "R"
      : "V";


  return `${codeAxis1}${codeAxis2}${codeAxis3}${codeAxis4}`;

}



/* =========================
   특수질문 표시
========================= */

function renderSpecialQuestion() {

  const q =
    specialQuestions[
      currentSpecialQuestionIndex
    ];


  document.getElementById(
    "special-question-counter"
  ).innerText =
    `추가 질문 ${
      currentSpecialQuestionIndex + 1
    } / ${specialQuestions.length}`;


  document.getElementById(
    "special-question-axis"
  ).innerText =
    q.axis;


  document.getElementById(
    "special-axis-badge"
  ).innerText =
    q.badge;


  document.getElementById(
    "special-question-text"
  ).innerText =
    q.question;


  document.getElementById(
    "special-option-1"
  ).innerText =
    q.option1;


  document.getElementById(
    "special-option-2"
  ).innerText =
    q.option2;

}



/* =========================
   특수질문 답변
========================= */

function selectSpecialAnswer(index) {

  const q =
    specialQuestions[
      currentSpecialQuestionIndex
    ];


  if (index === 0) {

    specialAnswers[q.axis] =
      q.type1;

  } else {

    specialAnswers[q.axis] =
      q.type2;

  }



  /* 다음 특수질문 */

  if (
    currentSpecialQuestionIndex + 1 <
    specialQuestions.length
  ) {

    currentSpecialQuestionIndex++;

    renderSpecialQuestion();

    rotateTurnImage(90);

  } else {

    /* 모든 특수질문 완료 */

    const finalCode =
      buildFinalCode();


    showResultScreen(
      finalCode,
      finalScores
    );

  }

}



/* =========================
   최종 코드 만들기
========================= */

function buildFinalCode() {

  const axis1 =
    specialAnswers.AP ||
    (
      finalScores.A > finalScores.P
        ? "A"
        : "P"
    );


  const axis2 =
    specialAnswers.MD ||
    (
      finalScores.M > finalScores.D
        ? "M"
        : "D"
    );


  const axis3 =
    specialAnswers.TL ||
    (
      finalScores.T > finalScores.L
        ? "T"
        : "L"
    );


  const axis4 =
    specialAnswers.RV ||
    (
      finalScores.R > finalScores.V
        ? "R"
        : "V"
    );


  return `${axis1}${axis2}${axis3}${axis4}`;

}



/* =========================
   결과 표시
========================= */

function showResultScreen(
  code,
  scores
) {

  document.getElementById(
    "result-type-code"
  ).innerText =
    code;



  const data =
    TYPE_DATA[code] || {

      title:
        `${code}형 행복 탐색가`,

      desc:
        `당신은 ${code} 축의 성향을 가진 사람입니다! 부서원들과 상세 유형 설명을 완성해나가세요.`,

      activities:
        "일상 속 소소한 기쁨을 기록하는 행복 일기 작성하기"

    };



  document.getElementById(
    "result-type-title"
  ).innerText =
    `「${data.title}」`;



  document.getElementById(
    "trait-desc"
  ).innerText =
    data.desc || "상세 설명을 준비 중입니다.";



  document.getElementById(
    "activity-desc"
  ).innerText =
    data.activities || "추천 활동을 준비 중입니다.";



  /* =====================
     축별 결과
  ===================== */

  document.getElementById(
    "axis1-label"
  ).innerText =
    `${code[0]} (${
      code[0] === "A"
        ? "성취"
        : "즐거움"
    })`;


  document.getElementById(
    "axis2-label"
  ).innerText =
    `${code[1]} (${
      code[1] === "M"
        ? "순간"
        : "지속"
    })`;


  document.getElementById(
    "axis3-label"
  ).innerText =
    `${code[2]} (${
      code[2] === "T"
        ? "함께"
        : "혼자"
    })`;


  document.getElementById(
    "axis4-label"
  ).innerText =
    `${code[3]} (${
      code[3] === "R"
        ? "안정"
        : "변화"
    })`;


  goToScreen(
    "result-screen"
  );

}



/* =========================
   다시 시작
========================= */

function restartTest() {

  resetTurnImage();

  goToScreen(
    "start-screen"
  );

}
