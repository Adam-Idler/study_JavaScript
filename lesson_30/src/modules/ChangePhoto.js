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

export default ChangePhoto;