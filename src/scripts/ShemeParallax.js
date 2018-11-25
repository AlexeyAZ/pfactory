export default function shemeParallax(maxOffsetX, maxOffsetY) {
  const sheme = document.querySelector('.sec1__sheme_desktop .sec1__sheme-inner');
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;

  const obj = {
    x: 1,
    y: 1
  };

  window.addEventListener('mousemove', e => {
    const x = e.x * maxOffsetX / windowWidth;
    const y = e.y * maxOffsetY / windowHeight;

    obj.x = x;
    obj.y = y;

    sheme.style.transform = `translate(${x}px, ${y}px)`;
  });
}
