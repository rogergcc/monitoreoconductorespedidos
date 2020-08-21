
// Replace your Configuration here..
// var config = {
//     apiKey: "AIzaSyCKp-RwlkZhJBehZLOSLhn1E7WpoXn9xoI",
//     authDomain: "realtime-on-map-example.firebaseapp.com",
//     databaseURL: "https://realtime-on-map-example.firebaseio.com",
//     projectId: "realtime-on-map-example",
//     storageBucket: "",
//     messagingSenderId: "851837622908"
// };

const config = {
    apiKey: "AIzaSyCKp-RwlkZhJBehZLOSLhn1E7WpoXn9xoI",
    authDomain: "holafirebaseesis-4ca1e.firebaseapp.com",
    databaseURL: "https://holafirebaseesis-4ca1e.firebaseio.com",
    projectId: "holafirebaseesis-4ca1e",
    storageBucket: "holafirebaseesis-4ca1e.appspot.com",
    messagingSenderId: "488365125892",
    appId: "1:488365125892:web:3ca6c42e1c23973eb4e051"
};
firebase.initializeApp(config);




// counter for online cars...
var cars_count = 0;
var pedidos_count = 0;
var colorConductor = "#00023";
// markers array to store all the markers, so that we could remove marker when any car goes offline and its data will be remove from realtime database...
var markers = [];
var conductoresArray = [];

var markersPedidos = [];
var map;

var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;
var position = [-18.007365329405616, -70.23910849676058]; //lat lon CEID

var datos;

var flightPlanCoordinates = [
    
];
var flightPath;
async function fetcRoute(point2LONGLAT,point1LONGLAT) {
    const rsp = await fetch(
        // "http://router.project-osrm.org/route/v1/driving/-70.232961,-18.003802;-70.242913,-18.007071?geometries=geojson&alternatives=true&steps=true&generate_hints=false" 
        `http://router.project-osrm.org/route/v1/driving/${point2LONGLAT};${point1LONGLAT}?geometries=geojson&alternatives=false&steps=false&generate_hints=false`
    ),
        data = await rsp.json();
    return data.routes[0].geometry.coordinates;
}

async function RutaPedido(GetRoute) {
    flightPlanCoordinates=[];
    for (let i = 0; i < GetRoute.length; i++) {
        let element = GetRoute[i];
        let position = { lat: element[1], lng: element[0] };

        flightPlanCoordinates.push(position)


    }
    flightPath= new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    //Route
    flightPath.setMap(map);
    
}

