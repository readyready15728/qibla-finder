Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2
  });

  var geocoder = new google.maps.Geocoder();

  var getQibla = function (sourceLocation) {
    var kaabaLocation = new google.maps.LatLng({lat: 21.4225, lng: 39.8262});

    var lat_1 = Math.radians(sourceLocation.lat());
    var lng_1 = Math.radians(sourceLocation.lng());

    var lat_2 = Math.radians(kaabaLocation.lat());
    var lng_2 = Math.radians(kaabaLocation.lng());

    return Math.degrees(
      Math.atan2(
        Math.sin(lng_2 - lng_1),
        (Math.cos(lat_1) * Math.tan(lat_2) - Math.sin(lat_1) * Math.cos(lng_2 - lng_1))
      )
    );
  };

  $(document).ready(function () {
    var setQibla = function () {
      var marker = new google.maps.Marker({
        map: map,
        position: map.getBounds().getCenter()
      });

      var qibla = getQibla(marker.getPosition());
      var direction;

      if (qibla < 0) {
        qibla = -qibla;
        direction = 'west';
      } else {
        direction = 'east';
      }

      $('#qibla').addClass('alert');
      $('#qibla').addClass('alert-success');
      $('#qibla').text('Your qibla is ' + qibla.toFixed(2) + ' degrees ' + direction + ' from true north.');
    };

    $('form').submit(function (event) {
      event.preventDefault();

      var address = $('#address').val();
      var marker;

      if (address !== '') {
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(17);

            // This needs to go in the callback; otherwise it doesn't act on
            // the current center
            setQibla();
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      } else {
        setQibla();
      }
    });
  });

  var input = document.getElementById('address');
  var autocomplete = new google.maps.places.Autocomplete(input);
};
