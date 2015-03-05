"use strict";
var screen1 = (function () {

    var model = {
        //The password to un-anonymize data
        //-------------------------------
        //
        password: 'showmedata',
        //
        //---------------------------------


        globalPerformanceAtGlanceData: [],
        globalPerformanceAtGlanceMediaData: [],
        globalPerformanceAtGlanceWebData: [],
        globalPerformanceAtGlanceOverallData: [],
        globalPerformanceAtGlanceType: 'overall',
        operatorLevelType: 'overall',
        countryLevelType: 'overall',
        selectedCountriesOperatorLevel: [],
        selectedOperatorOperatorLevel: [],
        selectedCountries: [],
        maxZoomLevel: 6,
        minZoomLevel: 2,
        markersArray: [],
        heatMapObject: null,
        mapObject: {},
        infoWindow: [],
        isAnonymous: true,
        days: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };
    function setOperatorLevelType(type) {
        model.operatorLevelType = type;
        drawOperatorLevelChartFromModel();
    }

    function setCountryLevelType(type) {
        model.countryLevelType = type;
        drawChartFromModel();
        placeMarkerFromModel();
    }

    function setGlobalPerformanceGlanceData(data) {
        model.globalPerformanceAtGlanceData = data;
        //$('#loading-box').hide();
        categorizeGlobalPerformanceAtGlanceData();
        refreshGlobalPerformanceGlanceTable('media');
        refreshGlobalPerformanceGlanceTable('web');
        refreshGlobalPerformanceGlanceTable('overall');
        populateCountriesFromModel();
        placeMarkerFromModel();
    }

    function setGlobalPerformanceAtGlanceType(type) {
        model.globalPerformanceAtGlanceType = type;
        placeMarkerFromModel();
    }

    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }

    /*
     * <div id="overall" class="tab-pane fade in active">							            
     <table class="table side-bar-table">
     <tr>
     <td>United Kingdom</td>
     <td>96.5%</td>
     <td><div class="up-arraw"></div>1</td>
     </tr>
     */

    function refreshGlobalPerformanceGlanceTable(table) {

        var rowHTML = '';
        var rank = 1;
        var arrowHTML = '';
        var data;
        if (table === 'overall') {
            data = model.globalPerformanceAtGlanceOverallData;
        } else if (table === 'web') {
            data = model.globalPerformanceAtGlanceWebData;
        } else if (table === 'media') {
            data = model.globalPerformanceAtGlanceMediaData;
        }

        data.forEach(function (data) {
            if (Math.random() > 0.5) {
                arrowHTML = '<div class="up-arraw"></div>';
            } else {
                arrowHTML = '<div class="down-arraw"></div>';
            }
            rowHTML += '<tr><td>' + data.country + '</td><td>' + data.score + '</td><td>' + arrowHTML + '' + (rank++) + '</td></tr>';
            //rowHTML += '<tr><td></td><td></td><td><div class="up-arraw"></div>1</td></tr>';
        });
        if (table === 'overall') {
            $('#overall').empty();
            $('#overall').append('<table class="table side-bar-table">' + rowHTML + '</table>');
        } else if (table === 'web') {
            $('#web').empty();
            $('#web').append('<table class="table side-bar-table">' + rowHTML + '</table>');
        } else if (table === 'media') {
            $('#media').empty();
            $('#media').append('<table class="table side-bar-table">' + rowHTML + '</table>');
        }

    }

    function categorizeGlobalPerformanceAtGlanceData() {
        model.globalPerformanceAtGlanceMediaData = [];
        model.globalPerformanceAtGlanceOverallData = [];
        model.globalPerformanceAtGlanceWebData = [];
        model.globalPerformanceAtGlanceData.forEach(function (data) {
            var media = {
                'country': data.geoCountry,
                'score': data.mediaPerformance
            };
            var overall = {
                'country': data.geoCountry,
                'score': data.overallPerformance
            };
            var web = {
                'country': data.geoCountry,
                'score': data.webPerformance
            };
            model.globalPerformanceAtGlanceMediaData.push(media);
            model.globalPerformanceAtGlanceWebData.push(web);
            model.globalPerformanceAtGlanceOverallData.push(overall);
        });
        model.globalPerformanceAtGlanceMediaData.sort(compare);
        model.globalPerformanceAtGlanceWebData.sort(compare);
        model.globalPerformanceAtGlanceOverallData.sort(compare);
        //console.log(model.globalPerformanceAtGlanceMediaData);
    }


    function getGlobalPerformanceAtGlanceData() {
        /* $.ajax({
         url: "js/getGlobalPerformanceAtGlance.json",
         accepts: 'json',
         success: function (data, textStatus, jqXHR) {
         setGlobalPerformanceGlanceData(data);
         //console.log(data);
         }
         });
         */
        //$('#loading-box').show();

        CSVToJsonParser.getScreen2Data(function (data) {
            setGlobalPerformanceGlanceData(data);
        });
    }

    $(document).ready(function () {
        init_map();
        getGlobalPerformanceAtGlanceData();
        $("#graph-content").hide();
        $("#menu-box").hide();
        $("#generate-graph").click(function () {
            $("#graph-content").toggle(500, "linear", function () {
                if ($("#graph-content").is(':visible')) {
                    $("#generate-graph").html('Exit Graph');
                } else {
                    $("#generate-graph").html('Generate Graph');
                }
            });
        });
        $("#generate-graph4").click(function () {
            $("#graph-content").toggle(500, "linear", function () {
                if ($("#graph-content").is(':visible')) {
                    $("#generate-graph4").html('Exit Graph');
                } else {
                    $("#generate-graph4").html('Generate Graph');
                }
            });
        });
        $("#menu-icon").click(function () {
            $("#menu-box").toggle(500, "linear");
        });
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            $("#graph-content").hide(500, "linear");
        });
        $('#select-country').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedCountry,
            nonSelectedText: 'Select Countries'
        });
        $('#select-country-operatorlevel').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedCountry_OperatorLevel,
            nonSelectedText: 'Select Countries'
        });
        $('#select-operator-operatorlevel').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedOperator_OperatorLevel,
            nonSelectedText: 'Select Operators'
        });

        $('.map-icon').on('click', function () {
            clearFieldsAndGraph();
        });

        $('.operator-icon').on('click', function () {
            clearFieldsAndGraph();
        });

        $("#password-box").keypress(function (e) {
            if (e.keyCode === 13)
                validatePassword();
        });

    });
    function updateSelectedCountry_OperatorLevel(element, checked) {
        model.selectedCountriesOperatorLevel = [];
        var countries = $('#select-country-operatorlevel option:selected');
        var selected = [];
        $(countries).each(function (index, country) {
            selected.push($(this).val());
        });
        model.selectedCountriesOperatorLevel = selected;
        //console.log(model.selectedCountriesOperatorLevel);
        populateOperatorsOperatorLevelFromModel();
        updateSelectedOperator_OperatorLevel();
        //drawChartFromModel();
    }


    function drawOperatorLevelChartFromModel() {
        $('#chartContainer').empty();
        $('#chartContainer').append('<div id="legend_container"> <div id="legend"></div></div><div id="chart" style="width:100%;height:100%"></div>');
        var palette = new Rickshaw.Color.Palette();
        if (model.selectedOperatorOperatorLevel.length === 0) {

            var graph = new Rickshaw.Graph({
                element: document.querySelector("#chart"),
                renderer: 'line',
                series: [
                    {name: '', color: palette.color()}
                ]

            });
            graph.render();

            var time = new Rickshaw.Fixtures.Time();
            var seconds = time.unit('dateMonth');
            var x_axis = new Rickshaw.Graph.Axis.Time({
                graph: graph,
                timeUnit: seconds
            });

            x_axis.render();
            var yAxis = new Rickshaw.Graph.Axis.Y({
                graph: graph
            });
            yAxis.render();
            var hoverDetail = new Rickshaw.Graph.HoverDetail({
                graph: graph
            });
            var legend = new Rickshaw.Graph.Legend({
                graph: graph,
                element: document.getElementById('legend')
            });
            return;
        }


        var arrayOfGraphs = [];
        $.each(model.globalPerformanceAtGlanceData, function (i) {
            var currentCountry = model.globalPerformanceAtGlanceData[i].geoCountry;
            $.each(model.globalPerformanceAtGlanceData[i].operators, function (j) {
                var currentOperatorId = model.globalPerformanceAtGlanceData[i].operators[j].operatorId;
                if (model.selectedOperatorOperatorLevel.indexOf(currentOperatorId) !== -1) {
                    var opName;
                    if (model.isAnonymous === true) {
                        opName = model.globalPerformanceAtGlanceData[i].operators[j].operatorName;
                    } else {
                        opName = model.globalPerformanceAtGlanceData[i].operators[j].operatorNameUnAnonymized;
                    }

                    var series = {
                        name: opName,
                        color: palette.color(),
                        data: []
                    };
                    if (model.operatorLevelType === 'web') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].webPerformance;
                    } else if (model.operatorLevelType === 'overall') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].overallPerformance;
                    } else if (model.operatorLevelType === 'media') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].mediaPerformance;
                    }
                    arrayOfGraphs.push(series);
                }


            });
        });
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            renderer: 'line',
            width: 700,
            height: 250,
            series: arrayOfGraphs
        });
        graph.render();
        /*
         var x_axis = new Rickshaw.Graph.Axis.X({
         graph: graph,
         tickFormat: function (x) {
         var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
         d.setUTCSeconds(x);
         return d.getDate() + " " + model.days[d.getMonth()];
         }
         });
         */
        var time = new Rickshaw.Fixtures.Time();
        var seconds = time.unit('dateMonth');
        var x_axis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            timeUnit: seconds
        });

        x_axis.render();
        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph
        });
        yAxis.render();
        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph
        });
        var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')
        });
