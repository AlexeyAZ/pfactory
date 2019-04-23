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
        initMap(map, {lat: 55.778378, lng: 37.494670}, 'Новохорошевский пр-д, 18, Москва, 123308');
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
  loadMapScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBDOFw2eyQDS_kF3Ng1uAHlSTUXluG7nwE', () => siteMaps(elements));
}

export default makeMap;

