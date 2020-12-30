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

export default Slider;