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

export default Menu;