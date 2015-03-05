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

    var city = [
        {label: 'London', value: 'London'},
        {label: "Birmingham", value: "Birmingham"},
        {label: "Leeds", value: "Leeds"},
        {label: "Glasgow", value: "Glasgow"},
        {label: "Sheffield", value: "Sheffield"},
        {label: "Bradford", value: "Bradford"},
        {label: "Liverpool", value: "Liverpool"}

    ];


    $('#select-city').multiselect({
        buttonWidth: '100%',
        nonSelectedText: 'Select Cities'
    });
    
    
    $("#select-city").multiselect('dataprovider', city);


    RenderChart();
});
$(document).ready(function () {
    RenderChart();
});
function RenderChart()
{
    AmCharts.makeChart("chart11",
            {
                "type": "serial",
                "categoryField": "category",
                "angle": 35,
                "depth3D": 25,
                "startDuration": 1,
                "theme": "black",
                "fontFamily": "Helvetica",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": "mobile",
                        "type": "column",
                        "valueField": "mobile"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "title": "wifi",
                        "type": "column",
                        "valueField": "wifi"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "Traffic(MB/hour)",
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
                        "size": 12,
                        "text": "Hour of the Day(Local)"
                    }
                ],
                "dataProvider": [
                    {
                        "category": "00",
                        "mobile": "1",
                        "wifi": "1"
                    },
                    {
                        "category": "01",
                        "mobile": "0.5",
                        "wifi": "12.5"
                    },
                    {
                        "category": "02",
                        "mobile": "4",
                        "wifi": "8"
                    },
                    {
                        "category": "03",
                        "mobile": "2",
                        "wifi": "4"
                    },
                    {
                        "category": "04",
                        "mobile": "0.5",
                        "wifi": "4"
                    },
                    {
                        "category": "05",
                        "mobile": "0.5",
                        "wifi": "0.5"
                    },
                    {
                        "category": "06",
                        "mobile": "1",
                        "wifi": "0.5"
                    },
                    {
                        "category": "07",
                        "mobile": "3",
                        "wifi": "1"
                    },
                    {
                        "category": "08",
                        "mobile": "4",
                        "wifi": "2"
                    },
                    {
                        "category": "09",
                        "mobile": "10",
                        "wifi": "3"
                    },
                    {
                        "category": "10",
                        "mobile": "11",
                        "wifi": "2"
                    },
                    {
                        "category": "11",
                        "mobile": "11",
                        "wifi": "2"
                    },
                    {
                        "category": "12",
                        "mobile": "12",
                        "wifi": "1"
                    },
                    {
                        "category": "13",
                        "mobile": "18",
                        "wifi": "1"
                    },
                    {
                        "category": "14",
                        "mobile": "8",
                        "wifi": "2"
                    },
                    {
                        "category": "15",
                        "mobile": "7",
                        "wifi": "1"
                    },
                    {
                        "category": "16",
                        "mobile": "6",
                        "wifi": "1"
                    },
                    {
                        "category": "17",
                        "mobile": "5",
                        "wifi": "2"
                    },
                    {
                        "category": "18",
                        "mobile": "4",
                        "wifi": "2"
                    },
                    {
                        "category": "19",
                        "mobile": "10",
                        "wifi": "3"
                    },
                    {
                        "category": "20",
                        "mobile": "4.5",
                        "wifi": "4"
                    },
                    {
                        "category": "21",
                        "mobile": "6",
                        "wifi": "4"
                    },
                    {
                        "category": "22",
                        "mobile": "4",
                        "wifi": "6"
                    },
                    {
                        "category": "23",
                        "mobile": "10",
                        "wifi": "3"
                    }
                ]
            }
    );
}