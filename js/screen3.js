

var model = {
    //
    //
    //
    //The password to un-anonymize data
    //-------------------------------
    //
    password: 'showmedata',
    //
    //---------------------------------

    map: {},
    keyRumKPIData: [],
    selectedCountries: [],
    selectedOperators: [],
    minZoom: 2,
    maxZoom: 2,
    isAnonymous: true,
    days: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
};


$(document).ready(function () {

    getKeyRumKPIData();
    $("#graph-content-2").hide();
    $("#menu-box").hide();

    $("#generate-graph").click(function () {
        $("#graph-content-2").toggle(500, "linear", function () {
            if ($("#graph-content-2").is(':visible')) {
                $("#generate-graph").html('Exit Graph');
            } else {
                $("#generate-graph").html('Generate Graph');
            }
        });
    });
    $("#generate-graph2").click(function () {
        $("#graph-content-2").toggle(500, "linear", function () {
            if ($("#graph-content-2").is(':visible')) {
                $("#generate-graph2").html('Exit Graph');
            } else {
                $("#generate-graph2").html('Generate Graph');
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
        $("#graph-content-2").hide(500, "linear");
    });

    $('#select-country').multiselect({
        buttonWidth: '100%',
        onChange: updateSelectedCountry,
        nonSelectedText: 'Select Countries'
    });

    $('#select-operator').multiselect({
        buttonWidth: '100%',
        onChange: updateSelectedOperator,
        nonSelectedText: 'Select Operators'
    });
    //renderEmptyGraph('chart1', 'legend1');
    init_map();

    makeGraphAxesWhite();

    $('body').mousemove(makeGraphAxesWhite);

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

function makeGraphAxesWhite() {
    $(".rickshaw_graph .x_ticks_d3 text").attr("fill", "white");
    $(".rickshaw_graph .y_ticks text").attr("fill", "white");
}


function updateSelectedCountry() {
    model.selectedCountries = [];
    var countries = $('#select-country option:selected');
    var selected = [];
    $(countries).each(function (index, country) {
        selected.push($(this).val());
    });
    model.selectedCountries = selected;
    populateOperatorsFromModel();
    updateSelectedOperator();
    console.log(model.selectedOperators);
}

function updateSelectedOperator() {
    model.selectedOperators = [];
    var countries = $('#select-operator option:selected');
    var selected = [];
    $(countries).each(function (index, country) {
        selected.push(parseInt($(this).val()));
    });
    model.selectedOperators = selected;
    drawCharts();
}


function populateOperatorsFromModel() {
    var data = [];

    $.each(model.keyRumKPIData, function (i) {
        if (model.selectedCountries.indexOf(model.keyRumKPIData[i].geoCountry) !== -1) {
            $.each(model.keyRumKPIData[i].operators, function (j) {
                var temp = {};
                if (model.isAnonymous === true) {
                    temp['label'] = model.keyRumKPIData[i].operators[j].operatorName;
                } else {
                    temp['label'] = model.keyRumKPIData[i].operators[j].operatorNameUnAnonymized;
                }

                temp['value'] = model.keyRumKPIData[i].operators[j].operatorId;

                if (model.selectedOperators.indexOf(model.keyRumKPIData[i].operators[j].operatorId) !== -1) {
                    temp['selected'] = true;
                } else {
                    temp['selected'] = false;
                }
                data.push(temp);
            });
        }
//console.log(data);
    });
    //console.log(data);
    //console.log(data);

    $("#select-operator").multiselect('dataprovider', data);
}

function populateCountriesFromModel() {
    var data = [];

    $.each(model.keyRumKPIData, function (i) {
        var temp = {};
        temp['label'] = model.keyRumKPIData[i].geoCountry;
        temp['value'] = model.keyRumKPIData[i].geoCountry;
        data.push(temp);
    });
    console.log(data);

    $("#select-country").multiselect('dataprovider', data);


}

function init_map() {
    var myOptions = {
        zoom: 2,
        center: new google.maps.LatLng(10, -70),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    model.map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);

    google.maps.event.addListener(model.map, 'zoom_changed', function () {
        //console.log('zoomed' + model.map.getZoom());

        if (model.map.getZoom() > model.maxZoom) {
            model.map.setZoom(model.maxZoom);
        }

        if (model.map.getZoom() < model.minZoom) {
            model.map.setZoom(model.minZoom);
        }

    });
}

function getKeyRumKPIData() {
    /* $.ajax({
     url: "js/getKeyRumKPI.json",
     accepts: 'json',
     success: function (data, textStatus, jqXHR) {
     setKeyRumKPIData(data);
     //console.log(data);
     }
     });*/

    CSVToJsonParser.getScreen3Data(function (data) {
        setKeyRumKPIData(data);
    });
}

function setKeyRumKPIData(data) {
    model.keyRumKPIData = data;
    populateCountriesFromModel();
}

function drawCharts() {
    $('#chartContainer1').empty();
    $('#chartContainer1').append('<div id="legend_container1"> <div id="smoother" title="Smoothing"></div><div id="legend1"></div></div><div id="chart1" style="width:100%;"></div>');

    $('#chartContainer2').empty();
    $('#chartContainer2').append('<div id="legend_container2"> <div id="smoother" title="Smoothing"></div><div id="legend2"></div></div><div id="chart2" style="width:100%;"></div>');

    $('#chartContainer3').empty();
    $('#chartContainer3').append('<div id="legend_container3"> <div id="smoother" title="Smoothing"></div><div id="legend3"></div></div><div id="chart3" style="width:100%;"></div>');

    if (model.selectedCountries.length === 0) {
        renderEmptyGraph('chart1', 'legend1');
        renderEmptyGraph('chart2', 'legend2');
        renderEmptyGraph('chart3', 'legend3');
        return;
    }

    drawCharWithData('StartupTime', 'chart1', 'legend1');
    drawCharWithData('RebufferingErrors', 'chart2', 'legend2');
    drawCharWithData('AverageBitrate', 'chart3', 'legend3');


}


function drawCharWithData(metric, chartId, legendId) {
    var arrayOfGraphs = [];
    var palette = new Rickshaw.Color.Palette();
    $.each(model.keyRumKPIData, function (i) {
        var currentCountry = model.keyRumKPIData[i].geoCountry;
        if (model.selectedCountries.indexOf(currentCountry) !== -1) {

            $.each(model.keyRumKPIData[i].operators, function (j) {
                var currentOperatorId = model.keyRumKPIData[i].operators[j].operatorId;
                var operatorName;

                if (model.isAnonymous === true) {
                    operatorName = model.keyRumKPIData[i].operators[j].operatorName;
                } else {
                    operatorName = model.keyRumKPIData[i].operators[j].operatorNameUnAnonymized;
                }

                if (model.selectedOperators.indexOf(currentOperatorId) !== -1) {
                    var series = {
                        name: operatorName,
                        color: palette.color(),
                        data: []
                    };

                    series.data = model.keyRumKPIData[i].operators[j][metric];

                    arrayOfGraphs.push(series);
                }
            });

        }
    });

    var graph = new Rickshaw.Graph({
        element: document.querySelector('#' + chartId),
        renderer: 'line',
        width: 900,
        height: 250,
        series: arrayOfGraphs
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
        element: document.getElementById(legendId)
    });

//    //Added by Usha to toggle the graph contents
//    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
//        graph: graph,
//        legend: legend
//    });
    var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
        graph: graph,
        legend: legend
    });
    $(".rickshaw_graph .x_ticks_d3 text").attr("fill", "white");
    $(".rickshaw_graph .y_ticks text").attr("fill", "white");
}


function renderEmptyGraph(chartId, legendId) {
    var graph = new Rickshaw.Graph({
        element: document.querySelector('#' + chartId),
        renderer: 'line',
        series: [
            
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
        element: document.getElementById(legendId)
    });
    $(".rickshaw_graph .x_ticks_d3 text").attr("fill", "white");
    $(".rickshaw_graph .y_ticks text").attr("fill", "white");
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

    model.selectedCountries = [];
    model.selectedOperators = [];

    $('#select-country').multiselect({
        buttonWidth: '100%',
        onChange: updateSelectedCountry,
        nonSelectedText: 'Select Countries'
    });

    $('#select-operator').multiselect({
        buttonWidth: '100%',
        onChange: updateSelectedOperator,
        nonSelectedText: 'Select Operators'
    });

    model.selectedCountries = [];
    model.selectedOperators = [];

    populateCountriesFromModel();
    populateOperatorsFromModel();
    updateSelectedCountry();
    updateSelectedOperator();
    drawCharts();

}

function validatePassword() {
    var password = $('#password').val();
    if (password === model.password) {
        closePasswordModal();
        model.isAnonymous = false;
        clearFieldsAndGraph();
    } else {
        alert('Invalid password');
    }
    $('#password').val('');
}