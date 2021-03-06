const key = 'AIzaSyDmVxAjUIL1ksH85v5O9sgmZCesKI51m5M';
function initMap(_map, coords, adress) {
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(_map, {
    zoom: 17,
    center: coords,
    disableDefaultUI: true
  });

  // eslint-disable-next-line no-undef, no-unused-vars
  const marker = new google.maps.Marker({
    position: coords,
    map,
    title: adress
  });
}
function siteMaps(elements) {
  if (elements.length > 0) {
    elements.forEach(el => {
      const map = document.querySelector(el);
      if (map) {
        initMap(map, {lat: 51.372398, lng: 0.559163}, 'Derby House Office 2, 123 Watling Street, Gillingham, Kent, ME7 2YY');
      }
    });
  }
}

function loadMapScript(src, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  if (callback) {
    script.onload = callback;
  }
  document.body.insertAdjacentElement('beforeend', script);
  script.src = src;
}

function makeMap(elements) {
  const lang = document.documentElement.getAttribute('lang');
  loadMapScript(`https://maps.googleapis.com/maps/api/js?key=${key}&language=${lang}`, () => siteMaps(elements));
}

export default makeMap;

