var map;
var Geocoder;
var markers = {
	station: [],
	factory: [],
}

function getG0v(name, cb){
	var colorArr = ['#0000CC','#0133CC','#0166FF','#0099FF','#32CBFE','#65FE9A','#99FF66','#CCFF33','#FFFF01','#FF9933','#FF3301','#C90000','#800000'];
	console.log(colorArr);
	$.getJSON('http://cors.lagden.in/call?url=https://airmap.g0v.asper.tw/json/' + name +'.json?raw=1', function(d){
		Object.keys(d).forEach((i) => {
			//color
			var pm25 = Number(d[i].Data.Dust2_5);
			var color, fgColor;

			if(pm25 >= 80)color = colorArr[12];
			else if(pm25 >= 65)color = colorArr[11];
			else if(pm25 >= 50)color = colorArr[10];
			else if(pm25 >= 35)color = colorArr[9];
			else if(pm25 >= 20)color = colorArr[8];
			else if(pm25 >= 18)color = colorArr[7];
			else if(pm25 >= 15)color = colorArr[6];
			else if(pm25 >= 13)color = colorArr[5];
			else if(pm25 >= 10)color = colorArr[4];
			else if(pm25 >= 8)color = colorArr[3];
			else if(pm25 >= 5)color = colorArr[2];
			else if(pm25 >= 3)color = colorArr[1];
			else color = colorArr[0];
			if(pm25 >= 10 && pm25 < 65)fgColor = 'black';
			else fgColor = 'white';
			console.log(color);

			//mark
			markers.station.push(new google.maps.Marker({
				position: { lat: parseFloat(d[i].LatLng.lat), lng: parseFloat(d[i].LatLng.lng) },
				//label: d[i].Data.Dust2_5 + '',
				map: map,
				icon: 'data:image/svg+xml;charset=utf-8,<svg width="20" height="20" viewBox="-55 -55 110 110" xmlns="http://www.w3.org/2000/svg">	<circle r="40" stroke="#4F595D" stroke-width="2" fill="' + color +'" /><text x="0" y="13" fill="' + fgColor + '" text-anchor="middle" style="font-size:45px; font-weight: 800; ">' + d[i].Data.Dust2_5 + '</text></svg>'
				//icon: 'pic/factory.png'
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
				markers.factory.push(new google.maps.Marker({
					map: map,
					position: {
						lat: parseFloat(d[j].Lat),
						lng: parseFloat(d[j].Lng),
					},
				}));
			}
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
	// getG0v('lass-maps');
	// getG0v('asus-airbox');
	// getG0v('edimax-airbox');
	// getG0v('independent');
	// getG0v('probecube');
	getFactoryData();
}

$(function(){
	var dataList = [];

});
