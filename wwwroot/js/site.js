var dateien;
$(function ()
{ 
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
  // LOCATION
  $("#addLocation").click(function(){

    $("#demo").toggleClass("hidden");

    getLocation();

})

function getLocation() {
    var x = document.getElementById("demo");
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    var x = document.getElementById("demo");
  
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    var latlon = position.coords.latitude + "," + position.coords.longitude;
  
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";
  
    $("#mapholder").innerHTML = "<img src='"+img_url+"'>";
  }
  
  function showError(error) {
    var x = document.getElementById("demo");
  
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
			dateien = evt.target.files; // FileList object
            // Auslesen der gespeicherten Dateien durch Schleife
            var fragmente = [];
			for (var i = 0, f; f = dateien[i]; i++) {
                fragmente.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                   f.size, ' bytes</li>');
                // nur Bild-Dateien
				if (!f.type.match('image.*')) {
					continue;
				}
				var reader = new FileReader();
				reader.onload = (function (theFile) {
					return function (e) {
						// erzeuge Thumbnails.
						var vorschau = document.createElement('img');
						vorschau.className = 'vorschau';
						vorschau.src = e.target.result;
						vorschau.title = theFile.name;
						document.getElementById('list')
							.insertBefore(vorschau, null);
                    };
                    
				})(f);
				// Bilder als Data URL auslesen.
				reader.readAsDataURL(f);
            }
            document.getElementById('dateiListe').innerHTML = '<ul>' + fragmente.join('') + '</ul>';
            if ($("#fupload").hasClass("hidden"))
            {
                $("#fupload").toggleClass("hidden");
            }
 
 
		}
		// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
        $('#files').on('input', dateiauswahl);

       $("#fupload").on("click", uploadfile)

        function uploadfile(e)
        {
            console.log(dateien);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/UploadController");
            xhr.upload.addEventListener("progress", e =>{console.log(e);
            });

            xhr.setRequestHeader("Content-Type", ("multipart/form-data"));
            xhr.send(data);
        
        }

})

