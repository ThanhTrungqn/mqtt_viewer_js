//*****************************************************************//
//zone of variable take
var reconnectTimeout = 2000;
var cleansession = true;
var data_mqtt = {
	"host": "192.168.12.191",
	"port": 9001,
	"topic": "topic_test"
}
//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client(data_mqtt.host, data_mqtt.port, "myclientid_" + parseInt(Math.random() * 100, 10));

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
	var message = new Messaging.Message(payload);
	message.destinationName = topic;
	message.qos = qos;
	client.send(message);
}
var count = 0;
//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
	count++;
	console.log(message.payloadString);
	var json_data = JSON.parse(message.payloadString);
	var json_data_array = json_data['image'];
	draw_canvas(json_data_array);
	document.getElementById("id_image").innerHTML = "Number Image" + count;
};

//*****************************************************************//
function button_connect() {
	var options = {
		timeout: 30,
		cleanSession: cleansession,
		//Gets Called if the connection has sucessfully been established
		onSuccess: function () {
			client.subscribe(data_mqtt.topic, { qos: 2 });
		},
		//Gets Called if the connection could not be established
		onFailure: function (message) {
			document.getElementById("button_connect_").disabled = false;
			document.getElementById("button_stop_").disabled = true;
		}
	}
	//Connect
	client.connect(options);
}
function button_stop() {
	client.disconnect();
}
//*****************************************************************//

var array2 = [0, 0, 0, 1, 6, 1, 4, 4, 5, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 3, 0, 2, 0, 0, 4, 0, 3, 0, 0, 0, 4, 0, 0, 0, 0, 3, 3, 0, 4, 5, 0, 1, 0, 1, 1, 0, 0, 4, 0, 6, 0, 0, 1, 0, 0, 6, 0, 0, 0, 4, 0, 0, 0, 4, 0, 1, 0, 1, 4, 0, 0, 3, 3, 1, 0, 5, 1, 1, 0, 0, 1, 9, 0, 2, 0, 0, 0, 4, 5, 10, 1, 1, 4, 0, 0, 4, 3, 2, 2, 3, 3, 0, 2, 2, 6, 2, 2, 0, 0, 0, 2, 1, 0, 1, 1, 0, 1, 2, 0, 1, 0, 0, 0, 4, 2, 1, 0, 0, 4, 0, 0, 0, 1, 0, 0, 3, 2, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 4, 0, 2, 1, 0, 0, 4, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 1, 0, 2, 2, 0, 4, 0, 1, 0, 0, 2, 5, 0, 3, 5, 1, 3, 1, 2, 3, 3, 5, 2, 3, 2, 1, 2, 0, 5, 0, 0, 0, 0, 0, 0, 3, 4, 1, 0, 0, 0, 1, 5, 0, 2, 1, 0, 0, 0, 4, 0, 0, 0, 1, 4, 0, 1, 2, 0, 0, 4, 0, 0, 0, 2, 4, 6, 0, 3, 3, 3, 0, 0, 3, 0, 3, 3, 1, 2, 0, 0, 1, 4, 0, 0, 2, 0, 0, 1, 1, 0, 0, 2, 2, 0, 5, 0, 2, 2, 0, 1, 1, 0, 2, 4, 3, 0, 0, 2, 0, 0, 2, 0, 1, 2, 0, 0, 0, 6, 3, 0, 0, 6, 0, 0, 0, 1, 0, 1, 0, 0, 4, 1, 8, 0, 6, 2, 2, 5, 2, 0, 8, 0, 3, 2, 3, 0, 0, 0, 3, 1, 2, 5, 6, 1, 0, 2, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 0, 0, 0, 3, 0, 0, 0, 10, 2, 4, 5, 0, 3, 0, 3, 1, 0, 3, 1, 4, 0, 1, 0, 0, 5, 2, 6, 0, 0, 2, 1, 0, 5, 2, 0, 0, 0, 2, 0, 4, 1, 6, 0, 0, 0, 0, 1, 0, 3, 2, 2, 0, 0, 1, 3, 1, 3, 1, 0, 1, 0, 0, 2, 0, 5, 4, 0, 1, 0, 0, 2, 0, 6, 1, 2, 1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2, 4, 0, 2, 4, 3, 0, 0, 2, 4, 2, 0, 0, 1, 2, 5, 9, 4, 0, 3, 0, 0, 0, 2, 0, 0, 0, 4, 1, 0, 3, 3, 3, 0, 2, 0, 0, 7, 1, 1, 0, 0, 1, 2, 0, 4, 11, 9, 13, 14, 1, 6, 3, 1, 5, 5, 1, 1, 0, 1, 5, 1, 0, 0, 0, 3, 8, 1, 3, 3, 0, 1, 2, 0, 0, 0, 0, 5, 9, 8, 16, 14, 9, 6, 0, 1, 4, 0, 0, 0, 4, 3, 0, 0, 3, 2, 0, 0, 1, 0, 0, 0, 2, 4, 0, 6, 0, 0, 4, 2, 3, 7, 6, 10, 13, 8, 7, 7, 0, 0, 0, 0, 0, 0, 2, 4, 3, 7, 2, 0, 0, 3, 3, 0, 2, 1, 2, 0, 0, 0, 1, 2, 5, 5, 7, 12, 10, 3, 0, 0, 3, 0, 4, 0, 0, 0, 3, 2, 2, 1, 0, 1, 5, 1, 4, 5, 1, 0, 5, 1, 0, 0, 5, 3, 2, 2, 4, 5, 5, 5, 1, 3, 0, 1, 2, 0, 0, 3, 0, 1, 0, 0, 1, 2, 0, 2, 4, 4, 1, 4, 0, 0, 0, 0, 2, 0, 0, 0, 3, 2, 7, 8, 4, 0, 0, 0, 3, 0, 1, 6, 3, 0, 0, 0, 0, 0, 2, 0, 0, 2, 1, 0, 0, 1, 3, 0, 1, 1, 4, 3, 4, 0, 0, 4, 3, 2, 0, 0, 0, 0, 3, 0, 0, 6, 0, 1, 3, 2, 5, 2, 1, 2, 1, 1, 0, 1, 2, 0, 1, 4, 1, 2, 4, 8, 0, 8, 1, 0, 1, 2, 0, 0, 0, 4, 6, 0, 0, 0, 4, 2, 0, 1, 0, 0, 0, 2, 2, 0, 4, 3, 0, 0, 1, 0, 0, 0, 0, 2, 2, 1, 0, 3, 0, 1, 0, 5, 6, 0, 1, 4, 1, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1, 2, 0, 3, 0, 1, 3, 0, 0, 0, 1, 0, 3, 4, 0, 5, 8, 3, 0, 4, 5, 1, 2, 0, 5, 0, 0, 3, 1, 5, 4, 1, 1, 0, 1, 4, 0, 0, 5, 0, 1, 3, 0, 1, 0, 0, 2, 1, 0, 0, 2, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 3, 0, 0, 1, 1, 2, 1, 2, 8, 5, 4, 6, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 0, 2, 0, 3, 3, 1, 1, 0, 0, 0, 0, 0, 2, 2, 1, 0, 4, 0, 2, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 6, 4, 1, 2, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 6, 4, 2, 1, 0, 0, 2, 0, 0, 0, 4, 5, 4, 1, 0, 2, 3, 0, 0, 7, 2, 1, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 1, 0, 4, 0, 1, 0, 4, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 6, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 2, 0, 1, 4, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 4, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 6, 0, 3, 0, 4, 0, 5, 6, 0, 0, 2, 7, 3, 2, 2, 0];


