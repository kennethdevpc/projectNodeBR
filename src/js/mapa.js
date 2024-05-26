(function () {
  const lat = 20.67444163271174;
  const lng = -103.38739216304566;
  const mapa = L.map('mapa').setView([lat, lng], 16); //'mapa' es el Id de el archivo .pug

  // para pin
  let marker;
  // Utilizar provider y geocoder 
  const geocoderService = L.esri.Geocoding.geocodeService(); //esto permite obtener el nombre de la calle


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  //parapin:
  marker = new L.marker(
    [lat, lng], //deja centrado esa lat y long
    {
      draggable: true, //Sirve para mover el pin
      autoPan: true, // sirve para poder mover el pin y que se centre el mapa en donde pongo el pin
    }
  ).addTo(mapa);

  //Detectar el movimiento del pin
  marker.on('moveend', function (e) {
    marker = e.target; // esto seria un objeto de tipo marker y tiene un proto
    const posicion = marker.getLatLng();
    console.log(posicion);

    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)); //toma el mapa que esta y lo reposiciona
    //con esas cordenadas y lo centra

    //Obtener la informacion de las calles al soltar el pin (13 es el Zoom) : 
    //geocoderservice necesita una lat y long para dar referencia de calles y otra informacion adicional 
    geocoderService.reverse().latlng(posicion, 13).run(function (error, resultado) {
      console.log(resultado)

      //si quiero agregar un popup que me diga la informacion de esa calle en ese pin
      marker.bindPopup(resultado.address.LongLabel)

      //llenar los campos
      document.querySelector('.calle').textContent = resultado?.address?.Address ?? '';
      document.querySelector('#calle').value = resultado?.address?.Address ?? '';
      document.querySelector('#lat').value = resultado?.latlng?.lat ?? '';
      document.querySelector('#lng').value = resultado?.latlng?.lng ?? '';

      
    })

  });





})();
