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

    const buttons = document.querySelectorAll('a.button, .js-open-popup');
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
      slidesPerView: 2,
      spaceBetween: 40,
      breakpoints: {
        500: {
          spaceBetween: 0
        },
        1024: {
          slidesPerView: 3
        },
        1366: {
          slidesPerView: 4
        },
        1600: {
          slidesPerView: 5
        }
      },
      autoHeight: true,
      speed: 5000,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      }
    });
    if (!md.mobile() && !window.matchMedia('(max-width: 1024px)').matches) {
      const sec5SliderAnimation = () => {
        const sec5SliderEl = sec5Slider.getSlider().el;
        const activeSlideClass = 'sec5__slider-slide_active';
        const sec5Slides = sec5SliderEl.querySelectorAll('.sec5__slider-slide');
        sec5Slides[1].classList.add(activeSlideClass);

        sec5SliderEl.addEventListener('mouseenter', () => {
          sec5Slides.forEach(item => {
            if (item.classList.contains(activeSlideClass)) {
              item.classList.remove(activeSlideClass);
            }
          });
        });
      };
      sec5SliderAnimation();
    }

    const sec6SliderMobile = new Slider();
    sec6SliderMobile.createSlider('.sec6__slider_mobile', {
      slidesPerView: 'auto',
      breakpoints: {
        600: {
          slidesPerView: 2
        }
      }
    });

    const sec6SliderDesktop = new Slider();
    sec6SliderDesktop.createSlider('.sec6__slider_desktop', {
      spaceBetween: 20,
      freeMode: true,
      slidesPerView: 'auto',
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

    const selectLanguageHandler = () => {
      const elements = document.querySelectorAll('.js-select-language');
      const disableActive = el => el.classList.remove('active');
      const changeActive = el => {
        if (el.classList.contains('active')) {
          return disableActive(el);
        }
        return el.classList.add('active');
      };
      [...elements].forEach(item => {
        if (md.mobile()) {
          item.addEventListener('click', () => changeActive(item));
          document.addEventListener('click', e => {
            if (!e.target.classList.toString().includes('select-language')) {
              disableActive(item);
            }
          });
        }else {
          item.addEventListener('mouseenter', () => changeActive(item));
          item.addEventListener('mouseleave', () => changeActive(item));
        }
      });
    };
    selectLanguageHandler();
  }
};

window.addEventListener('load', app.load);
