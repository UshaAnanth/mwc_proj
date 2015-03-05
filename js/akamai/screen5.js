/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {

    $("#datepicker1").datepicker({
        showOn: "button",
        buttonImage: "images/ic_event_white_24dp.png",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
    $("#datepicker2").datepicker({
        showOn: "button",
        buttonImage: "images/ic_event_white_24dp.png",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
    var data1 = [];
    data1 = QoEIndexChange();

    RenderChart("wrapper1", data1, "Media QoE Scores in UK");

});

function QoEIndexChange()
{

    var QoEIndex = document.getElementsByName("akamaiQoeIndex");
    var data = [];



    data = [
        {
            "category": "",
            "Media QoE Scores in UK": "87.2",
            "color": "#00E6E6"
        },
        {
            "category": "UK_Operator_2",
            "Media QoE Scores in UK": "76.9",
            "color": "#FFB56C"
        },
        {
            "category": "UK_Operator_3",
            "Media QoE Scores in UK": "73.2",
            "color": "#FFFF99"
        },
        {
            "category": "UK_Operator_4",
            "Media QoE Scores in UK": "64.7",
            "color": "#6CFF6C"
        }
    ];

    return data;

}
function RenderChart(chart, data, displayTitle)
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
                "allLabels": [
                    {
                        "text": "UK_Operator_1",
                        "bold": true,
                        "x": 10,
                        "y": 95,
                        "color": "#FF6600"
                    }
                ],
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
