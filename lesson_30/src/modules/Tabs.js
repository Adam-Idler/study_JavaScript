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

export default Tabs; 