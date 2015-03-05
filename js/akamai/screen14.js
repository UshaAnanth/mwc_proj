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
    

    var market = [
        {label: 'London', value: 'London',selected:"selected"},
        {label: "Birmingham", value: "Birmingham"},
        {label: "Leeds", value: "Leeds"},
        {label: "Glasgow", value: "Glasgow"},
        {label: "Sheffield", value: "Sheffield"},
        {label: "Bradford", value: "Bradford"},
        {label: "Liverpool", value: "Liverpool"}

    ];

    $("#market").multiselect('dataprovider', market);

    var data1 = [
        {
            "category": "LTE",
            "column-1": "39"
        },
        {
            "category": "Wifi",
            "column-1": "55"
        },
        {
            "category": "2G/3G",
            "column-1": "6"
        }
    ];
    var data2 = [
        {
            "category": "Private Wifi",
            "column-1": "22"
        },
        {
            "category": "Public Wifi",
            "column-1": "78"
        }
    ];
    RenderDoughnut("chart9", data1);
    RenderDoughnut("chart10", data2);
});

function RenderDoughnut(chart, data)
{
    AmCharts.makeChart(chart,
            {
                "type": "pie",
                "angle": 25,
                "theme":"black",
                "fontFamily": "Helvetica",
                "balloonText": "[[title]]<br><span style='font-size:5px'><b>[[value]]</b> ([[percents]]%)</span>",
                "depth3D": 12,
                "innerRadius": "50%",
                "colors": [
                    "#66FF33",
                    "#FF66FF",
                    "#5983FF",
                    "#FF9E01",
                    "#FCD202",
                    "#F8FF01",
                    "#B0DE09",
                    "#04D215",
                    "#0D8ECF",
                    "#0D52D1",
                    "#2A0CD0",
                    "#8A0CCF",
                    "#CD0D74",
                    "#754DEB",
                    "#DDDDDD",
                    "#999999",
                    "#333333",
                    "#000000",
                    "#57032A",
                    "#CA9726",
                    "#990000",
                    "#4B0C25"
                ],
                "titleField": "category",
                "valueField": "column-1",
                //"allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": data
            }
    );

}