class Validate {
  constructor() {
    this.calcBlock = document.querySelector('.calc-block');
    this.textForm = document.querySelectorAll('form');
  }
  init() {
    this.validateCalc();
    this.validateInputText();
    maskPhone('.form-phone', '____ ___-__-__');
    document.querySelectorAll('.form-email').forEach((elem) => elem.setAttribute('required', true));
    document.querySelector('.mess').setAttribute('required', true);
    document.querySelectorAll('.form-name').forEach(elem => {
      elem.onblur = (e) => {
        if (e.target.value.length < 2) {
          e.target.value = '';
        }
      };
    });
    document.getElementById('form2-name').onblur = (e) => e.target.value.length < 2 ? e.target.value = '' : '';
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
          target.value = target.value.replace(/[^а-яё\s]{2,15}/i, '');
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

export default Validate;