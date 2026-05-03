function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullPageElem = document.querySelectorAll(".fullElem");
  var backBtns = document.querySelectorAll(".back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullPageElem[elem.id].style.display = "block";
    });
  });

  backBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      fullPageElem[index].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");
    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}> imp </span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskDetailsInput = "";
    taskInput.value = "";
    taskCheckbox.checked = flase;
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      ` <div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value="${savedData}">
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      console.log("hello");

      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuote = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch(
      "https://quoteslate.vercel.app/api/quotes/random?tags=motivation"
    );
    let data = await response.json();

    motivationQuote.innerHTML = data.quote;
    motivationAuthor.innerHTML = `— ${data.author}`;
  }

  fetchQuote();
}
motivationalQuote();

function pomodoroTimer(){
  let timer = document.querySelector(".pomo-timer h2");
var startBtn = document.querySelector(".pomo-timer .start-timer");
var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
var resetBtn = document.querySelector(".pomo-timer .reset-timer");
var session = document.querySelector(".pomodoro-fullPage .session");
var isWorkSession = true;

let totalSeconds = 25 * 60;
let timerInterval = null;

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
    seconds
  ).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(timerInterval);

  if (isWorkSession) {
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = false;
        clearInterval(timerInterval);
        timer.innerHTML = "05:00";
        session.innerHTML = "Break Time";
        totalSeconds = 5 * 60;
      }
    }, 1);
  } else {
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = true;
        clearInterval(timerInterval);
        timer.innerHTML = "25:00";
        session.innerHTML = "Work Session";
        totalSeconds = 25 * 60;
      }
    }, 1);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
}
function resetTimer() {
  totalSeconds = 25 * 60;
  clearInterval(timerInterval);
  updateTimer();
}
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

}
pomodoroTimer()

function weatherFunctionality(){
  const API_KEY = "c5843abca656422fad2111646260501";
var city = 'Surat';

var header1Time = document.querySelector('.header1 h1');
var header1Date = document.querySelector('.header1 h2');
var header2Temp = document.querySelector('.header2 h2');
var header2Condition = document.querySelector('.header2 h4');
var header2Precipitiation = document.querySelector('.header2 .precipitation');
var header2Humidity = document.querySelector('.header2 .humidity');
var header2Wind = document.querySelector('.header2 .wind');
var data = null
async function weatherAPICall() {
  var response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );
  data = await response.json();
  header2Temp.innerHTML=`${data.current.temp_c}°C`
  header2Condition.innerHTML=`${data.current.condition.text}`
  header2Precipitiation.innerHTML= `Heat index: ${data.current.heatindex_c}%`
  header2Humidity.innerHTML=`Humidity:${data.current.humidity}%`
  header2Wind.innerHTML=`Wind: ${data.current.wind_kph}km/h`
}
weatherAPICall();

function timeDate() {
  const totalDaysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const totalMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var date = new Date();

  var dayOfWeek = totalDaysOfWeek[date.getDay()];
  var hours = date.getHours();
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');

  var tarikh = date.getDate();
  var month = totalMonths[date.getMonth()];
  var year = date.getFullYear();

  header1Date.innerHTML = `${tarikh} ${month} ${year}`;

  if (hours >= 12) {
    header1Time.innerHTML =
      `${dayOfWeek}, ${String(hours === 12 ? 12 : hours -12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM`;
  } else {
    header1Time.innerHTML =
      `${dayOfWeek}, ${String(hours === 0 ? 12 : hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} AM`;
  }
}

timeDate();
setInterval(timeDate, 1000);

}
weatherFunctionality()

function changeTheame(){
  var theme=document.querySelector('.theme');
var rootElement=document.documentElement

var flag=0
theme.addEventListener('click',function(){
  if(flag==0){
    rootElement.style.setProperty('--tri','#7A1CAC')
  rootElement.style.setProperty('--tri1','#AD49E1')
  rootElement.style.setProperty('--tri2','#2E073F')
  rootElement.style.setProperty('--tri3','#EBD3F8')
  flag=1
  }else if(flag==1){
    rootElement.style.setProperty('--tri','#8FA31E')
  rootElement.style.setProperty('--tri1','#F6F0D7')
  rootElement.style.setProperty('--tri2','#556B2F')
  rootElement.style.setProperty('--tri3','#043915')
  flag=2
  }else if(flag==2){
    rootElement.style.setProperty('--tri','#D25353')
  rootElement.style.setProperty('--tri1','#d25353ff')
  rootElement.style.setProperty('--tri2','#9E3B3B')
  rootElement.style.setProperty('--tri3','#FFEAD3')
  flag=3
  }else if(flag==3){
    rootElement.style.setProperty('--tri','#EBF4DD')
  rootElement.style.setProperty('--tri1','#FEA405')
  rootElement.style.setProperty('--tri2','#8AA624')
  rootElement.style.setProperty('--tri3','#FFFFF0')
  flag=4
  }else if(flag==4){
    rootElement.style.setProperty('--tri','#F5AD18')
  rootElement.style.setProperty('--tri1','#A3485A')
  rootElement.style.setProperty('--tri2','#561530')
  rootElement.style.setProperty('--tri3','#F5DAA7')
  flag=0
  }

})
}
changeTheame()