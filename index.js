window.onload = function () {
  setTimeout(initialaize, 100);

  // Selectors
  const ipAddres = document.getElementById("ip-address");
  const location = document.getElementById("location");
  const timezone = document.getElementById("timezone");
  const isp = document.getElementById("isp");
  const button = document.querySelector(".button");

  // * EventListeners
  button.addEventListener("click", handler);

  // *Functions
  // todo:
  function handler() {
    const input = document.getElementById("input").value;
    const pattern = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/g;
    if (pattern.test(input)) {
      axios({
        url: `https://geo.ipify.org/api/v2/country,city?apiKey=at_w3cHbvrtluZyRZmfjdofwH2K2NoMZ&ipAddress=${input}`,
        method: "get",
      }).then((res) => {
        ipAddres.innerText = res.data.ip;
        location.innerText = res.data.location.region;
        timezone.innerText = res.data.location.timezone;
        isp.innerText = res.data.isp;
        showMap(res.data.location.lat, res.data.location.lng);
      });
    }
  }

  // todo:
  function showMap(lat, lng) {
    let mapOptions = {
      center: [lat, lng],
      zoom: 16,
    };
    let map = new L.map("map", mapOptions);
    let layer = new L.TileLayer(
      "http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
    );
    map.addLayer(layer);

    let marker = new L.Marker([lat, lng]);
    // Adding marker to the map
    marker.addTo(map);
  }

  // todo:
  function initialaize() {
    axios({
      url: `https://geo.ipify.org/api/v2/country,city?apiKey=at_w3cHbvrtluZyRZmfjdofwH2K2NoMZ`,
      method: "get",
    }).then((res) => {
      ipAddres.innerText = res.data.ip;
      location.innerText = res.data.location.region;
      timezone.innerText = res.data.location.timezone;
      isp.innerText = res.data.isp;
      showMap(res.data.location.lat, res.data.location.lng);
    });
  }
};