async function initMap() { // Google Map Initialization... 
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: new google.maps.LatLng(-17.999185264756488, -70.22676184158168),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });



    let coordinates = [
        [
            -70.233026,
            -18.003737
        ],
        [
            -70.232912,
            -18.003633
        ],
        [
            -70.235104,
            -18.000706
        ],
        [
            -70.236001,
            -18.000844
        ],
        [
            -70.236584,
            -18.001228
        ],
        [
            -70.240753,
            -18.004721
        ],
        [
            -70.241506,
            -18.005073
        ],
        [
            -70.240671,
            -18.005785
        ],
        [
            -70.24226,
            -18.007449
        ],
        [
            -70.2428,
            -18.006953
        ],
        [
            -70.242936,
            -18.007039
        ]
    ];

    let CoordinatePGX = [

        { lat: -18.00286, lon: -70.23665 },
        { lat: -18.00289, lon: -70.23671 },
        { lat: -18.00294, lon: -70.23679 },
        { lat: -18.0031, lon: -70.23702 },
        { lat: -18.00375, lon: -70.23797 },
        { lat: -18.00451, lon: -70.23894 },
        { lat: -18.00505, lon: -70.23966 },
        { lat: -18.00518, lon: -70.23986 },
        { lat: -18.00518, lon: -70.23986 },
        { lat: -18.00535, lon: -70.24014 },
        { lat: -18.00574, lon: -70.24063 },
        { lat: -18.00574, lon: -70.24063 },
        { lat: -18.00579, lon: -70.24067 },
        { lat: -18.00636, lon: -70.24121 },
        { lat: -18.00689, lon: -70.24173 },
        { lat: -18.00745, lon: -70.24226 },
        { lat: -18.00823, lon: -70.24306 },
        { lat: -18.00823, lon: -70.24306 },
        { lat: -18.00834, lon: -70.24318 },
        { lat: -18.00908, lon: -70.24399 },
        { lat: -18.00955, lon: -70.24456 },
        { lat: -18.00955, lon: -70.24456 },
        { lat: -18.0096, lon: -70.24456 },
        { lat: -18.00965, lon: -70.24455 },
        { lat: -18.00985, lon: -70.24436 },
        { lat: -18.01, lon: -70.24421 },
        { lat: -18.01, lon: -70.24421 },
        { lat: -18.01087, lon: -70.24527 },
        { lat: -18.01093, lon: -70.24535 },
        { lat: -18.01178, lon: -70.24642 },
        { lat: -18.0131, lon: -70.24811 },
        { lat: -18.01361, lon: -70.24877 },
        { lat: -18.01407, lon: -70.24935 },
        { lat: -18.01414, lon: -70.24945 },
        { lat: -18.01414, lon: -70.24945 },
        { lat: -18.01416, lon: -70.24947 },
        { lat: -18.01416, lon: -70.24947 },
        { lat: -18.0146, lon: -70.25012 },
        { lat: -18.0151, lon: -70.25086 },
        { lat: -18.0154, lon: -70.25133 },
        { lat: -18.01544, lon: -70.25139 },
        { lat: -18.01572, lon: -70.25181 },
        { lat: -18.01572, lon: -70.25181 },
        { lat: -18.01576, lon: -70.25191 },
        { lat: -18.01599, lon: -70.25174 },
        { lat: -18.01617, lon: -70.25161 },
        { lat: -18.01617, lon: -70.25161 },
        { lat: -18.01606, lon: -70.25148 },
        { lat: -18.0157, lon: -70.25104 },
        { lat: -18.01507, lon: -70.25028 },
        { lat: -18.01507, lon: -70.25028 },
    ];
    



    let point1 = { lat: -18.003802, lon: -70.232961 }
    let point2 = { lat: -18.003802, lon: -70.232961 }

    let point1LONGLAT = "-70.242913,-18.007071";
    let point2LONGLAT = "-70.232961,-18.003802";
    const url = `http://router.project-osrm.org/route/v1/driving/${point2LONGLAT};${point1LONGLAT}?overview=false`;
    //http://router.project-osrm.org/route/v1/driving/-70.232961,-18.003802;-70.242913,-18.007071?geometries=geojson&alternatives=true&steps=true&generate_hints=false

    


    // for (let i = 0; i < GetRoute.length; i++) {
    //     let element = GetRoute[i];
    //     let position = { lat: element[1], lng: element[0] };

    //     flightPlanCoordinates.push(position)


    // }


    // var flightPath = new google.maps.Polyline({
    //     path: flightPlanCoordinates,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    // });

    // //Route
    // flightPath.setMap(map);

    // map.data.loadGeoJson(
    //     // "https://storage.googleapis.com/mapsdevsite/json/google.json"
    //     "https://gist.githubusercontent.com/rogergcc/e19cc5885579b3c76219e12f8be13e46/raw/4fbf14688e02a877f72896635982305d5f7aebdd/zonaPinto.geojson"
    //   );

}
//#region REGION TRANSISION
function transition(result, data) {
    datos = data.val();
    console.log("data Mombre: " + datos);
    i = 0;
    deltaLat = (result[0] - position[0]) / numDeltas;
    deltaLng = (result[1] - position[1]) / numDeltas;
    moveMarker();
}

function moveMarker() {
    console.log("Move Markerr Mombre: " + datos.nombre);
    position[0] += deltaLat;
    position[1] += deltaLng;

    //var latlng = new google.maps.LatLng(position[0], position[1]);

    var longlat = [position[1], position[0]];
    //marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    //marker.setPosition(latlng);

    // marker.setLngLat(longlat)
    // marker.addTo(map);

    if (i != numDeltas) {
        i++;
        setTimeout(moveMarker, delay);
    }
}

//#endregion


