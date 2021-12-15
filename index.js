window.onload = function () {
  const ipAddres = document.getElementById("ip-address");
  const location = document.getElementById("location");
  const timezone = document.getElementById("timezone");
  const isp = document.getElementById("isp");
  const input = document.getElementById("input");
  const button = document.querySelector(".button");

  input.addEventListener("change", getInput);
  button.addEventListener("click", handler);

  function getInput(event) {
    input.value = event.target.value;
  }

  function handler(ip) {
    axios({
      url: `https://geo.ipify.org/api/v2/country?apiKey=at_w3cHbvrtluZyRZmfjdofwH2K2NoMZ&ipAddress=${ip}`,
      method: "get",
    }).then((res) => {
      console.log(res);
      ipAddres.innerText = res.data.ip;
      location.innerText = res.data.location.region;
      timezone.innerText = res.data.location.timezone;
      isp.innerText = res.data.isp;
    });
  }
};

// todo:n show map
var mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 16,
};
var map = new L.map("map", mapOptions);
var layer = new L.TileLayer(
  "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
);
map.addLayer(layer);

var marker = new L.Marker([17.385044, 78.486671]);
// Adding marker to the map
marker.addTo(map);
