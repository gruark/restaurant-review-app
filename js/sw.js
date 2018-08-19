var cacheID = "mws-restaurant-001";

self.addEventListener("install", event => {
		event.waitUntil {
			caches.open(cacheID).then(cache => {
				return cache
				.addAll([
					"/",
					"/index.html",
					"/restuarant.html",
					"/css/styles.css",
					"/data/restaurants.json",
					"/js/"
			    ])
			}
		}
}

//If page cannot be found
self.addEventListener('fetch', function(event){
	event.respondWith(
		fetch(event.request).then(function(response) {
			if (response.status == 404){
				return new Response("Page not found");
			}
			 return response;
		}).catch(function() {
			return new Response("Request failed.");
	})
  );
}