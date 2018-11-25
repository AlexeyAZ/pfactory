import MobileDetect from 'mobile-detect';

export default class Intro {
  constructor() {
    this.delta = null;
    this.timer = null;

    this.onWheel = this.onWheel.bind(this);
  }

  toggleLock(state) {
    if (state) {
      if (state === 'disable') {
        if (document.body.classList.contains('overflow-hidden')) {
          document.body.classList.remove('overflow-hidden');
        }
      }else if (state === 'enable') {
        if (!document.body.classList.contains('overflow-hidden')) {
          document.body.classList.add('overflow-hidden');
        }
      }
    }else {
      document.body.classList.toggle('overflow-hidden');
    }
  }

  showStep(step) {
    const sec1 = document.querySelector('.sec1');
    const mouse = document.querySelector('.sec1__mouse');
    if (step === 1) {
      sec1.classList.remove('sec1__next-step');
      mouse.classList.remove('sec1__mouse_hide');
      this.toggleLock('enable');
    }
    if (step === 2) {
      sec1.classList.add('sec1__next-step');
      mouse.classList.add('sec1__mouse_hide');
      this.toggleLock('disable');
    }
  }

  onWheel(e) {
    if (!this.delta || e.deltaY > 0) {
      const delta = e.deltaY;
      this.delta = delta;

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        if (delta > 0) {
          this.showStep(2);
          e.preventDefault();
        }
      }, 300);
    }


    if (window.pageYOffset === 0 && e.deltaY < 0) {
      this.showStep(1);
      e.preventDefault();
    }
  }

  init() {
    const md = new MobileDetect(window.navigator.userAgent);
    const mobile = md.mobile();

    if (mobile) {
      this.toggleLock('disable');
    }

    if (!mobile) {
      if (window.pageYOffset > 0) {
        this.showStep(2);
      }
      document.addEventListener('wheel', this.onWheel);
    }
  }
}
