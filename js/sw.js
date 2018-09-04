//Service worker modified from Traversy Media  - https://www.youtube.com/watch?v=ksXwaWHCW6k

const cacheName= 'v1';

const cacheFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/casa_enrique.jpg',
	'/img/emily.jpg',
	'/img/hometownBBQ.jpg',
	'/img/KangHoDong.jpg',
	'/img/katz.jpg',
	'/img/mu_ramen.jpg',
	'/img/mission_chinese.jpg',
	'/img/robertas.jpg',
	'/img/superiority_burger.jpg',
	'/img/the_dutch.jpg'						
];


self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(cacheFiles);
		})
	);
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

