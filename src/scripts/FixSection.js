import ScrollMagic from 'scrollmagic';
import MobileDetect from 'mobile-detect';

export default class FixSection {
  init() {
    const controller = new ScrollMagic.Controller();
    const fixSection = document.querySelector('.fix-section');
    const offset = fixSection.clientHeight - document.documentElement.clientHeight;
    const md = new MobileDetect(window.navigator.userAgent);

    if (!md.mobile()) {
      new ScrollMagic.Scene({
        offset
      })
        .setPin(fixSection)
        .addTo(controller);
    }
  }
}
