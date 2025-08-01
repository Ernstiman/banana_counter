
self.addEventListener('push', function(event) {
    console.log('Push event received:', event);
    const data = event.data ? event.data.json() : {};
    console.log(data.url, "url")
    const title = data.title || 'Banana Pealers!';
    const options = {
        body: data.body || 'You have a new notification.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
})