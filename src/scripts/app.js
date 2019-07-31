import '../../node_modules/babel-polyfill';
import SmoothScroll from 'smooth-scroll';
import svg4everybody from 'svg4everybody';
import MobileDetect from '../../node_modules/mobile-detect';
import axios from 'axios';

import Slider from './slider';
import makeMap from './map';
import Header from './Header';
import FixSection from './FixSection';
import Popup from './Popup';
import Form from './Form';

const ymSettings = {
  counterNumber: 54186001,
  goalId: 'form'
};

const app = {
  load: () => {
    app.bindEvents();
  },

  bindEvents: () => {
    svg4everybody();
    const md = new MobileDetect(window.navigator.userAgent);
    // eslint-disable-next-line no-unused-vars
    const getScrollSettings = window.matchMedia('(max-width: 768px)').matches ? {} : {header: '.header'};
    // eslint-disable-next-line no-unused-vars
    const scroll = new SmoothScroll('a[href*="#"]', getScrollSettings);

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

    if (!md.mobile()) {

      const sec5SliderAnimation = () => {
        const sec5SliderEl = sec5Slider.getSlider().el;
        const toggleClass = () => {
          if (sec5SliderEl.classList.contains('sec5__slider_mouse_enter')) {
            sec5SliderEl.classList.remove('sec5__slider_mouse_enter');
          }
          sec5SliderEl.classList.toggle('sec5__slider_show-slides');
        };
        const setInitialState = () => {
          sec5SliderEl.classList.add('sec5__slider_mouse_enter');
          sec5SliderEl.classList.remove('sec5__slider_show-slides');
        };
        let timer = null;

        return {
          element: sec5SliderEl,
          startTimer: () => {
            timer = setInterval(toggleClass, 4000);
          },
          stopTimer: () => {
            clearInterval(timer);
            setInitialState();
          }
        };
      };

      const sec5Animation = sec5SliderAnimation();
      sec5Animation.startTimer();

      sec5Animation.element.addEventListener('mouseenter', () => {
        sec5Animation.stopTimer();
      });

      sec5Animation.element.addEventListener('mouseleave', () => {
        sec5Animation.startTimer();
      });
    }

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

    const sec9Form = new Form('.sec9__form', () => {
      ym(ymSettings.counterNumber, 'reachGoal', ymSettings.goalId);
      axios({
        method: 'post',
        url: 'https://pfactory.ru/send_mail',
        data: sec9Form.getFormData()
      })
        .then(() => {
          sec9Form.resetForm();
          sec9Form.showMessage('success');
        })
        .catch(error => console.log(error));
    });
    sec9Form.init();

    const popupForm = new Form('.index__form', () => {
      ym(ymSettings.counterNumber, 'reachGoal', ymSettings.goalId);
      axios({
        method: 'post',
        url: 'https://pfactory.ru/send_mail',
        data: popupForm.getFormData()
      })
        .then(() => {
          popupForm.resetForm();
          popupForm.showMessage('success');
        })
        .catch(error => console.log(error));
    });
    popupForm.init();
  }
};

window.addEventListener('load', app.load);
