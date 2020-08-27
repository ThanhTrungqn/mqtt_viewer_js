//*****************************************************************//
//zone of variable take
var reconnectTimeout = 2000;
var cleansession=true;
var data_mqtt ={
	"host":"192.168.12.191",
	"port":9001,
	"topic":"oyalight/lum4/json"
}
//Using the HiveMQ public Broker, with a random client Id
var client = new Messaging.Client( data_mqtt.host , data_mqtt.port, "myclientid_" + parseInt(Math.random() * 100, 10));
//*****************************************************************//
function button_connect(){
	var options = {
		timeout: 30,
		cleanSession: cleansession,
		 //Gets Called if the connection has sucessfully been established
		onSuccess: function () {
			client.subscribe( data_mqtt.topic , {qos: 2});
			//document.getElementById("button_connect_").disabled = true;
			//document.getElementById("button_stop_").disabled = false;
		},
		 //Gets Called if the connection could not be established
		onFailure: function (message) {
			document.getElementById("button_connect_").disabled = false;
			document.getElementById("button_stop_").disabled = true;
		}
	}
	//Connect
	var paragraph = document.getElementById("text");
	var value_need_to_add = '{"image":['
	var text = document.createTextNode(value_need_to_add);
	paragraph.appendChild(text);
	client.connect(options);
}
function button_stop(){
	var paragraph = document.getElementById("text");
	var value_need_to_add = ']}';
	var text = document.createTextNode(value_need_to_add);
	paragraph.appendChild(text);
	client.disconnect();
}


//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
	//Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
	var message = new Messaging.Message(payload);
	message.destinationName = topic;
	message.qos = qos;
	client.send(message);
}
var count= 0;
//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
	var json_data = JSON.parse(message.payloadString);
	var json_data_imagebruit = json_data.luminaire.sensors.imagebruit;
	var value_need_to_add ="[" + json_data_imagebruit + "]";
	if (count>0){
		value_need_to_add = ',' + value_need_to_add;
	}
	var paragraph = document.getElementById("text");
	var text = document.createTextNode(value_need_to_add);
	paragraph.appendChild(text);
	count++;
};

