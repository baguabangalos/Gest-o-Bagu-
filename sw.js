self.addEventListener("install", function(event){ self.skipWaiting(); });
self.addEventListener("activate", function(event){ event.waitUntil(self.clients.claim()); });

self.addEventListener("push", function(event){
var data = {};
try{ data = event.data ? event.data.json() : {}; }
catch(e){ data = {title:"Bagua Bangalôs", body: event.data ? event.data.text() : ""}; }

var title = data.title || "Bagua Bangalôs";
var options = {
body: data.body || "",
data: {url: data.url || "./"},
tag: data.tag || "bagua-pedido",
renotify: true,
requireInteraction: true,
silent: false,
vibrate: [800],
icon: "icon-192.png",
badge: "icon-192.png"
};
event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event){
event.notification.close();
var url = (event.notification.data && event.notification.data.url) || "./";
event.waitUntil(clients.openWindow(url));
});
