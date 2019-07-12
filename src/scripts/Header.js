export default class Header {
  setState() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      const header = document.querySelector('.main-header');
      const button = header.querySelector('.header__button');
      if (window.pageYOffset > 0) {
        header.classList.add('header_fixed');
        button.classList.add('button_invert');
      }else {
        header.classList.remove('header_fixed');
        button.classList.remove('button_invert');
      }
    }
  }

  init() {
    this.setState();
    window.addEventListener('scroll', this.setState);
  }
}
