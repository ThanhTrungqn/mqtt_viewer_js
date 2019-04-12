$(function() {
  /* ChartJS
   * -------
   * Data and config for chartjs
   */
  'use strict';
  var data = {
    labels:["Lundi 8/4", "Mardi 9/4", "Mercredi 10/4", "Jeudi 11/4", "Vendredi 12/4", "Samedi 13/4", "Dimanche 14/4"],
    datasets: [{
        label: 'Bureau de Thanh',
        data: [40, 45, 48, 35, 40, 0 , 0],
        borderColor: [
          '#587ce4'
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Bureau de Mehdi',
        data: [43, 30, 2, 30 , 12 , 0 , 0],
        borderColor: [
          '#ede190'
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Bureau de Teddy',
        data: [3, 20, 2, 5 , 10 , 0 , 0],
        borderColor: [
          '#ff0000'
        ],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Bureau de Julie',
        data: [3, 25, 5, 8 , 25 , 0 , 0],
        borderColor: [
          '#00ff00'
        ],
        borderWidth: 2,
        fill: false
      }
    ]
  };
  var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: false,
          labelString: 'Percent(%)'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: false,
          labelString: 'Day in month'
        }
      }]
    },
    legend: {
      display: true
    },
    elements: {
      point: {
        radius: 0
      }
    }

  };

  var data2 = {
    labels:["1","2","3","4","5","6","7","8","9","10",
            "11","12","13","14","15","16","17","18","19","20",
            "21","22","23","24","25","26","27","28","29","30","31"],
    datasets: [{
        label: 'Bureau ThomasWatt chez Regus',
        data: [45 , 0 , 0 ,50, 55, 45, 60, 50, 0 , 0, 35, 45, 45, 50, 55, 0 , 0 , 40, 35, 55, 57, 60, 0 , 0 , 55, 45, 50, 50, 45, 0 , 0],
        backgroundColor: "#3e95cd",
        borderWidth: 2,
        fill: false
      },
    ]
  };

  if ($("#lineChart1").length) {
    var lineChartCanvas = $("#lineChart1").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'line',
      data: data,
      options: options
    });
  }

  if ($("#lineChart2").length) {
    var lineChartCanvas = $("#lineChart2").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'bar',
      data: data2,
      options: options
    });
  }

  
  if ($("#pie-chart1").length) {
    var lineChartCanvas = $("#pie-chart1").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'pie',
      data: {
        labels: ["Agreable" ,"Très Bas", "Très Haut"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#00bb00","#ff8533","#ff0000"],
          data: [75,15,10]
        }]
      },
      options: {
        title: {
          display: true,
          text: "You live in Agreable temperature 75%"
        }
      }
    });
  }
  if ($("#pie-chart2").length) {
    var lineChartCanvas = $("#pie-chart2").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'pie',
      data: {
        labels: ["Agreable" ,"Très Bas", "Très Haut"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#00bb00","#ff8533","#ff0000"],
          data: [90,8,2]
        }]
      },
      options: {
        title: {
          display: true,
          text: "You live in Agreable luminosity 90%"
        }
      }
    });
  }
  if ($("#pie-chart3").length) {
    var lineChartCanvas = $("#pie-chart3").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas, {
      type: 'pie',
      data: {
        labels: ["Agreable" ,"Très Bas", "Très Haut"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#00bb00","#ff8533","#ff0000"],
          data: [57,23,20]
        }]
      },
      options: {
        title: {
          display: true,
          text: "You live in Agreable noise 57%"
        }
      }
    });
  }
});