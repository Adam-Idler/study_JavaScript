
window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining  = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 3600) % 24;
          return { timeRemaining, hours, minutes, seconds };
    }
    
    function updateClock() {
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        timerHours.textContent = String(timer.hours).replace(/^\w$/, '0' + timer.hours);
        timerMinutes.textContent = String(timer.minutes).replace(/^\w$/, '0' + timer.minutes);
        timerSeconds.textContent = String(timer.seconds).replace(/^\w$/, '0' + timer.seconds);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(intervalId);
      }
  }
  let intervalId = setInterval(updateClock, 1000);
  }
  countTimer('16 dec 2020');
});