// This Function will create a car icon with angle and add/display that marker on the map
function AddMarkerConductor(data) {
    let conductor = data;


    let urlIcon = (conductor.situacion == "Disponible") ? 'taxi_location.svg' : 'taxi_ocupado.svg';
    var result = [parseFloat(conductor.latitud), parseFloat(conductor.longitud)];
    //transition(result,data)

    //#region marker e icono

    var icon = { // car icon

        url: urlIcon,
        //path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
        // scale: 0.6,
        scaledSize: new google.maps.Size(48, 48),
        fillColor: colorConductor, //<-- Car Color, you can change it 
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new google.maps.Point(0, 5),
        rotation: 44 //<-- Car angle
    };

    //path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',

    // Esta es la información del marker que se va a mostrar, el contenido acepta HTML
    var infowindow = new google.maps.InfoWindow({
        content: `<strong>Conductor: ${conductor.nombre}
                    <p>Telefono ${conductor.telefono}</p>
                    </strong>`
    });
    var uluru = { lat: parseFloat(conductor.latitud), lng: parseFloat(conductor.longitud) };

    var marker = new google.maps.Marker({
        position: uluru,
        icon: icon,
        map: map,
        title: conductor.nombre
    });

    // Al hacer click sobre el marker mostraremos su información en una ventana
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    markers[conductor.key] = marker; // add marker in the markers array...
    document.getElementById("cars").innerHTML = cars_count;
    //#endregion

}

//#region REGION LISTADO CONDUCTORES
function buildLococationConductoresList(data) {
    let array = data;
    let arraySize = array.length;
    let color;
    var listings = document.getElementById('poimapbox-listings');
    listings.innerHTML = "";
    for (let i = 0; i < arraySize; i++) {
        let element = array[i];
        let conductor = element;

        AddMarkerConductor(element);

        color = (conductor.situacion == "Disponible") ? '#8bc34ba3' : '#ff572287';


        var listing = listings.appendChild(document.createElement('div'));
        listing.innerHTML
        listing.className = 'amenity-poi';


        listing.style.backgroundColor = color;

        listing.id = "listing-" + i;

        var link = listing.appendChild(document.createElement('a'));
        link.innerHTML = "";
        link.href = '#';
        link.className = 'name';
        link.dataPosition = i;

        link.innerHTML =
            // '<img src=' + conductor.properties.imagetmb + '>' +
            '<img src=https://img.icons8.com/cotton/240/000000/conversation-with-a-taxi-driver.png>' +
            '<h3>' + conductor.nombre + '</h3>' +
            '<p>' + conductor.telefono + '</p>' +
            '<p>' + conductor.fechaRegistro + '</p>' +
            '<p>? ' + conductor.email + '</p>'

        link.addEventListener('click', function (e) {
            // Update the conductor to the Park associated with the clicked link
            var clickedListing = data[this.dataPosition];
            console.log(clickedListing);
            // // 1. Fly to the point
            flyToStore(clickedListing);

            // // 2. Close all other popups and display popup for clicked Park
            // createPopUp(clickedListing);

            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            var activeItem = document.getElementsByClassName('amenity-poi active');

            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');

        });

    }
}

function flyToStore(currentFeature) {
    let latitud = parseFloat(currentFeature.latitud);
    let longitud = parseFloat(currentFeature.longitud);
    // map.flyTo({
    //     center: currentFeature,
    //     zoom: 15
    // });

    map.setZoom(17);
    map.panTo({ lat: latitud, lng: longitud });
}
//#endregion


// get firebase database reference...
var cars_Ref = firebase.database().ref('/Conductor');


var dataConductores = firebase.database().ref('/Conductor');
dataConductores.on('value', function (snapshot) {
    //updateStarCount(postElement, snapshot.val());

    let conductores = snapshot.val();
    conductoresArray = [];
    for (const key in conductores) {
        if (conductores.hasOwnProperty(key)) {
            const element = conductores[key];
            //console.log(element);
            conductoresArray.push(element);


        }
    }

    buildLococationConductoresList(conductoresArray);
});

// this event will be triggered when a new object will be added in the database...
cars_Ref.on('child_added', function (data) {
    //console.log(data.val());
    cars_count++;
    //AddMarkerConductor(data);
    let conductor = data.val();

});

// this event will be triggered on location change of any car...
cars_Ref.on('child_changed', function (data) {
    markers[data.key].setMap(null);
    //AddMarkerConductor(data);
    let conductor = data.val();

});

// If any car goes offline then this event will get triggered and we'll remove the marker of that car...  
cars_Ref.on('child_removed', function (data) {
    markers[data.key].setMap(null);
    cars_count--;
    document.getElementById("cars").innerHTML = cars_count;
});


