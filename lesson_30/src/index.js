'use strict';

  import Timer from './modules/Timer';
  import Menu from './modules/Menu';
  import Popup from './modules/Popup';
  import SmoothScrolling from './modules/SmoothScrolling';
  import Tabs from './modules/Tabs';
  import Slider from './modules/Slider';
  import ChangePhoto from './modules/ChangePhoto';
  import Validate from './modules/Validate';
  import Calculator from './modules/Calculator';
  import SendForm from './modules/SendForm';
  
  // Timer
  const timer = new Timer('31 dec 2020');
  timer.countTimer();

  // Menu
  const menu = new Menu();
  menu.toggleMenu();

  // Popup
  const popup = new Popup();
  popup.togglePopUp();

  // Smooth scroll
  const smoothScrolling = new SmoothScrolling();
  smoothScrolling.scrollTo();

  // Tabs
  const tabs = new Tabs();
  tabs.activateTabs();

  // Slider 
  const slider = new Slider();
  slider.sliderActivate();

  // Смена фото в блоко "Наша команда"
  const changePhoto = new ChangePhoto();
  changePhoto.photoChange();

  // Валидация форм 
  const validate = new Validate();
  validate.init();

  // Calculator
  const calcutor = new Calculator(100);
  calcutor.calc();

  //send-ajax-form
  const sendForm = new SendForm();
  sendForm.sendAjax();