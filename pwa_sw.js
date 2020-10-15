if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      console.log("active service worker found, no need to register");
    } else {
      // Register the service worker
      navigator.serviceWorker
        .register("pwa_sw.js")
        .then(function (reg) {
          console.log("Service worker has been registered for scope: " + reg.scope);
        }).catch(function(error){
          console.log("Registration failed" + error);
        });
    }
  }

                            /*  Offline Cache  */
  const CACHE = "v1";
  const offline_content =[ "img/logo_192.png", 
                            "css/site.css",
                            "manifest.json",
                            "lib/bootstrap/dist/css/bootstrap.css",
                            "lib/jquery/dist/jquery.js",
                            "lib/bootstrap/dist/js/bootstrap.bundle.js",
                            "js/site.js",
                            "index.html",
                            "/",
                            "offline.html"
                          ];

  self.addEventListener('install', function(event){
    console.log("Installation erfolgreich" + event);
        event.waitUntil(
            caches.delete(CACHE).then(function (reg) {
              console.log("CACHE cleared"+ reg);
            }).then(
                caches.open(CACHE).then(function(cache) {
                 console.log("new CACHE ");
                return cache.addAll(offline_content);    
                })
            )
          );    
  });


self.addEventListener('activate', function (event) {
    // `claim()` sets this worker as the active worker for all clients that
    // match the workers scope and triggers an `oncontrollerchange` event for
    // the clients.
    return self.clients.claim();
});


// Cache first then Network 
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // Try the cache
//     caches.match(event.request).then(function(response) {
//       // Fall back to network
//       return response || fetch(event.request);
//     }).catch(function() {
//       // If both fail, show a generic fallback:
//       return caches.match('offline.html');
//     })
//   );
// });


// Cache first then network and cache response
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open("v1").then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });

// Network first then cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});



