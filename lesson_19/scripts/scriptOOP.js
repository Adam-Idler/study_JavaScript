window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Timer
  class Timer {
    constructor (deadline) {
      this.deadlineDate = deadline;
    }
    countTimer() {
      const _this = this;
      let timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');
      
      function getTimeRemaining() {
        let dateStop = new Date(_this.deadlineDate).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining  = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 3600) % 24;
            return { timeRemaining, hours, minutes, seconds };
      }

      let intervalId = setInterval(updateClock, 1000);

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
      updateClock();
    }
  }

  const timer = new Timer('19 dec 2020');
  timer.countTimer();

  // Menu
  class Menu {
    toggleMenu() {
      const btnMenu = document.querySelector('.menu'),
            menu  = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');
  
      const handlerMenu = function() {
          menu.classList.toggle('active-menu');
      };
  
      btnMenu.addEventListener('click', handlerMenu);
      closeBtn.addEventListener('click', handlerMenu);
  
      menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    }  
  }

  const menu = new Menu();
  menu.toggleMenu();

  // Popup
  class Popup {
    togglePopUp() {
      const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');
      let procent = -100,
          count = 0,
          idFrame;

      popup.style.display = 'block';
      popup.style.transform = `translate(${procent}%)`;

      function popupAnimation() {
        count = 10;
        if (procent <= -5) {
            procent += count;
            popup.style.transform = `translate(${procent}%)`;
            idFrame = requestAnimationFrame(popupAnimation);
          } else {
            count = 0;
            cancelAnimationFrame(idFrame);
          }
      }

      function popupAnimationBack() {
        count = -10;
        if (procent >= -95) {
            procent += count;
            popup.style.transform = `translate(${procent}%)`;
            idFrame = requestAnimationFrame(popupAnimationBack); 
          } else {
            count = 0;
            cancelAnimationFrame(idFrame);
          }
      }

      popupBtn.forEach((elem) => {
          elem.addEventListener('click', () => {
            if (window.screen.width > 768) {
                idFrame = requestAnimationFrame(popupAnimation);
            } else popup.style.transform = `translate(0%)`;
          });
      });
      popupClose.addEventListener('click', () => {
          if (window.screen.width > 768)
            idFrame = requestAnimationFrame(popupAnimationBack);
          else popup.style.transform = `translate(-100%)`;
      });
      
    }
  }

  const popup = new Popup();
  popup.togglePopUp();

  class SmoothScrolling {
      scrollTo() {
        const smoothLinks = document.querySelectorAll('a[href^="#"]');
        for (let item of smoothLinks) {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                const id = item.getAttribute('href');
        
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
      }
  }

  const smoothScrolling = new SmoothScrolling();
  smoothScrolling.scrollTo();
});