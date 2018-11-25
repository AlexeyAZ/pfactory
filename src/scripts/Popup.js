export default class Popup {
  constructor(element) {
    this.element = document.querySelector(element);
  }

  open() {
    this.element.classList.add('popup_open');
    document.body.classList.add('popup-open');
  }
  close() {
    this.element.classList.remove('popup_open');
    document.body.classList.remove('popup-open');
  }
  init() {
    const closeButton = this.element.querySelector('.popup__close');
    closeButton.addEventListener('click', e => {
      e.preventDefault();
      this.close();
    });
    this.element.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
