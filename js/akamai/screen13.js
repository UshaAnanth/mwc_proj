/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    
     $( "#datepicker1" ).datepicker({
      showOn: "button",
      buttonImage: "images/ic_event_white_24dp.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    $( "#datepicker2" ).datepicker({
      showOn: "button",
      buttonImage: "images/ic_event_white_24dp.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    $( "#datepicker3" ).datepicker({
      showOn: "button",
      buttonImage: "images/ic_event_white_24dp.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    
    $("#menu-box").hide();
    $("#menu-icon").click(function () {
        $("#menu-box").toggle(500, "linear");
    });
    
    $("#slider").slider({
            range: "min",
            value: 8,
            min: 0,
            max: 23,
            slide: function (event, ui) {
                $("#amount").html(ui.value + " hrs &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;  Hours");
            }
        });
    $("#amount").html($("#slider").slider("value") + " hrs &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Hours");
    
});



AmCharts.makeChart("chart8",
        {
            "type": "serial",
            "categoryField": "category",
            "angle": 50,
            "depth3D": 20,
            "colors": [
                "#CCFF99",
                "#99CCFF",
                "#FFD175",
                "#00FF99",
                "#DA6AFF",
                "#913167",
                "#b93e3d",
                "#448e4d",
                "#333300",
                "#0066FF",
                "#2f4074",
                "#448e4d",
                "#b7b83f",
                "#b9783f"
            ],
            "startDuration": 1,
            "handDrawThickness": 4,
            "theme": "black",
            "fontFamily": "Helvetica",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 45
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-1",
                    "title": "public Wifi",
                    "type": "column",
                    "valueField": "public Wifi"
                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-2",
                    "title": "private Wifi",
                    "type": "column",
                    "valueField": "private Wifi"

                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "fillAlphas": 1,
                    "id": "AmGraph-3",
                    "title": "mobile",
                    "type": "column",
                    "valueField": "mobile",
                    "valueAxis": "ValueAxis-2"
                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "bullet": "round",
                    "id": "AmGraph-4",
                    "title": "Mobile-QoE",
                    "valueField": "Mobile-QoE"               
                },
                {
                    "balloonText": "[[title]] of [[category]]:[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-5",
                    "title": "Wifi-QoE",
                    "valueField": "Wifi-QoE"
                   
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "unit":" %"
                },
                {
                    "id": "ValueAxis-2",
                    "unit":" ",
                    "position":"right",
                    "maximum":100
                           
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 20,
                    "text": "Top 10 Market Summary"
                }
            ],
            "dataProvider": [
                {
                    "category": "London",
                    "public Wifi": "37",
                    "private Wifi": "42",
                    "mobile": "21",
                    "Mobile-QoE": "80",
                    "Wifi-QoE": "80"
                },
                {
                    "category": "Birmingham",
                    "public Wifi": "40",
                    "private Wifi": "40",
                    "mobile": "20",
                    "Mobile-QoE": "90"

                },
                {
                    "category": "Leeds",
                    "public Wifi": "28",
                    "private Wifi": "61",
                    "mobile": "11",
                    "Mobile-QoE": "75",
                    "Wifi-QoE": "75"
                },
                {
                    "category": "Glasgow",
                    "public Wifi": "36",
                    "private Wifi": "55",
                    "mobile": "9",
                    "Mobile-QoE": "90",
                    "Wifi-QoE": "90"
                },
                {
                    "category": "Sheffield",
                    "public Wifi": "46",
                    "private Wifi": "36",
                    "mobile": "18",
                    "Mobile-QoE": "90",
                    "Wifi-QoE": "80"

                },
                {
                    "category": "Bradford",
                    "public Wifi": "29",
                    "private Wifi": "23",
                    "mobile": "48",
                    "Mobile-QoE": "70",
                },
                {
                    "category": "Liverpool",
                    "public Wifi": "32",
                    "private Wifi": "32",
                    "mobile": "36",
                    "Mobile-QoE": "65",
                    "Wifi-QoE": "95"
                },
                {
                    "category": "Edinburgh",
                    "public Wifi": "49",
                    "private Wifi": "46",
                    "mobile": "5",
                    "Mobile-QoE": "65",
                    "Wifi-QoE": "75"
                },
                {
                    "category": "Manchester",
                    "public Wifi": "38",
                    "private Wifi": "35",
                    "mobile": "27",
                    "Mobile-QoE": "85",
                    "Wifi-QoE": "80"
                },
                {
                    "category": "Bristol",
                    "public Wifi": "19",
                    "private Wifi": "43",
                    "mobile": "38",
                    "Mobile-QoE": "75",
                    "Wifi-QoE": "80"
                },
                {
                    "category": "Kirklees",
                    "public Wifi": "16",
                    "private Wifi": "32",
                    "mobile": "52",
                    "Mobile-QoE": "90",
                    "Wifi-QoE": "85"
                }
            ]
        }
);
