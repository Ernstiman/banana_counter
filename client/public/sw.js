
self.addEventListener('push', function(event) {
    console.log('Push event received:', event);
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Banana Pealers!';
    const options = {
        body: data.body || 'You have a new notification.',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
})