//        //Added by Usha to toggle the graph contents
//        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
//            graph: graph,
//            legend: legend
//        });
        var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
            graph: graph,
            legend: legend
        });

        $(".rickshaw_graph .x_ticks_d3 text").attr("fill", "white");
        $(".rickshaw_graph .y_ticks text").attr("fill", "white");
    }


    function updateSelectedOperator_OperatorLevel(element, checked) {
        model.selectedOperatorOperatorLevel = [];
        var countries = $('#select-operator-operatorlevel option:selected');
        var selected = [];
        $(countries).each(function (index, country) {
            selected.push(parseInt($(this).val()));
        });
        model.selectedOperatorOperatorLevel = selected;
        drawOperatorLevelChartFromModel();
    }


    function populateOperatorsOperatorLevelFromModel() {
        var data = [];
        $.each(model.globalPerformanceAtGlanceData, function (i) {
            if (model.selectedCountriesOperatorLevel.indexOf(model.globalPerformanceAtGlanceData[i].geoCountry) !== -1) {
                $.each(model.globalPerformanceAtGlanceData[i].operators, function (j) {
                    var temp = {};
                    if (model.isAnonymous === true) {
                        temp['label'] = model.globalPerformanceAtGlanceData[i].operators[j].operatorName;
                    } else {
                        temp['label'] = model.globalPerformanceAtGlanceData[i].operators[j].operatorNameUnAnonymized;
                    }



                    temp['value'] = model.globalPerformanceAtGlanceData[i].operators[j].operatorId;
                    if (model.selectedOperatorOperatorLevel.indexOf(model.globalPerformanceAtGlanceData[i].operators[j].operatorId) !== -1) {
                        temp['selected'] = true;
                    } else {
                        temp['selected'] = false;
                    }
                    data.push(temp);
                });
            }

        });
        //console.log(data);

        $("#select-operator-operatorlevel").multiselect('dataprovider', data);
        //console.log(model.selectedOperators);

        //drawChartFromModel();
    }

    function updateSelectedCountry(element, checked) {
        model.selectedCountries = [];
        var countries = $('#select-country option:selected');
        var selected = [];
        $(countries).each(function (index, country) {
            selected.push($(this).val());
        });
        model.selectedCountries = selected;
        drawChartFromModel();
        //console.log(selected);
    }

    function drawChartFromModel() {

        $('#chartContainer').empty();
        $('#chartContainer').append('<div id="legend_container"> <div id="legend"></div></div><div id="chart" style="width:100%;height:100%"></div>');
        var palette = new Rickshaw.Color.Palette();
        if (model.selectedCountries.length === 0) {

            var graph = new Rickshaw.Graph({
                element: document.querySelector("#chart"),
                renderer: 'line',
                series: [
                    {name: '', color: palette.color()}
                ]

            });
            graph.render();

            /*var x_axis = new Rickshaw.Graph.Axis.X({
             graph: graph,
             tickFormat: function (x) {
             var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
             d.setUTCSeconds(x);
             return d.getDate() + " " + model.days[d.getMonth()];
             }
             });*/

            var time = new Rickshaw.Fixtures.Time();
            var seconds = time.unit('dateMonth');
            var x_axis = new Rickshaw.Graph.Axis.Time({
                graph: graph,
                timeUnit: seconds
            });

            x_axis.render();

            var yAxis = new Rickshaw.Graph.Axis.Y({
                graph: graph
            });
            yAxis.render();
            var hoverDetail = new Rickshaw.Graph.HoverDetail({
                graph: graph
            });
            var legend = new Rickshaw.Graph.Legend({
                graph: graph,
                element: document.getElementById('legend')
            });
            return;
        }


        var arrayOfGraphs = [];
        $.each(model.globalPerformanceAtGlanceData, function (i) {
            var currentCountry = model.globalPerformanceAtGlanceData[i].geoCountry;
            if (model.selectedCountries.indexOf(currentCountry) !== -1) {

                $.each(model.globalPerformanceAtGlanceData[i].operators, function (j) {
                    var opName;
                    if (model.isAnonymous === true) {
                        opName = model.globalPerformanceAtGlanceData[i].operators[j].operatorName;
                    } else {
                        opName = model.globalPerformanceAtGlanceData[i].operators[j].operatorNameUnAnonymized;
                    }

                    var series = {
                        name: opName,
                        color: palette.color(),
                        data: []
                    };
                    if (model.countryLevelType === 'web') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].webPerformance;
                    } else if (model.countryLevelType === 'overall') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].overallPerformance;
                    } else if (model.countryLevelType === 'media') {
                        series.data = model.globalPerformanceAtGlanceData[i].operators[j].mediaPerformance;
                    }


                    arrayOfGraphs.push(series);
                });
            }
        });
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            renderer: 'line',
            width: 700,
            height: 250,
            series: arrayOfGraphs
        });
        graph.render();
        /*var x_axis = new Rickshaw.Graph.Axis.X({
         graph: graph,
         tickFormat: function (x) {
         var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
         d.setUTCSeconds(x);
         return d.getDate() + " " + model.days[d.getMonth()];
         }
         });*/



        var time = new Rickshaw.Fixtures.Time();
        var seconds = time.unit('dateMonth');
        var x_axis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            timeUnit: seconds
        });

        x_axis.render();

        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph
        });
        yAxis.render();

        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph
        });
        var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')
        });
