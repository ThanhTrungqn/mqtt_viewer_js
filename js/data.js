var mqtt_connect = {

}

var data_building = 
[{
	"building_id" : "thomasWatt",
	"building_label": "ThomasWatt",
	"building_list_room" : ["regusrennes", "lexiroom"]
}];

var data_room = 
[	
	{
		"room_id":"regusrennes",
		"room_label":"Bureau de Rennes chez Regus",
		"room_background":"rennes.png",
		"room_posx":0,
		"room_posy":0,
		"room_width":57,
		"room_height":40,
		"building_id":"thomasWatt",
		"mqtt_connect":
			{
				"port":9001,
				"host":"192.168.12.191",
				"topic":"geoplc/rennes/#",
			},
		"zone_interet": [],
		"data": []
	},
	{
		"room_id":"lexiroom",
		"room_label":"Lexiroom à Paris",
		"room_background":"lexiroom.png",
		"room_posx":0,
		"room_posy":0,
		"room_width":58,
		"room_height":63,
		"building_id":"thomasWatt",
		"mqtt_connect":
			{
				"port":9001,
				"host":"192.168.12.191",
				"topic":"geoplc/paris1/#",
			},
		"zone_interet": [],
		"data": []
	}
]

var heat_map = 
[	
	{
		"room_id":"regusrennes",
		"heatmap":[]
	},
	{
		"room_id":"lexiroom",
		"heatmap":[]
	}
]

var zone_interet =
[
	{ 	"id": 1,
		"room_id":"regusrennes",
		"X" : 2,
		"Y" : 5,
		"W" : 12,
		"H" : 13,
		"type" : "bureau",
		"name" : "Bureau de Thanh",
		"data_active":[]
	},
	{ 	"id": 2,
		"room_id":"regusrennes",
		"X" : 2,
		"Y" : 21,
		"W" : 12,
		"H" : 13,
	 	"type" : "bureau",
	 	"name" : "Bureau de Mehdi",
	 	"data_active":[]
	},
  	{ 	"id": 3,
  		"room_id":"regusrennes",
  		"X" : 17,
  		"Y" : 13,
  		"W" : 14,
  		"H" : 13,
  		"type" : "bureau",
  		"name" : "Bureau de Teddy",
  		"data_active":[]
  	},
  	{	
  		"id": 4,
  		"room_id":"regusrennes",
  		"X" : 45,
  		"Y" : 5,
  		"W" : 12,
  		"H" : 20,
  		"type" : "bureau" ,
  		"name" : "Bureau de Julie",
  		"data_active":[]
  	}
]