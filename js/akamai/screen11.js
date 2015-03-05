/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var WifiTraffic = [{"category": "Media Playback", "column-1": "10"},
    {"category": "CNN App for Android Phones", "column-1": "7"},
    {"category": "Download Manager for Android", "column-1": "5"},
    {"category": "Yahoo! Mail", "column-1": "3"},
    {"category": "The Weather Channel", "column-1": "2"},
    {"category": "Standard Android Browser", "column-1": "1"},
    {"category": "Google Services Framework", "column-1": "4"},
    {"category": "Google Play Store", "column-1": "5"},
    {"category": "Facebook", "column-1": "2"},
    {"category": "Android Market", "column-1": "1"},
    {"category": "Maps", "column-1": "2"},
    {"category": "BBC News", "column-1": "1"},
    {"category": "Google Now", "column-1": "1"},
    {"category": "Pandora Internet radio", "column-1": "2"},
    {"category": "The Economist", "column-1": "1"},
    {"category": "Fox Sports", "column-1": "1"},
    {"category": "Ski Tracks", "column-1": "2"},
    {"category": "RunKeeper-GPS Tracke Run Walk", "column-1": "1"},
    {"category": "Google+", "column-1": "2"},
    {"category": "The New Scientist", "column-1": "1"},
    {"category": "All Others", "column-1": "1"}];
var MobileTraffic = [{"category": "Download Manager for Android", "column-1": "10"},
    {"category": "CNN App for Android Phones", "column-1": "7"},
    {"category": "Media Playback", "column-1": "10"},
    {"category": "Samsung Hub Updater", "column-1": "5"},
    {"category": "Android Market", "column-1": "3"},
    {"category": "Standard Android Browser", "column-1": "2"},
    {"category": "Samsung Account", "column-1": "1"},
    {"category": "Maps", "column-1": "4"},
    {"category": "The Weather Channel", "column-1": "1"},
    {"category": "Pandora Internet radio", "column-1": "1"},
    {"category": "Yahoo Mail", "column-1": "2"},
    {"category": "BBC News", "column-1": "1"},
    {"category": "Google Now", "column-1": "1"},
    {"category": "Google Play Store", "column-1": "2"},
    {"category": "Google Services Framework", "column-1": "1"},
    {"category": "Samsung Hub", "column-1": "2"},
    {"category": "S Suggest", "column-1": "1"},
    {"category": "Redbox Instant ", "column-1": "2"},
    {"category": "Facebook", "column-1": "1"},
    {"category": "Ski Tracks", "column-1": "1"},
    {"category": "All Others", "column-1": "6"}];

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
        buttonText: function (options, select) {
            return 'City';
        }

    });
    $("#select-city").multiselect('dataprovider', city);
    
    renderPie(WifiTraffic, "chart6");
    renderPie(MobileTraffic, "chart7");

});


function renderPie(pieData, chart)
{
    AmCharts.makeChart(chart,
            {
                "type": "pie",
                "angle": "25",
                "balloonText": "[[title]]<br><span style='font-size:4px'><b>[[value]]</b> ([[percents]]%)</span>",
                "depth3D": 8,
                "outlineThickness": 0,
                "titleField": "category",
                "valueField": "column-1",
                "theme": "black",
                "fontFamily": "Helvetica",
                "allLabels": [],
                "balloon": {},
                "legend": {
                    "align": "center",
                    "markerType": "square"
                },
                "titles": [],
                "dataProvider": pieData
            }
    );
}