//        //Added by Usha to toggle the graph contents
//        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
//            graph: graph,
//            legend: legend
//        });
        var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
            graph: graph,
            legend: legend
        });

        makeGraphAxesWhite();

        $('body').mousemove(makeGraphAxesWhite);

        $('.action').remove();

        $('.swatch').remove();
    }

    function getDateFromEpoch(epoch) {
        var dateVal = "/Date(" + (epoch * 1000) + ")/";
        var date = new Date(parseFloat(dateVal.substr(6)));
        return model.days[date.getMonth()] + " " + date.getDate();
    }

    function makeGraphAxesWhite() {
        $(".rickshaw_graph .x_ticks_d3 text").attr("fill", "white");
        $(".rickshaw_graph .y_ticks text").attr("fill", "white");
    }

    function populateCountriesFromModel() {
        var data = [];
        $.each(model.globalPerformanceAtGlanceData, function (i) {
            var temp = {};
            temp['label'] = model.globalPerformanceAtGlanceData[i].geoCountry;
            temp['value'] = model.globalPerformanceAtGlanceData[i].geoCountry;
            data.push(temp);
        });
        $("#select-country").multiselect('dataprovider', data);
        $("#select-country-operatorlevel").multiselect('dataprovider', data);
    }

    function init_map() {
        var myOptions = {
            zoom: model.minZoomLevel,
            center: new google.maps.LatLng(30, -40),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        model.map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
        google.maps.event.addListener(model.map, 'zoom_changed', function () {

            if (model.map.getZoom() !== model.maxZoomLevel + 5) {
                if (model.heatMapObject !== null) {
                    model.heatMapObject.setMap(null);
                }
            }

        });
    }

    function drawHeatMap() {
        var baseLat = 51.507351;
        var baseLong = -0.127758;
        var iterations = 4000;
        var pointArray = [];
        for (var i = 0; i < iterations; i++) {
            var randX = Math.random() / 3;
            var randY = Math.random() / 3;
            var directionX = Math.random() > 0.5 ? (-1) : (1);
            var directionY = Math.random() > 0.5 ? (-1) : (1);
            pointArray.push(new google.maps.LatLng(baseLat + randX * directionX, baseLong + randY * directionY));
        }

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });
        if (model.heatMapObject !== null) {
            model.heatMapObject.setMap(null);
            model.heatMapObject = null;
        } else {
            model.heatMapObject = heatmap;
            model.heatMapObject.setMap(model.map);
        }


    }


    function clearOverlays() {
        for (var i = 0; i < model.markersArray.length; i++) {
            model.markersArray[i].setMap(null);
        }
        model.markersArray.length = 0;
    }

    function sortTable(a, b) {
        if (model.globalPerformanceAtGlanceType === 'overall') {
            if (a.overallPerformance < b.overallPerformance) {
                return 1;
            } else if (a.overallPerformance > b.overallPerformance) {
                return -1;
            } else {
                return 0;
            }
        } else if (model.globalPerformanceAtGlanceType === 'media') {
            if (a.mediaPerformance < b.mediaPerformance) {
                return 1;
            } else if (a.mediaPerformance > b.mediaPerformance) {
                return -1;
            } else {
                return 0;
            }
        } else if (model.globalPerformanceAtGlanceType === 'web') {
            if (a.webPerformance < b.webPerformance) {
                return 1;
            } else if (a.webPerformance > b.webPerformance) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    function placeMarkerFromModel() {

        clearOverlays();
        var count = 1;
        model.globalPerformanceAtGlanceData.sort(sortTable);
        model.globalPerformanceAtGlanceData.forEach(function (d) {
            var iconLink = '';
//            if (model.globalPerformanceAtGlanceType === 'overall') {
//                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + Math.round(d.overallPerformance * 100) / 100;
//            } else if (model.globalPerformanceAtGlanceType === 'media') {
//                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + Math.round(d.mediaPerformance * 100) / 100;
//            } else if (model.globalPerformanceAtGlanceType === 'web') {
//                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + Math.round(d.webPerformance * 100) / 100;
//            }

            if (model.globalPerformanceAtGlanceType === 'overall') {
                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + (count++);
            } else if (model.globalPerformanceAtGlanceType === 'media') {
                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + (count++);
            } else if (model.globalPerformanceAtGlanceType === 'web') {
                iconLink = 'http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|4a90e2|12|_|' + (count++);
            }

            var marker = new google.maps.Marker({
                map: model.map,
                icon: iconLink,
                position: new google.maps.LatLng(d.latlong.latitude, d.latlong.longitude),
                animation: google.maps.Animation.DROP,
                country: d.geoCountry
            });
            model.markersArray.push(marker);
            google.maps.event.addListener(marker, 'click', function () {

                if ((marker.country === 'UK') && (model.map.getZoom() === model.maxZoomLevel)) {
                    model.map.setCenter(marker.getPosition());
                    model.map.setZoom(model.maxZoomLevel + 5);
                    drawHeatMap();
                } else {
                    if (model.heatMapObject !== null) {
                        model.heatMapObject.setMap(null);
                        model.heatMapObject = null;
                    }
                    model.map.setCenter(new google.maps.LatLng(d.latlong.latitude + 5, d.latlong.longitude + 1));
                    model.map.setZoom(model.maxZoomLevel);
                }
            });
            google.maps.event.addListener(marker, 'mouseover', function () {
                var popupContent = "";
                var scores = getCountryScores(marker.country);
                var averageOperatorScores = getAverageOperatorScores(marker.country);
                popupContent = '<div style="color:#3B73B5;padding:5px;line-height:1.5em;" class="popup-hover"><div style="text-align:center;width:100%;"><strong>' + marker.country + '</strong></div><hr /><div style="text-align:center;width:100%;">Media Performance: <strong>' + scores.mediaPerformance + '</strong></div><div style="text-align:center;width:100%;">Web Performance: <strong>' + scores.webPerformance + '</strong></div><div style="text-align:center;width:100%;">Overall Performance: <strong>' + scores.overallPerformance + '</strong> </div><hr />';
                for (var key in averageOperatorScores) {
                    if (averageOperatorScores.hasOwnProperty(key)) {
                        popupContent = popupContent + '<div style="text-align:center;width:100%;color:#3B73B5;">' + key + ": <strong>" + averageOperatorScores[key].toFixed(3) + "</strong></div>";
                    }
                }

                popupContent = popupContent + '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: popupContent,
                    disableAutoPan: true
                });

                model.infoWindow.push(infowindow);

                setTimeout(function () {
                    model.infoWindow.forEach(function (x) {
                        x.close();
                    });
                    infowindow.open(model.map, marker);
                }, 500);

                /* setTimeout(function () {
                 model.infoWindow.forEach(function (x) {
                 x.close();
                 });
                 }, 8000);
                 */
                /*
                 console.log((80 / Math.pow(model.map.getZoom(), 2)));
                 var infoBubble = new InfoBubble({
                 map: model.map,
                 content: popupContent,
                 position: new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng() + (80 / Math.pow(model.map.getZoom(), 2.6))),
                 shadowStyle: 1,
                 padding: 0,
                 backgroundColor: '#4a90e2',
                 borderRadius: 5,
                 arrowSize: 0,
                 disableAnimation: true,
                 borderWidth: 1,
                 borderColor: '#2c2c2c',
                 disableAutoPan: true,
                 hideCloseButton: false,
                 arrowPosition: 30,
                 backgroundClassName: 'transparent',
                 arrowStyle: 2,
                 pixelOffset: new google.maps.Size(100, 100)
                 });
                 model.infoWindow.push(infoBubble);
                 setTimeout(function () {
                 infoBubble.open();
                 }, 500);
                 setTimeout(function () {
                 model.infoWindow.forEach(function (x) {
                 x.close();
                 });
                 }, 4000);
                 
                 */
            });
            /*google.maps.event.addListener(marker, 'mouseout', function () {
             model.infoWindow[marker.country].close();
             });*/


        });
    }

    function getAverageOperatorScores(country) {
        var operatorAverageScores = {};
        var average = 0;
        var count = 0;
        model.globalPerformanceAtGlanceData.forEach(function (d) {
            if (d.geoCountry === country) {
                d.operators.forEach(function (c) {
                    average = 0;
                    count = 0;
                    if (model.globalPerformanceAtGlanceType === 'overall') {
                        count = 0;
                        average = 0;
                        c.overallPerformance.forEach(function (vals) {
                            average = average + vals.y;
                            count++;
                        });
                        if (count > 0) {
                            average = average / count;
                        } else {
                            average = 0;
                        }
                    } else if (model.globalPerformanceAtGlanceType === 'web') {
                        count = 0;
                        average = 0;
                        c.webPerformance.forEach(function (vals) {
                            average = average + vals.y;
                            count++;
                        });
                        if (count > 0) {
                            average = average / count;
                        } else {
                            average = 0;
                        }
                    } else if (model.globalPerformanceAtGlanceType === 'media') {
                        count = 0;
                        average = 0;
                        c.mediaPerformance.forEach(function (vals) {
                            average = average + vals.y;
                            count++;
                        });
                        if (count > 0) {
                            average = average / count;
                        } else {
                            average = 0;
                        }
                    }


                    if (model.isAnonymous === true) {
                        operatorAverageScores[c.operatorName] = average;
                    } else {
                        operatorAverageScores[c.operatorNameUnAnonymized] = average;
                    }
                });
            }
        });


        var sortedArray = [];
        for (var x in operatorAverageScores) {
            if (operatorAverageScores.hasOwnProperty(x)) {
                var tmp = {};
                tmp[x] = operatorAverageScores[x];
                sortedArray.push(tmp);
            }
        }

        //console.log(sortedArray);

        sortedArray.sort(function (a, b) {
            return a[Object.keys(a)[0]] - b[Object.keys(b)[0]]
        });
        sortedArray.reverse();
        //console.log(sortedArray);
        var count = 0;

        operatorAverageScores = {};
        sortedArray.forEach(function (x) {
            operatorAverageScores[Object.keys(x)[0]] = x[Object.keys(x)[0]];
        });

        console.log(operatorAverageScores);

        return operatorAverageScores;
    }



    function getCountryScores(country) {
        var temp = {};
        model.globalPerformanceAtGlanceData.forEach(function (d) {
            if (d.geoCountry === country) {
                temp = {
                    'mediaPerformance': d.mediaPerformance,
                    'overallPerformance': d.overallPerformance,
                    'webPerformance': d.webPerformance

                };
            }
        });
        return temp;
    }


    function compare(a, b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }


    function anonymize() {
        if (model.isAnonymous === true) {
            enterPassword();
        } else {
            model.isAnonymous = true;
            clearFieldsAndGraph();
        }
    }

    function enterPassword() {
        $('.password-modal').show();
    }

    function closePasswordModal() {
        $('.password-modal').hide();
    }


    function clearFieldsAndGraph() {
        $('#select-country').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedCountry,
            nonSelectedText: 'Select Countries'
        });
        $('#select-country-operatorlevel').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedCountry_OperatorLevel,
            nonSelectedText: 'Select Countries'
        });
        $('#select-operator-operatorlevel').multiselect({
            buttonWidth: '100%',
            onChange: updateSelectedOperator_OperatorLevel,
            nonSelectedText: 'Select Operators'
        });

        model.selectedCountriesOperatorLevel = [];
        model.selectedOperatorOperatorLevel = [];
        model.selectedCountries = [];

        categorizeGlobalPerformanceAtGlanceData();
        refreshGlobalPerformanceGlanceTable('media');
        refreshGlobalPerformanceGlanceTable('web');
        refreshGlobalPerformanceGlanceTable('overall');
        populateCountriesFromModel();
        populateOperatorsOperatorLevelFromModel();
        placeMarkerFromModel();
        drawChartFromModel();
        drawOperatorLevelChartFromModel();
    }

    function validatePassword() {
        var password = $('#password').val();
        if (password === model.password) {
            $('#password').val('');
            closePasswordModal();
            model.isAnonymous = false;
            clearFieldsAndGraph();
        } else {
            alert('Invalid password');
        }
        $('#password').val('');
    }

    return {
        setOperatorLevelType: setOperatorLevelType,
        setCountryLevelType: setCountryLevelType,
        setGlobalPerformanceAtGlanceType: setGlobalPerformanceAtGlanceType,
        anonymize: anonymize,
        closePasswordModal: closePasswordModal,
        validatePassword: validatePassword
    };
})();