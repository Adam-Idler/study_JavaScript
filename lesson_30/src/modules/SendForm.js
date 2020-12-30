class SendForm {
  constructor() {
    this.errorMessage = 'Что-то пошло не так...';
    this.loadMessage = 'Загрузка...';
    this.successMessage = 'Спасибо! Мы скоро с вами свяжимся!';
    this.forms = document.querySelectorAll('form');
  }
  postData(form, body) {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
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
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            statusMessage.textContent = this.successMessage;
          })
          .catch(error => {
            statusMessage.textContent = this.errorMessage;
            console.error(error);
          });
        form.reset();
    });
    });
  }
}

export default SendForm;