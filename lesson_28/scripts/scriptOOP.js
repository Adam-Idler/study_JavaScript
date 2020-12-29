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

  const timer = new Timer('31 dec 2020');
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

  // Валидация форм 
  class Validate {
    constructor() {
      this.calcBlock = document.querySelector('.calc-block');
      this.textForm = document.querySelectorAll('form');
    }
    init() {
      this.validateCalc();
      this.validateInputText();
      maskPhone('.form-phone');
    }
    validateCalc() {
        this.calcBlock.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d\.]/, '');
      });
    }
    validateInputText() {
      this.textForm.forEach( (form) => {
        form.addEventListener('input', e => {
          const target = e.target;
          if (target.classList.contains('form-name') || target.id === 'form2-name') {
            target.value = target.value.replace(/[^а-яё\s]/i, '');
          }
          if (target.classList.contains('form-email')) {
            target.value = target.value.replace(/[а-яё\s,\#\$\%\/|\\\[\]\{\}&\`\~?!*\(\)\+\=\^\:\;\'\"]/i, '');
          }
          if (target.classList.contains('mess')) {
            target.value = target.value.replace(/[a-z]/i, '');
          }
        });
      });
    }
  }

  const validate = new Validate();
  validate.init();

  // Calculator
  class Calculator {
    constructor(price) {
      this.price = price;
    }
    calc() {
      const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
            
      const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
              squareValue = +calcSquare.value;
        
        if (calcCount.value > 1) {
          countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
          dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
          total = Math.ceil(this.price * typeValue * squareValue * countValue * dayValue);
        }
        let count = +totalValue.textContent;
        let setID;
        const bruteForceNumbers = () => {
          if (total === 0) {
            totalValue.textContent = 0;
            clearInterval(setID);
          } else if (count < total) {
            count += 100;
            totalValue.textContent = count;
          } else if (count > total) {
            count -= 100;
            totalValue.textContent = count;
          }
          if (total - totalValue.textContent < 150 && total - totalValue.textContent > 0) {
            totalValue.textContent = total;
            clearInterval(setID);
          }
          
        };
        setID = setInterval(bruteForceNumbers, 10);
      };

      calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
          countSum();
        }
      });

    }
  }

  const calcutor = new Calculator(100);
  calcutor.calc();

  //send-ajax-form
  class SendForm {
    constructor() {
      this.errorMessage = 'Что-то пошло не так...';
      this.loadMessage = 'Загрузка...';
      this.successMessage = 'Спасибо! Мы скоро с вами свяжимся!';
      this.forms = document.querySelectorAll('form');
    }
    postData(form, body) {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) {
            return;
          } 
          if (request.status === 200) {
            resolve();
          } else {
            reject(request.status);
          }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        const formData = new FormData(form);
  
        request.send(JSON.stringify(body));
      });
    }
    sendAjax() {
      const statusMessage = document.createElement('div');
      statusMessage.style.cssText = `
              font-size: 2rem;
              color: #fff;
      `;
      
      this.forms.forEach( (form) => {
        form.addEventListener('submit', (event) => {
          event.preventDefault();    
          form.appendChild(statusMessage);
          statusMessage.textContent = this.loadMessage;
          const formData = new FormData(form);
          let body = {};
          formData.forEach((val, key) => {
            body[key] = val;
          });
          this.postData(form, body)
            .then(() => statusMessage.textContent = this.successMessage)
            .catch(error => {
              statusMessage.textContent = this.errorMessage;
              console.error(error);
            });
          form.reset();
      });
      });
    }
  }

  const sendForm = new SendForm();
  sendForm.sendAjax();
});