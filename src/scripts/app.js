import '../../node_modules/babel-polyfill';
import SmoothScroll from 'smooth-scroll';
import svg4everybody from 'svg4everybody';
import MobileDetect from '../../node_modules/mobile-detect';

import Slider from './slider';
import makeMap from './map';
import Header from './Header';
import FixSection from './FixSection';
import Popup from './Popup';
import Form from './Form';

const app = {
  load: () => {
    app.bindEvents();
  },

  bindEvents: () => {
    svg4everybody();
    const md = new MobileDetect(window.navigator.userAgent);

    // eslint-disable-next-line no-unused-vars
    const scroll = new SmoothScroll('a[href*="#"]', {
      header: '.header'
    });

    const formPopup = new Popup('.js-form-popup');
    formPopup.init();

    const buttons = document.querySelectorAll('a.button');
    [...buttons].forEach(button => button.addEventListener('click', e => {
      e.preventDefault();
      formPopup.open();
    }));

    const headerHandlers = new Header();
    headerHandlers.init();

    const advantagesSlider = new Slider();
    advantagesSlider.createSlider('.advantages__slider', {
      slidesPerView: 1,
      effect: 'fade',
      speed: 800,
      fadeEffect: {
        crossFade: true
      }
    });

    const createScrollMagic = () => {
      const fixSectionHandler = new FixSection();
      fixSectionHandler.init();

      const dummyBlock = fixSectionHandler.getDummyBlock();

      if (dummyBlock) {
        dummyBlock.on('progress', e => {
          if (e.progress === 1) {
            advantagesSlider.getSlider().slideNext();
          }
          if (e.progress === 0) {
            advantagesSlider.getSlider().slidePrev();
          }
        });
      }

      if (md.mobile()) {
        document.querySelector('.dummy').classList.add('dummy_hide');
      }
    };

    createScrollMagic();

    makeMap(['.sec9__map_mobile', '.sec9__map_desktop']);

    const sec1Slider = new Slider();
    sec1Slider.createSlider('.sec1__slider', {});

    const sec2Slider = new Slider();
    sec2Slider.createSlider('.sec2__slider', {
      mousewheel: {
        releaseOnEdges: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });

    const sec4Slider = new Slider();
    sec4Slider.createSlider('.sec4__slider', {
      breakpoints: {
        1024: {
          slidesPerView: 2
        }
      }
    });

    const sec5Slider = new Slider();
    sec5Slider.createSlider('.sec5__slider', {
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        1366: {
          slidesPerView: 4
        }
      }
    });

    const sec6SliderMobile = new Slider();
    sec6SliderMobile.createSlider('.sec6__slider_mobile', {
      spaceBetween: 20,
      breakpoints: {
        1024: {
          slidesPerView: 'auto'
        }
      }
    });

    const sec6SliderDesktop = new Slider();
    sec6SliderDesktop.createSlider('.sec6__slider_desktop', {
      spaceBetween: 20,
      mousewheel: {
        releaseOnEdges: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 'auto'
        }
      }
    });

    const sec7Slider = new Slider();
    sec7Slider.createSlider('.sec7__slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true
    });

    const sec8Slider = new Slider();
    sec8Slider.createSlider('.sec8__slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoHeight: true
    });

    const sec9FormHandlers = new Form('.sec9__form');
    sec9FormHandlers.init();

    const popupFormHandlers = new Form('.index__form');
    popupFormHandlers.init();
  }
};

window.addEventListener('load', app.load);
