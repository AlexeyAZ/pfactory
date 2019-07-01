import Swiper from 'swiper';

export default class Slider {
  constructor() {
    this.swiper = null;
    this.options = {
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      },
      breakpointsInverse: true
    };
    this.getSlider = this.getSlider.bind(this);
  }

  getSlider() {
    return this.swiper;
  }

  createSlider(_element, _options) {
    const options = Object.assign(this.options, _options);
    this.swiper = new Swiper(_element, options);
  }
}


