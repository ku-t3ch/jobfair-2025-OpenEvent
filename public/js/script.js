var socket = io();
var mainVideo = document.getElementById("main-video");
var secondaryVideo = document.getElementById("secondary-video");

document.getElementById("cont").style.display = "none";

const targetDate = new Date('2025-03-05T17:00:00+07:00');

function load() {
  let now = new Date();
  const result = now.toLocaleDateString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });
  document.getElementById("date").textContent = result;

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

      setInterval(() => {
        load()
      }, 1000);

    });
  }
});