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

