const QUESTIONS = [

  {
    id: 1,

    axis: "AP",

    badge: "행복의 성격 (A / P)",

    question:
      "주말에 시간이 생겼을 때, 나를 더 행복하게 만드는 것은?",

    optionA: {
      text:
        "🎯 세워둔 목표를 달성하거나 공부를 끝냈을 때의 뿌듯함",

      type: "A"
    },

    optionB: {
      text:
        "🍕 맛있는 음식을 먹으며 재밌는 영상을 볼 때의 즐거움",

      type: "P"
    }
  },


  {
    id: 2,

    axis: "MD",

    badge: "행복의 지속 (M / D)",

    question:
      "내가 더 좋아하는 행복의 느낌은 어떤 쪽인가요?",

    optionA: {
      text:
        "⚡ 롤러코스터처럼 짧고 강렬하게 터지는 듯한 행복",

      type: "M"
    },

    optionB: {
      text:
        "🌿 잔잔하고 평온하게 오랫동안 마음속에 남는 행복",

      type: "D"
    }
  },


  {
    id: 3,

    axis: "TL",

    badge: "행복의 관계 (T / L)",

    question:
      "기분 좋은 일이 생겼을 때 나의 행동에 더 가까운 것은?",

    optionA: {
      text:
        "👥 친구들이나 가족에게 바로 알려서 같이 기뻐한다",

      type: "T"
    },

    optionB: {
      text:
        "🎧 나만의 공간에서 혼자 차분하게 여유를 즐긴다",

      type: "L"
    }
  },


  {
    id: 4,

    axis: "RV",

    badge: "행복의 환경 (R / V)",

    question:
      "새 학기가 시작되었을 때 더 기대되는 상황은?",

    optionA: {
      text:
        "🏫 친한 친구들과 익숙하고 편안하게 교실 생활을 할 때",

      type: "R"
    },

    optionB: {
      text:
        "✨ 새로운 친구들을 만나고 색다른 활동에 도전할 때",

      type: "V"
    }
  }

];



/* 테스트용 결과 데이터 */

const TYPE_DATA = {

  "AMTR": {

    title: "성취 중심의 안정적 리더형",

    desc:
      "목표를 달성하면서 얻는 성취감이 크며, 친한 친구들과 함께 안정적인 환경에서 협력할 때 깊은 행복을 느낍니다.",

    activities:
      "친구들과 목표 달성 챌린지, 정기적인 동아리 활동"

  },


  "PDLV": {

    title: "자유로운 탐험가형",

    desc:
      "새로운 경험과 다양성을 좋아하며, 혼자만의 시간을 가질 때 마음이 편안해지고 오래 지속되는 여유로운 즐거움을 선호합니다.",

    activities:
      "새로운 취미 도전하기, 혼자서 떠나는 산책과 음악 감상"

  }

};



let currentQuestionIndex = 0;

let userAnswers = [];
let rotation = 0;

function rotateTurnImage() {
  rotation += 90;

  const image = document.querySelector(".turn-image");

  if (image) {
    image.style.transform = `rotate(${rotation}deg)`;
  }
}



/* 화면 이동 */

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



/* 테스트 시작 */

function startTest() {

  currentQuestionIndex = 0;

  userAnswers = [];

  goToScreen("question-screen");

    renderQuestion();

  renderQuestion();

}



/* 질문 표시 */

function renderQuestion() {

  const q =
    QUESTIONS[currentQuestionIndex];


  document.getElementById(
    "question-counter"
  ).innerText =
    `질문 ${currentQuestionIndex + 1} / ${QUESTIONS.length}`;


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


  document.getElementById(
    "axis-badge"
  ).innerText =
    q.badge;


  document.getElementById(
    "question-text"
  ).innerText =
    q.question;


  document.getElementById(
    "option-a-text"
  ).innerText =
    q.optionA.text;


  document.getElementById(
    "option-b-text"
  ).innerText =
    q.optionB.text;



  const prevBtn =
    document.getElementById("prev-btn");


  if (currentQuestionIndex > 0) {

    prevBtn.classList.remove("hidden");

  } else {

    prevBtn.classList.add("hidden");

  }

}



/* 선택 */

function selectOption(choice) {

  const q =
    QUESTIONS[currentQuestionIndex];


  const selectedType =
    choice === "A"
      ? q.optionA.type
      : q.optionB.type;


  userAnswers[currentQuestionIndex] =
    selectedType;



  if (
    currentQuestionIndex + 1 <
    QUESTIONS.length
  ) {

    currentQuestionIndex++;

    renderQuestion();

      rotateTurnImage();

  } else {

    calculateResult();

  }

}



/* 이전 질문 */

function prevQuestion() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    renderQuestion();
    
    rotateTurnImage();

  }

}



/* 결과 계산 */

function calculateResult() {

  goToScreen("loading-screen");


  setTimeout(() => {

    const counts = {

      A: 0,
      P: 0,

      M: 0,
      D: 0,

      T: 0,
      L: 0,

      R: 0,
      V: 0

    };


    userAnswers.forEach(type => {

      if (
        counts[type] !== undefined
      ) {

        counts[type]++;

      }

    });



    const codeAxis1 =
      counts.A >= counts.P
        ? "A"
        : "P";


    const codeAxis2 =
      counts.M >= counts.D
        ? "M"
        : "D";


    const codeAxis3 =
      counts.T >= counts.L
        ? "T"
        : "L";


    const codeAxis4 =
      counts.R >= counts.V
        ? "R"
        : "V";



    const resultCode =
      `${codeAxis1}${codeAxis2}${codeAxis3}${codeAxis4}`;



    showResultScreen(
      resultCode,
      counts
    );

  }, 1200);

}



/* 결과 표시 */

function showResultScreen(
  code,
  counts
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
    data.desc;


  document.getElementById(
    "activity-desc"
  ).innerText =
    data.activities;



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



/* 다시 시작 */

function restartTest() {

  goToScreen(
    "start-screen"
  );

}
