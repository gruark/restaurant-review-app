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
	'/js/sw.js',
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
	console.log('Service Worker Installed');
	e.waitUntil(
		caches
		  .open(cacheName)
		  .then(cache => {
			 cache.addAll(cacheFiles);
		   })
		  .then(() => self.skipWaiting())
	);
});
		
//Call Activate Event
self.addEventListener('activate', e => {
	console.log('Service Worker activated');
	//Remove unwanted caches
    e.waitUntil(
		 caches.keys().then(cacheNames => {
			return Promise.all(
			   cacheNames.map(cache => {
				   if (cache !== cacheName) {
					   console.log('Service Worker: clearing old cache');
					   return caches.delete(cache);
				   }
		      })
		   )
	    })
     );
});

//Call Fetch Event
self.addEventListener('fetch', e => {
		console.log('Service Worker: fetching');
		e.respondWith(
		    fetch(e.request).catch(() => caches.match(e.request))
});