function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function map(value, fromSource, toSource, fromTarget, toTarget) {
	return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
}

function getColour(startColour, endColour, min, max, value) {

	var startRGB = hexToRgb(startColour);
	var endRGB = hexToRgb(endColour);


	var percentFade = map(value, min, max, 0, 1);

	var diffRed = endRGB.r - startRGB.r;
	var diffGreen = endRGB.g - startRGB.g;
	var diffBlue = endRGB.b - startRGB.b;

	diffRed = (diffRed * percentFade) + startRGB.r;
	diffGreen = (diffGreen * percentFade) + startRGB.g;
	diffBlue = (diffBlue * percentFade) + startRGB.b;

	var result = "rgb(" + Math.round(diffRed) + ", " + Math.round(diffGreen) + ", " + Math.round(diffBlue) + ")";
	return result;
}

function getColour_2(min, max, value) {
	const palette_viridis = ["#440154","#481567","#482677","#453781","#404788","#39568C","#33638D","#2D708E","#287D8E","#238A8D",
"#1F968B","#20A387","#29AF7F","#3CBB75", "#55C667", "#73D055", "#95D840", "#B8DE29", "#DCE319", "#FDE725"];
	const size_palette = palette_viridis.length;
	var delta = Math.round((max - min)/(size_palette-1) * 100)/100;
	var palette_value = [];
	palette_value.push(min);
	for (let i=1; i<size_palette-1; i++){
		palette_value.push(palette_value[i-1] + delta);
	}
	palette_value.push(max);

	for (let i=0; i < size_palette; i++){
		if (value == palette_value[i]){
			return palette_viridis[i];
		}
		if(value < palette_value[i]){
			return getColour(palette_viridis[i-1], palette_viridis[i], palette_value[i-1], palette_value[i], value);
		}
	}	
}

function draw_canvas(array1) {
	var max_array = Math.max(...array1);
	var min_array = Math.min(...array1);
	var width_pixel = 20;
	var height_pixel = 20;
	var c = document.getElementById("stream32_32");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);

	for (var x = 0; x < 32; x++) {
		for (var y = 0; y < 32; y++) {
			var value = array1[y * 32 + x];
			ctx.fillStyle = getColour_2(min_array, max_array, value);
			ctx.fillRect(x * width_pixel, y * height_pixel, width_pixel, height_pixel);
		}
	}
	document.getElementById("max_value").innerHTML = "Max " + max_array;
	document.getElementById("min_value").innerHTML = "Min " + min_array;
}
//*****************************************************************//

$(document).ready(function () {
	draw_canvas(array2);
});