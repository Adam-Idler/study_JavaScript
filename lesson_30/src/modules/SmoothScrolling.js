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

export default SmoothScrolling;