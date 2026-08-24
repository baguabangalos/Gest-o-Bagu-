self.addEventListener("push", function(event){
  var data = {};
  try{ data = event.data ? event.data.json() : {}; }
  catch(e){ data = {title:"Bagua Bangalôs", body: event.data ? event.data.text() : ""}; }

  var title = data.title || "Bagua Bangalôs";
  var options = {
    body: data.body || "",
    data: {url: data.url || "./"},
    vibrate: [120, 60, 120]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || "./";
  event.waitUntil(clients.openWindow(url));
});
