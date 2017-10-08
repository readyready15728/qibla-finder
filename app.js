var map;

var initMap = function () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2
  });
  
  $(document).ready(function () {
    $('form').submit(function (event) {
      event.preventDefault();

      alert('Poopoo');
    });
  });
};
