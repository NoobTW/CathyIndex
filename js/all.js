var map;
var Geocoder;
var markers = {
	station: [],
	factory: [],
}

function getG0v(name, cb){
	$.getJSON('http://cors.lagden.in/call?url=https://airmap.g0v.asper.tw/json/' + name +'.json?raw=1', function(d){
		Object.keys(d).forEach((i) => {
			markers.station.push(new google.maps.Marker({
				position: { lat: parseFloat(d[i].LatLng.lat), lng: parseFloat(d[i].LatLng.lng) },
				label: d[i].Data.Dust2_5 + '',
				map: map,
				icon: 'pic/horse-4-48.ico'
			}));
		});
	});
}

// var factorycount = 0;
function getFactoryData(cb){
	$.ajax({
		url: 'data/pollution.json',
		dataType: 'json',
		method: 'get',
		async: true,
		success: function(d){
			for(let j=0;j<d.length;j++){
				if(d.AirRegisteredStatus !== ''){
					addr2Marker(d.Address);
					console.log(d.Address);
				}
			}
		}
	});
}

function addr2Marker(addr){
	Geocoder.geocode({address: addr}, function(res, status){
		if(status === google.maps.GeocoderStatus.OK){
			markers.factory.push(new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			}));
		}
	});
}

function initMap(){
	Geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 23.4570665, lng: 120.2943369 },
		zoom: 8,
		styles: [
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#444444"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#f2f2f2"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 45
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#ff6d00"
					},
					{
						"visibility": "on"
					}
				]
			}
		]
	});
	// getG0v('lass');
	// getG0v('lass-4u');
	getG0v('lass-maps');
	// getG0v('asus-airbox');
	// getG0v('edimax-airbox');
	// getG0v('independent');
	// getG0v('probecube');
	//getFactoryData();
}

$(function(){
	var dataList = [];

});
