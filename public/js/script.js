var socket = io();
var mainVideo = document.getElementById("main-video");
var secondaryVideo = document.getElementById("secondary-video");

document.getElementById("cont").style.display = "none";
document.getElementById("cont2").style.display = "flex";

const targetDate = new Date('2025-03-05T17:00:00+07:00');

function load() {
  let now = new Date();
  const result = now.toLocaleDateString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });

  let _hours = now.getHours();
  let _minutes = now.getMinutes();
  let _seconds = now.getSeconds();
  // Add leading zeros if needed
  _hours = (_hours < 10 ? "0" : "") + _hours;
  _minutes = (_minutes < 10 ? "0" : "") + _minutes;
  _seconds = (_seconds < 10 ? "0" : "") + _seconds;
  let timeString = _hours + " : " + _minutes + " : " + _seconds;
  document.getElementById("time1H").textContent = timeString;

  let difference = targetDate - now;

  // Calculate the remaining time in days, hours, minutes, and seconds
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // Add leading zeros if needed
  days = (days < 10 ? "0" : "") + days;
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Display the countdown
  document.getElementById("time1").textContent = days;
  document.getElementById("time2").textContent = hours;
  document.getElementById("time3").textContent = minutes;
  document.getElementById("time4").textContent = seconds;
}

socket.on('index', (check) => {
  // stop video
  secondaryVideo
  if (check) {
    secondaryVideo.style.display = "block";
    secondaryVideo.play();
    secondaryVideo.addEventListener("ended", function () {
      secondaryVideo.style.display = "none";

      load()
      document.getElementById("cont").style.display = "flex";
      document.getElementById("cont2").style.display = "none";

      setInterval(() => {
        load()
      }, 1000);

    });
  }
});

setInterval(() => {
  load()
}, 1000);