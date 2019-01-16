function myFunction() {
  var map = L.map("map", { scrollWheelZoom: false }).setView(
    [50.836166, -0.1193],
    14
  );
  if (map.tap) map.tap.disable();
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
      maxZoom: 16
    }
  ).addTo(map);

  map._layersMinZoom = 10;

  // Add custom overlay
  /*
  var	bounds = new L.LatLngBounds(
    new L.LatLng(50.834166, -0.164660),
    new L.LatLng(50.816169, -0.119300));

  map.fitBounds(bounds);

  var overlay = new L.ImageOverlay("http://ontheworldmap.com/uk/city/brighton/brighton-tourist-attractions-map.jpg", bounds, {
    opacity: 1,
    interactive: true,
    attribution: '&copy; Brighton Council.'
  });

  map.addLayer(overlay);
*/

  // add var "code"
  var code = "1xznOooD52LdoQyFNCD_ZOFAzF9j4eyJAmsTGeNAT9Yw";

  // loop through spreadsheet with Tabletop
  Tabletop.init({
    key: code,
    callback: function(sheet, tabletop) {
      for (var i in sheet) {
        var data = sheet[i];

        var icon = L.icon.fontAwesome({
          iconClasses: "fa " + data.fonticon, // you _could_ add other icon classes, not tested.
          markerColor: data.markercolor,
          iconColor: data.iconcolor
        });
        /*
          var icon = L.icon({
              iconUrl: data.icon,
              iconSize:     [52, 60], // size of the icon
              iconAnchor:   [26, 60], // point of the icon which will correspond to marker's location
              popupAnchor: [0, -60]
          });
          */
        if (data.iconori === "left") {
          icon = L.icon({
            iconUrl: data.icon,
            iconSize: [60, 52],
            iconAnchor: [60, 26],
            popupAnchor: [-35, -26]
          });
        }
        if (data.iconori === "right") {
          icon = L.icon({
            iconUrl: data.icon,
            iconSize: [60, 52],
            iconAnchor: [0, 26],
            popupAnchor: [35, -26]
          });
        }

        // create popup contents
        var customPopup =
          "<h3>" +
          data.category +
          "</h3><br>" +
          data.description +
          " | " +
          data.city +
          "<br>Head: " +
          data.head;

        // specify popup options
        var customOptions = {
          maxWidth: "500",
          className: "custom"
        };

        L.marker([data.latitude, data.longitude], {
          icon: icon,
          description: data.description,
          head: data.head,
          category: data.category,
          city: data.city
        })
          .addTo(map)
          .bindPopup(customPopup, customOptions)
          .openPopup()

          .on("click", markerOnClick);

        /*
          .bindPopup("<strong style='color: #84b819'>" + data.category + "</strong><br>" + 
          data.description + " | " + data.city + "<br>Head: " + data.head).openPopup();

          */
      }
    },
    simpleSheet: true
  });
}

function markerOnClick(e) {
  // if a marker is clicked, display the details from it
  var name = document.getElementById("description");
  var category = document.getElementById("category");
  var city = document.getElementById("city");
  var head = document.getElementById("head");
  // Assign the new value
  name.innerHTML = this.options.description;
  category.innerHTML = this.options.category;
  city.innerHTML = this.options.city;
  head.innerHTML = this.options.head;
}
