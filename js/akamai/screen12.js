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

   
    var city = [
        {label: 'London', value: 'London',selected:"selected"},
        {label: "Birmingham", value: "Birmingham"},
        {label: "Leeds", value: "Leeds"},
        {label: "Glasgow", value: "Glasgow"},
        {label: "Sheffield", value: "Sheffield"},
        {label: "Bradford", value: "Bradford"},
        {label: "Liverpool", value: "Liverpool"}

    ];
     $("#select-city").multiselect('dataprovider', city);
     
             var data1=    [
                    {
                        "category": "Wifi",
                        "QoE Scores in London(Summary)": "81.2",
                        "color": "#00E6E6"
                    },
                    {
                        "category": "Cellular",
                        "QoE Scores in London(Summary)": "74.3",
                        "color": "#00FF99"
                    }
             ];
    RenderChart("chart12",data1,"QoE Scores in London(Summary)");  
     var data2=    [
                    {
                        "category": "Public wifi",
                        "QoE Scores in London": "75.7",
                        "color": "#00E6E6"
                    },
                    {
                        "category": "Private Wifi",
                        "QoE Scores in London": "88.4",
                        "color": "#00E6E6"
                    },
                    {
                        "category": "LTE",
                        "QoE Scores in London": "89.2",
                        "color": "#00FF99"
                    },
                    {
                        "category": "3G",
                        "QoE Scores in London": "74.1",
                        "color": "#00FF99"
                    },
                    {
                        "category": "2G",
                        "QoE Scores in London": "53.8",
                        "color": "#00FF99"
                    }
             ];
             
    RenderChart("chart13",data2,"QoE Scores in London");   
     });
function RenderChart(chart,data,displayTitle)
{
     AmCharts.makeChart(chart,
            {
                "type": "serial",
                "categoryField": "category",
                "rotate": true,
                "angle": 25,
                "theme": "black",
                "fontFamily": "Helvetica",
                "depth3D": 20,
                              "startDuration": 1,
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "colorField": "color",
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "lineColorField": "color",
                        "id": "AmGraph-1",
                        "title": displayTitle,
                        "type": "column",
                        "valueField": displayTitle
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": ""
                    }
                ],
                "allLabels": [],
                "balloon": {},
               
                "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": displayTitle
                    }
                ],
                "dataProvider": data
            }
    );
}
