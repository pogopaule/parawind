var mapCenter = [48.06534,8.01349];
var map = L.map('map').setView(mapCenter, 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var marker = L.marker(mapCenter).addTo(map);

map.on('click', function(e) {
  document.getElementById('location').value = e.latlng.lat + ', ' + e.latlng.lng;
  marker.setLatLng(e.latlng);
});

map.on('locationfound', function(e) {
  marker.setLatLng(e.latlng);
});

map.locate({setView: true});



document.getElementById("wind-from").addEventListener("input", updateWindDirection);
document.getElementById("wind-to").addEventListener("input", updateWindDirection);

function updateWindDirection() {
  var from = document.getElementById("wind-from").value,
  to = document.getElementById("wind-to").value,
  canvas = document.getElementById("windRose"),
  ctx = canvas.getContext("2d"),

  strokeWidth = 20,
  radius=canvas.height/2 - strokeWidth/2 - 3,
  x = canvas.width/2,
  y = canvas.height/2,
  startAngle = (from-90)*Math.PI/180,
  endAngle = (to-90)*Math.PI/180;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.lineWidth = strokeWidth;

  ctx.beginPath();
  ctx.arc(x,y,radius,startAngle,endAngle);
  ctx.stroke();

}

updateWindDirection(); // draw the thin circle
