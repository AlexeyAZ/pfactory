import 'babel-polyfill';
import SmoothScroll from 'smooth-scroll';
import svg4everybody from 'svg4everybody';
import MobileDetect from 'mobile-detect';

import Slider from './slider';
import makeMap from './map';
import Intro from './Intro';
import Header from './Header';
import shemeParallax from './ShemeParallax';
import FixSection from './FixSection';

const app = {
  load: () => {
    app.bindEvents();
  },

  bindEvents: () => {
    svg4everybody();
    const md = new MobileDetect(window.navigator.userAgent);
    const introHandlers = new Intro();
    introHandlers.init();

    const scroll = new SmoothScroll('a[href*="#"]', {
      header: '.header'
    });
    document.addEventListener('scrollStart', () => {
      introHandlers.toggleLock('disable');
    });

    const headerHandlers = new Header();
    headerHandlers.init();

    const fixSectionHandler = new FixSection();
    fixSectionHandler.init();

    makeMap(['.sec9__map_mobile', '.sec9__map_desktop']);

    const sec1Slider = new Slider();
    sec1Slider.createSlider('.sec1__slider', {});

    if (!md.mobile()) {
      shemeParallax(100, 50);
    }

    const sec2Slider = new Slider();
    sec2Slider.createSlider('.sec2__slider', {
      mousewheel: true,
      releaseOnEdges: true,
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 4
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
      spaceBetween: 20,
      breakpoints: {
        1024: {
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
      mousewheel: true,
      releaseOnEdges: true,
      breakpoints: {
        1024: {
          slidesPerView: 'auto'
        }
      }
    });

    const sec7Slider = new Slider();
    sec7Slider.createSlider('.sec7__slider', {
      slidesPerView: 'auto',
      speed: 5000,
      spaceBetween: 20,
      freeMode: true,
      // freeModeMomentumRatio: 0.5,
      // freeModeMomentumVelocityRatio: 0.5,
      // freeModeMomentumBounceRatio: 1,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      loop: true,
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        1366: {
          slidesPerView: 5
        }
      }
    });

    const sec8Slider = new Slider();
    sec8Slider.createSlider('.sec8__slider', {
      slidesPerView: 1,
      spaceBetween: 20
    });
  }
};

window.addEventListener('load', app.load);
