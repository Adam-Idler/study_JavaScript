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

export default Popup;