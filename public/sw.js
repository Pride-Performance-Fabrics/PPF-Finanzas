self.addEventListener('push', (event) => {
    const data = event.data.json();
  
    const options = {
      body: data.message,
      icon: '/Logo_PPF.png',
      badge: '/Logo_PPF.png',
      actions: data.actions
    };
  
    event.waitUntil(self.registration.showNotification(data.title, options));
  });
  
  
  self.addEventListener('notificationclick', (event) => {
  
    event.notification.close();
  
    switch (event.action) {
      case 'ToDo':
        event.waitUntil(
          clients.openWindow(process.env.PUBLIC_URL + '/Home')
        );
        break;
  
      default:
        break;
    }
  
  });
  