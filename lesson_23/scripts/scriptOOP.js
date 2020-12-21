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

  const timer = new Timer('26 dec 2020');
  timer.countTimer();

  // Menu
  class Menu {
      
    toggleMenu() {
      const menuBtn = document.querySelector('.menu'),
            menu  = document.querySelector('menu');
  
      const handlerMenu = function() {
        menu.classList.toggle('active-menu');
      };
  
      document.addEventListener('click', (event) => {
        let target = event.target;

        if (!target.closest('menu')) menu.classList.remove('active-menu');
        if (target.tagName === 'A' && target.closest('.active-menu') || target.closest('.menu')) handlerMenu();
      });
    }
    }
  const menu = new Menu();
  menu.toggleMenu();

  // Popup
  class Popup {
    togglePopUp() {
      const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
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
      
      popup.addEventListener('click', (event) => {
        let target = event.target,
            cross = target.classList.contains('popup-close') ? true : false;

        target = target.closest('.popup-content');
        if (!target || cross) {
            if (window.screen.width > 768)
                idFrame = requestAnimationFrame(popupAnimationBack);
            else popup.style.transform = `translate(-100%)`;
        }
      });
      
    }
  }

  const popup = new Popup();
  popup.togglePopUp();

  class SmoothScrolling {
      scrollTo() {
        const smoothLinks = document.querySelectorAll('a[href^="#"]');
        for (let i = 0; i < 7; i++) {
            smoothLinks[i].addEventListener('click', function (event) {
                event.preventDefault();
                const id = smoothLinks[i].getAttribute('href');

                if (!event.target.classList.contains('close-btn')) {
                    document.querySelector(id).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
            });
        }
      }
  }

  const smoothScrolling = new SmoothScrolling();
  smoothScrolling.scrollTo();

  // Tabs
  class Tabs {
    activateTabs() {
        const tabHeader = document.querySelector('.service-header'),
              tabs = tabHeader.querySelectorAll('.service-header-tab'),
              tabContents = document.querySelectorAll('.service-tab');
        const toggleTabcontent = (index) => {
            for (let i = 0; i < tabContents.length; i++) {
                if (index === i) {
                    tabs[i].classList.add('active');
                    tabContents[i].classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    tabContents[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tabs.forEach((item, i) => {
                    if (item === target) {
                        toggleTabcontent(i);
                    }
                });
            }
        });
    }
  }

  const tabs = new Tabs();
  tabs.activateTabs();

  // Slider 
  class Slider {
    sliderActivate() {
      
      const slides = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dotUl = slider.querySelector('.portfolio-dots');
      
      let dotsCount = slides.length;
      for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('li');
        dotUl.insertBefore(dot, dotUl.lastChild);
        dot.classList.add('dot');
      }
      const dots = dotUl.querySelectorAll('.dot');
      
      let currentSlide = 0,
          interval;
      const prevSlide = (elem, index, strClass) => elem[index].classList.remove(strClass);
      const nextSlide = (elem, index, strClass) => elem[index].classList.add(strClass);

      const autoPlaySlide = () => {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        nextSlide(dots, currentSlide, 'dot-active');
        nextSlide(slides, currentSlide, 'portfolio-item-active');
      };
      const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
      };
      const stopSlide = () => {
        clearInterval(interval);
      };
      slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) return;

        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) {
          currentSlide++;
        } else if (target.matches('#arrow-left')) {
          currentSlide--;
        } else if(target.matches('.dot')) {
          dots.forEach((elem, index) => {
            if (elem === target) {
              currentSlide = index;
            }
          });
        }
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        nextSlide(dots, currentSlide, 'dot-active');
        nextSlide(slides, currentSlide, 'portfolio-item-active');
      });

      slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot'))
          stopSlide();
      });
      slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn') || event.target.matches('.dot'))
          startSlide();
      });
      startSlide(1500);
    }
  }

  const slider = new Slider();
  slider.sliderActivate();
  // Смена фото в блоко "Наша команда"
  class ChangePhoto {
    photoChange() {
      const command = document.querySelector('#command>.container>.row');
      let temp;
      command.addEventListener('mouseover', (event) => {
        let target = event.target;
        temp = target.src;
        target.src = target.dataset.img;
        target.dataset.img = temp;
        
      });
      command.addEventListener('mouseout', (event) => {
        let target = event.target;
        target.dataset.img = target.src;
        target.src = temp;
        temp = target.src;
      });
    }
  }
  
  const changePhoto = new ChangePhoto();
  changePhoto.photoChange();
  // Валидация форм в блоке "Рассчитать стоимость"
  class Validate {
    validateInput() {
      const calcBlock = document.querySelector('.calc-block');

      calcBlock.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/, '');
      });
    }
  }

  const validate = new Validate();
  validate.validateInput();
});