//*****************************************************************//
//zone of variable take
var colors = ["#ff4dd2", "#ff0000","#66ff66","#006600","#666600", "#ffff1a", "#6666ff", "#000080","#bbff33","#446600","#66e0ff","#005266"];
var reconnectTimeout = 2000;
var host="192.168.12.190";
var port=9001;
var topic="testtopic";
var cleansession=true;
//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client(host , port, "myclientid_" + parseInt(Math.random() * 100, 10));
//*****************************************************************//

var list_zone_interet = 
[
  { id: 1, X : 2, Y : 5, W : 12, H : 13, type : "bureau" , name : "Bureau de Thanh" },
  { id: 2, X : 2, Y : 21, W : 12, H : 13, type : "bureau" , name : "Bureau de Mehdi"},
  { id: 3, X : 17, Y : 13, W : 14, H : 13, type : "bureau" , name : "Bureau de Teddy"},
  { id: 4, X : 45, Y : 5, W : 12, H : 20, type : "bureau" , name : "Bureau de Julie"}
];
console.log(list_zone_interet);

//Gets called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
	console.log("connect");
};

/*****************************************************************************/
//Connect Options
var options = {
	timeout: 30,
	cleanSession: cleansession,
	 //Gets Called if the connection has sucessfully been established
	onSuccess: function () {
		console.log("go here")
		client.subscribe(topic, {qos: 2});	
	},
	 //Gets Called if the connection could not be established
	onFailure: function (message) {
		console.log("connect");
	}
}

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
	//Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
	var message = new Messaging.Message(payload);
	message.destinationName = topic;
	message.qos = qos;
	client.send(message);
}

$(document).ready(function() {
  client.connect(options);
});

var firsttime = false;
function convertirposition (listobject_input, option_miroir ,list_zone_interet){
	var i;
	var coordxmiroir=0;
	var coordymiroir=0;
	for ( i =0; i<listobject_input.length; i++){
		if (option_miroir == "vertical"){	
			coordxmiroir = 57;
		}
		if (option_miroir == "horizontal"){
			coordymiroir = 40;
		}
		listobject_input[i].X = listobject_input[i].X - coordxmiroir;
		listobject_input[i].Y = listobject_input[i].Y - coordymiroir;
		if ( listobject_input[i].X < 0 ){
			listobject_input[i].X = - listobject_input[i].X;
		}
		if ( listobject_input[i].Y < 0 ){
			listobject_input[i].Y = - listobject_input[i].Y;
		}
	}
	
	if (firsttime == false){
		firsttime = true;
		for ( i =0; i<list_zone_interet.length; i++){
			if (option_miroir == "vertical"){	
				coordxmiroir = 57;
				coordymiroir = 0;
				list_zone_interet[i].X = list_zone_interet[i].X - coordxmiroir
				listobject_input[i].Y = listobject_input[i].Y - coordymiroir;

			}
			if (option_miroir == "horizontal"){
				coordymiroir = 40;
				coordxmiroir = 0;
				list_zone_interet[i].X = list_zone_interet[i].X - coordxmiroir;
				list_zone_interet[i].Y = list_zone_interet[i].Y - coordymiroir;
			}
			if ( list_zone_interet[i].X < 0 ){
				list_zone_interet[i].X = - list_zone_interet[i].X;
			}
			if ( list_zone_interet[i].Y < 0 ){
				list_zone_interet[i].Y = - list_zone_interet[i].Y;
			}
			if (option_miroir == "horizontal"){
				list_zone_interet[i].Y -= list_zone_interet[i].H
			}
			if (option_miroir == "vertical"){
				list_zone_interet[i].X -= list_zone_interet[i].W
			}
		}
	}
}

var draw_zone = true;
//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
	var json_data = JSON.parse(message.payloadString);
	var json_data_person = json_data.person;
	convertirposition (json_data.person,"horizontal",list_zone_interet);

	var c  = document.getElementById("canvas");
	c.height = "400";
	c.width = "570";
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	if (draw_zone){
		for ( var i = 0; i < list_zone_interet.length; i++ ) {
			ctx.beginPath();
			ctx.lineWidth = "2";
			ctx.strokeStyle = "red";
			ctx.fillStyle = 'rgba(255,225,225,0.5)';
			ctx.fillRect(list_zone_interet[i].X*10, list_zone_interet[i].Y*10, list_zone_interet[i].W*10, list_zone_interet[i].H*10);
			ctx.fillStyle = 'rgba(255,0,0,1)';
			ctx.font = "12px Arial";
			ctx.fillText(list_zone_interet[i].name,list_zone_interet[i].X*10, list_zone_interet[i].Y*10);
		}
	}
	for ( var i = 0; i < json_data.person.length; i++ ) {
		ctx.beginPath();
		var size_object_affiche=json_data.person[i].S;
		var X=10*json_data.person[i].X;
		var Y=10*json_data.person[i].Y;
		var S = 20;
		if (json_data.person[i].S > 50){
			S = json_data.person[i].S - 25;
		}
		if (json_data.person[i].S < 20){
			S = json_data.person[i].S;
		}
		var R = size_object_affiche;
		ctx.fillStyle = 'rgba(255,0,0,0.8)';
		ctx.arc(X, Y, S, 0, 2 * Math.PI);
		ctx.fill();

	}
};