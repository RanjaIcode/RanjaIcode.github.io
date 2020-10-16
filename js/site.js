var dateien;
$(function ()
{ 


  // Notifications
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'img/logo_192.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'img/logo_192.png'},
          {action: 'close', title: 'Close notification',
            icon: 'img/logo_192.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
displayNotification();


// //  Foreground detection
var target = document.getElementById('target');

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
} else {
  target.innerText = 'Page Visibility API not supported.';
}

function handleVisibilityChange() {
  var timeBadge = new Date().toTimeString().split(' ')[0];
  var newState = document.createElement('p');
  newState.innerHTML = '' + timeBadge + ' Sichtbarkeit änderte sich zu' + (document[hidden] ? 'hidden' : 'visible') + '.';
  target.appendChild(newState);
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);

if (hidden in document) {
  document.getElementById('status').innerHTML = document[hidden] ? 'hidden' : 'visible';}

// LOCATION


var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
  
//   File Upload
	function dateiauswahl(evt) {
			dateien = evt.target.files; 
            var fragmente = [];
			for (var i = 0, f; f = dateien[i]; i++) {
                fragmente.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                   f.size, ' bytes</li>');
				if (!f.type.match('image.*')) {
					continue;
				}
				var reader = new FileReader();
				reader.onload = (function (theFile) {
					return function (e) {
						var vorschau = document.createElement('img');
						vorschau.className = 'vorschau';
						vorschau.src = e.target.result;
						vorschau.title = theFile.name;
						document.getElementById('list')
							.insertBefore(vorschau, null);
                    };
                    
				})(f);
				reader.readAsDataURL(f);
            }
            document.getElementById('dateiListe').innerHTML = '<ul>' + fragmente.join('') + '</ul>';
            if ($("#fupload").hasClass("hidden"))
            {
                $("#fupload").toggleClass("hidden");
            }
 
 
		}
        $('#files').on('input', dateiauswahl);

      

})

