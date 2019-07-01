import ScrollMagic from '../../node_modules/scrollmagic';
import MobileDetect from '../../node_modules/mobile-detect';

export default class FixSection {
  constructor() {
    this.scene = null;
    this.dummyBlock = null;
    this.update = this.update.bind(this);
    this.getScene = this.getScene.bind(this);
  }
  getScene() {
    return this.scene;
  }
  getDummyBlock() {
    return this.dummyBlock;
  }
  update() {
    this.scene.update();
  }
  init() {
    const controller = new ScrollMagic.Controller();
    const fixSection = document.querySelector('.fix-section');
    const offset = fixSection.clientHeight - document.documentElement.clientHeight;
    const md = new MobileDetect(window.navigator.userAgent);

    if (!md.mobile()) {
      this.scene = new ScrollMagic.Scene({
        offset
      })
        .setPin(fixSection)
        .addTo(controller);

      // this.scene.on('update', e => console.log(e))

      this.dummyBlock = new ScrollMagic.Scene({triggerElement: '.dummy', triggerHook: 0.8})
        .setClassToggle('.advantages__slider', 'active')
        .addTo(controller);

      window.addEventListener('resize', this.update);
    }
  }
}
