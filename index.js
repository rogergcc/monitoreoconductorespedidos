var map = L.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


	var LeafIcon = L.Icon.extend({
		options: {
			shadowUrl: 'leaf-shadow.png',
			iconSize:     [38, 95],
			shadowSize:   [50, 64],
			iconAnchor:   [22, 94],
			shadowAnchor: [4, 62],
			popupAnchor:  [-3, -76]
		}
	});

	var greenIcon = new LeafIcon({iconUrl: 'taxi_ocupado.svg'}),
		redIcon = new LeafIcon({iconUrl: 'map_pin.svg'}),
		orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

	L.marker([-18.003802, -70.232961], {icon: greenIcon}).bindPopup("I am a green leaf.").addTo(map);
	L.marker([-18.007071, -70.242913], {icon: redIcon}).bindPopup("I am a red leaf.").addTo(map);
	// L.marker([51.49, -0.1], {icon: orangeIcon}).bindPopup("I am an orange leaf.").addTo(map);

	const osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

	map.addLayer(osm);
L.Routing.control({
    // serviceUrl: 'http://my-osrm/route/v1',
    // router: L.Routing.osrmv1({
    //     serviceUrl: 'http://my-osrm/route/v1'
    // }),
    waypoints: [
        L.latLng(-18.003802, -70.232961),
		L.latLng(-18.007071, -70.242913)
    ]
    
}).addTo(map);
