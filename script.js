const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
});

function getNASA(){
  fetch ('https://api.nasa.gov/planetary/apod?api_key=64A1aTcNy0K4VwUM9f7S7sTmR1VgFAKy8ZfpXPVz')
    .then (resp1 => resp1.json())
    .then ((data2) => {
        console.log(data2);
        document.getElementById('nasaImg').src = data2.url;
        document.getElementById('nasaDesc').innerHTML = data2.explanation;
        document.getElementById('nasaTitle').innerHTML = data2.title;
  })
};

function getNASA2(){
  fetch ('https://api.nasa.gov/EPIC/api/natural?api_key=64A1aTcNy0K4VwUM9f7S7sTmR1VgFAKy8ZfpXPVz')
    .then (resp1 => resp1.json())
    .then ((data2) => {
        console.log(data2);
        //document.getElementById('nasaImg').src = data2.url;
        //document.getElementById('nasaDesc').innerHTML = data2.explanation;
        //var imag = "https://epic.gsfc.nasa.gov/archive/natural/2020/05/02/png/" + data2[0].image + ".png"
        var imag = data2[0].identifier.substring(0,8);
        var datee = imag.substring(0,4) + "/" + imag.substring(4,6) + "/" + imag.substring(6,8);
        var imag1 = "https://epic.gsfc.nasa.gov/archive/natural/" + datee + "/png/" + data2[0].image + ".png"
        document.getElementById('nasaTitle1').innerHTML = data2[0].caption;
        document.getElementById('nasaImg1').src = imag1;
        document.getElementById('nasaDesc1').innerHTML = "Photo Date: " + datee;
  })
};


function getWeather(){
  fetch ('http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=a7b79d7439e6329b4e127348554f2205')
    .then (resp => resp.json())
    .then ((data1) => {
        console.log(data1);
        //document.getElementById('activity').innerHTML = (data.activity);
        document.getElementById('weatherTemp').innerHTML = Math.ceil(data1.main.temp);
        var icon = "http://openweathermap.org/img/w/" + data1.weather[0].icon + ".png";
        //document.getElementsById('weatherIcon').src = icon;
        //document.getElementsById('weatherIcon').src = 'https://en.wikipedia.org/wiki/Portable_Network_Graphics#/media/File:PNG_transparency_demonstration_1.png';
        document.getElementById("weatherIcon").src = icon;
        document.getElementById('weatherDesc').innerHTML = data1.weather[0].description;
        document.getElementById('weatherLoc').innerHTML = data1.name;


  })
};

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
};

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
};

function getActivity(){
  fetch ('http://www.boredapi.com/api/activity')
    .then (response => response.json())
    .then ((data) => {
        console.log(data);
        document.getElementById('activity').innerHTML = (data.activity);
        document.getElementById('accessibility').innerHTML = ("Accessibility: " + data.accessibility + " / 1");
        document.getElementById('participants').innerHTML = ("Participants:" + data.participants);
        document.getElementById('price').innerHTML = ("Price: " + data.price + " / 1");
        document.getElementById('type').innerHTML = ("Type: " + data.type);

  })
};

var yourscore = 0;
var total = 0;

function completeFunction(){
  yourscore = yourscore + 1;
  document.getElementById('userScore').innerHTML = yourscore;
  getActivity();
  //getWeather();
};

function skipFunction(){
  total = total + 1;
  document.getElementById('skips').innerHTML = total;
  getActivity();
};

function textToSpeech (text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = document.getElementById("talk").value;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
};

function speechToText () {
  const btn = document.querySelector('.speakNow');
  const content = document.querySelector('.saysomething');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function() {
      console.log('voice activated');
    };

    recognition.onresult = function(event){
      const current = event.resultIndex;

      const transcript = event.results[current][0].transcript;
      content.textContent = transcript;
    };

    btn.addEventListener('click', () => {
      recognition.start();
    });
};

function textToSpeechNASA (text) {

  fetch ('https://api.nasa.gov/planetary/apod?api_key=64A1aTcNy0K4VwUM9f7S7sTmR1VgFAKy8ZfpXPVz')
    .then (resp1 => resp1.json())
    .then ((data2) => {
        console.log(data2);
        document.getElementById('nasaImg').src = data2.url;
        document.getElementById('nasaDesc').innerHTML = data2.explanation;
        document.getElementById('nasaTitle').innerHTML = data2.title;

        const speech = new SpeechSynthesisUtterance();
        speech.text = data2.explanation;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
  })
};

function getRate(){
  fetch (' https://prime.exchangerate-api.com/v5/3f9a1778918fa566541933c6/latest/CAD')
    .then (response => response.json())
    .then ((data) => {
        console.log(data);
        document.getElementById('AUD').innerHTML = ("Austrain Dollar: " + data.conversion_rates.AUD);
        document.getElementById('EUR').innerHTML = ("Euro: " + data.conversion_rates.EUR);
        document.getElementById('GBP').innerHTML = ("Pound: " + data.conversion_rates.GBP);
        document.getElementById('USD').innerHTML = ("US Dollar: " + data.conversion_rates.USD);
        document.getElementById('ZAR').innerHTML = ("South African Rand: " + data.conversion_rates.ZAR);
        document.getElementById('lastUpdated').innerHTML = ("Last Updated: " + new Date(data.time_last_update*1000));

  })
};
