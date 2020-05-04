var tabs = document.querySelectorAll('[data-tab-target]')
var tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    var target = document.querySelector(tab.dataset.tabTarget)
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
        var imag = data2[0].identifier.substring(0,8);
        var datee = imag.substring(0,4) + "/" + imag.substring(4,6) + "/" + imag.substring(6,8);
        document.getElementById('nasaTitle1').innerHTML = data2[0].caption;
        document.getElementById('nasaDesc1').innerHTML = "Photo Date: " + datee;
        for (var i = 0; i < data2.length; i++)
        {
          var imag1 = "https://epic.gsfc.nasa.gov/archive/natural/" + datee + "/png/" + data2[i].image + ".png";
          document.getElementById('nasaImg' + i).src = imag1;
        }
        document.getElementById('nasaDesc1').innerHTML = "Photo Date: " + datee;
  })
};

function getWeather(){
  var enteredLoc = document.getElementById('location').value;
  var buildURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredLoc + '&units=metric&appid=a7b79d7439e6329b4e127348554f2205';
  fetch (buildURL)
    .then (resp => resp.json())
    .then ((data1) => {
        console.log(data1);
        document.getElementById('weatherTemp').innerHTML = Math.ceil(data1.main.temp);
        var icon = "http://openweathermap.org/img/w/" + data1.weather[0].icon + ".png";
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
  document.getElementById('currTime').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
};

function checkTime(i) {
  if (i < 10) {i = "0" + i};
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
};

function skipFunction(){
  total = total + 1;
  document.getElementById('skips').innerHTML = total;
  getActivity();
};

function textToSpeech (text) {
  var speech = new SpeechSynthesisUtterance();
  speech.text = document.getElementById("talk").value;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
};

function speechToText () {
  var btn = document.querySelector('#speakNow');
  var content = document.querySelector('#saySomething');

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
      console.log('voice activated');
    };

    recognition.onresult = function(event){
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
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
        var speech = new SpeechSynthesisUtterance();
        speech.text = data2.explanation;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
  })
};

function getRate(){
  var enteredCurrency = document.getElementById('firstCurrency').value;
  var buildURL = 'https://prime.exchangerate-api.com/v5/3f9a1778918fa566541933c6/latest/' + enteredCurrency;

  //var otherCurrency = document.getElementById('secondCurrency').value;
  //var otherCurrencyVal = 'data.conversion_rates.' + otherCurrency;

  fetch (buildURL)
    .then (response => response.json())
    .then ((data) => {
        console.log(data);
        //document.getElementById('yourExchangeRate').innerHTML = (otherCurrencyVal.value);
        //document.getElementById('yourExchangeRate').innerHTML = otherCurrecyVal
        document.getElementById('AUD').innerHTML = ("Australian Dollar: " + data.conversion_rates.AUD);
        document.getElementById('CAD').innerHTML = ("Canadian Dollar: " + data.conversion_rates.CAD);
        document.getElementById('EUR').innerHTML = ("Euro: " + data.conversion_rates.EUR);
        document.getElementById('GBP').innerHTML = ("Pound: " + data.conversion_rates.GBP);
        document.getElementById('USD').innerHTML = ("US Dollar: " + data.conversion_rates.USD);
        document.getElementById('ZAR').innerHTML = ("South African Rand: " + data.conversion_rates.ZAR);
        document.getElementById('lastUpdated').innerHTML = ("Last Updated: " + new Date(data.time_last_update*1000));
  })
};
