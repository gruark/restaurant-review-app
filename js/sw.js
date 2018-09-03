const cacheName = 'v1';


self.addEventListener('install', event => {
	console.log('Service Worker Installed');
});

//Call Activate Event
self.addEventListener('activate', event => {
	console.log('Service Worker activated');
	//Remove unwanted caches
    event.waitUntil(
		 caches.keys().then(cacheNames => {
			return Promise.all(
			   cacheNames.map(cache => {
				   if (cache !== cacheName) {
					   console.log('Service Worker: clearing old cache');
					   return caches.delete(cache);
				   }
		      })
				);
		  })
     );
});

//Call Fetch Event
self.addEventListener('fetch', event => {
		console.log('Service Worker: fetching');
		event.respondWith(
		    fetch(event.request)
			 .then(res => {
				 const resClone = res.clone();
				 caches
				 .open(cacheName)
				 .then(cache => {
					 cache.put(event.request, resClone);
					   });
				   return res;
				   }).catch(err => caches.match(event.request).then(res => res))
		);
});
