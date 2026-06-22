// جب بیک گراؤنڈ میں نوٹیفکیشن موصول ہو
self.addEventListener('push', function(event) {
  let data = { title: 'Soulbook Update', body: 'کچھ نیا ہوا ہے!' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// نوٹیفکیشن پر کلک کرنے سے ایپ اوپن کرنا
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