function GetDataConductorFromPedido(ConductorCodigo) {
    //var conductor = firebase.database().ref('/Conductor');
    //var conductor = firebase.database().ref('bills').child("-Lh-LgSqR1vSANRnA09G");
    let conductorData;
    var conductor = firebase.database().ref('/Conductor').child(ConductorCodigo);
    conductor.once('value', function (snapshot) {

        conductorData = snapshot.val();


        return conductorData;
    });

    // var conductor = firebase.database().ref(`/Conductor/${ConductorCodigo}`);
    // conductor.on('value', function (snapshot) {
    //     //updateStarCount(postElement, snapshot.val());
    //     let conductor = data.val();

    //     var datos = conductor;
    //     return conductor;
    // });

    return conductorData;

}

async function GetDataClienteFromPedido(ClienteCodigo) {

    const clienteref = firebase.database().ref('/Cliente/' + ClienteCodigo);
    const snapshot = await clienteref.once('value');
    const clienteData = snapshot.val();

    return clienteData;

}

async function AddPedido(data) {

    

    var color = "";
    let pedido = data.val();
    let cliente = await GetDataClienteFromPedido(pedido.codigoCliente);
    // const clienteref = firebase.database().ref('/Cliente/'+pedido.codigoCliente);

    // const snapshot = await clienteref.once('value');

    // const cliente = snapshot.val();

    let conductor;
    let conductorASIGNADO;
    if (pedido.conductor=="") {
        conductorASIGNADO=false;
        
    } else {
        conductorASIGNADO=true;
        conductor = GetDataConductorFromPedido(pedido.conductor);

        let point1LONGLAT = conductor.longitud+","+conductor.latitud;
        let point2LONGLAT = pedido.longitud+","+pedido.latitud;

        let GetRoute = [];
        try {
            GetRoute = await fetcRoute(point2LONGLAT,point1LONGLAT);

            console.log(GetRoute);

            await RutaPedido(GetRoute);
        } catch (error) {
            console.error(error);
        }

    }
    

    // let coductorOcupadoLatitud = (conductor.situacion == "Disponible") ? true : false;

    
    

    if (pedido.estado == "Registrado") {

        color = "#1f3";
        colorConductor = "#1f3";

    } else if (pedido.estado == "En curso") {
        color = "#f13";
        colorConductor = "#f13";
    } else {
        color = "#000";
        flightPath.setMap(null);
    }

    var icon = { // car icon
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        scale: 0.6,
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 1,
        anchor: new google.maps.Point(0, 5),
        rotation: pedido.angle //<-- Car angle
    };

    // if(cliente!=null){
    // Esta es la información del marker que se va a mostrar, el contenido acepta HTML
    //<p>Cliente : ${cliente.nombre}  Tel : ${cliente.telefono}</p>

    
    let conductorDatos= "";

    if(conductorASIGNADO){
        conductorDatos= `<p>Conductor : ${conductor.nombre}  Tel : ${conductor.telefono}</p>`;
    }else{
        

        conductorDatos="PEDIDO REGISTRADO, CONDUCTOR NO ASIGNADO";
    }

    var infowindow = new google.maps.InfoWindow({
        content: `<strong>Pedido: ${pedido.nombre}
                <p>Cliente : ${cliente.nombre}  Tel : ${cliente.telefono}</p>
                ${conductorDatos}
                <p>Direccion: ${pedido.direccion}</p>
                <p>Precio: ${pedido.precio}</p>
                </strong>`
    });

// }
    var uluru = { lat: parseFloat(pedido.latitud), lng: parseFloat(pedido.longitud) };

    if(pedido!=null){
    var marker = new google.maps.Marker({
        position: uluru,
        icon: icon,
        map: map,
        title: pedido.nombre
    });
    }
    // Al hacer click sobre el marker mostraremos su información en una ventana
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    markersPedidos[data.key] = marker; // add marker in the markers array...
    document.getElementById("pedidos").innerHTML = pedidos_count;
}




var pedidos_Ref = firebase.database().ref('/Pedido');

// this event will be triggered when a new object will be added in the database...
pedidos_Ref.on('child_added', function (data) {
    pedidos_count++;
    AddPedido(data);
});

// this event will be triggered on location change of any car...
pedidos_Ref.on('child_changed', function (data) {
    markersPedidos[data.key].setMap(null);
    AddPedido(data);
});

// If any car goes offline then this event will get triggered and we'll remove the marker of that car...  
pedidos_Ref.on('child_removed', function (data) {
    markersPedidos[data.key].setMap(null);
    pedidos_count--;
    document.getElementById("pedidos").innerHTML = pedidos_count;
});



