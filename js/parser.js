//The screens use JSON data to draw the maps and charts.
//This means that the CSV data provided has to be parsed into a structured JSON.
//This API does this task.

var CSVToJsonParser = (function () {
    var countryJSON = [];
    var countryGlobalPerformanceJSON = {};
    var operatorsPerformance = [];
    var operatorPerformanceTimeline = [];
    var count = 0;
    var globalPerformanceJson = [];
    var globalPerformanceTimelineJSON = [];
    var keyRumKpiJSON = [];
    var keyRumKpi = [];
    var maKpi = [];
    var maKpiJSON = [];
    
    

    function fetchData() {
        count = 0;
        d3.csv('csv/countries.csv', function (d) {
            return {
                name: d.Name,
                code: d.Code,
                latitude: d.Latitude,
                longitude: d.Longitude
            };
        }, function (error, rows) {
            countryJSON = rows;
            count++;
        });

        d3.csv('csv/countries_global_performance.csv', function (d) {
            return {
                name: d.Name,
                code: d.Code,
                mediaPerformance: d.MediaPerformance,
                webPerformance: d.WebPerformance,
                overallPerformance: d.OverallPerformance
            };
        }, function (error, rows) {
            rows.forEach(function (d) {
                countryGlobalPerformanceJSON[d.name] = d;
                console.log(d);
            });
            count++;
        });

        d3.csv('csv/operators_performance.csv', function (d) {
            return {
                name: d.Country,
                code: d.Code,
                operatorName: d.OperatorName,
                operatorNameUnAnonymized: d.OperatorNameUnanonymized,
                mediaPerformance: parseFloat(d.MediaPerformance),
                webPerformance: parseFloat(d.WebPerformance),
                overallPerformance: parseFloat(d.OverallPerformance)
            };
        }, function (error, rows) {
            rows.forEach(function (d) {
                if (operatorsPerformance[d.name] === undefined) {
                    operatorsPerformance[d.name] = [];
                }
                operatorsPerformance[d.name].push(d);
            });
            count++;
        });

        d3.csv('csv/operators_performance_timeline.csv', function (d) {
            return {
                name: d.geo_country,
                code: '',
                operatorName: d.operator,
                operatorNameUnAnonymized: d.operator_anonymized,
                Time: d.time,
                mediaPerformance: parseFloat(d.media_performance),
                webPerformance: parseFloat(d.web_performance),
                overallPerformance: parseFloat(d.overall_score)
            };
        }, function (error, rows) {
            rows.forEach(function (d) {
                if (operatorPerformanceTimeline[d.name] === undefined) {
                    operatorPerformanceTimeline[d.name] = {};
                }
                if (operatorPerformanceTimeline[d.name][d.operatorName] === undefined) {
                    operatorPerformanceTimeline[d.name][d.operatorName] = {};
                }

                operatorPerformanceTimeline[d.name][d.operatorName]['operatorNameUnAnonymized'] = d.operatorNameUnAnonymized;

                if (operatorPerformanceTimeline[d.name][d.operatorName]['mediaPerformance'] === undefined) {
                    operatorPerformanceTimeline[d.name][d.operatorName]['mediaPerformance'] = [];
                }
                operatorPerformanceTimeline[d.name][d.operatorName]['mediaPerformance'].push({'x': parseInt(d.Time), 'y': parseFloat(d.mediaPerformance)});

                if (operatorPerformanceTimeline[d.name][d.operatorName]['webPerformance'] === undefined) {
                    operatorPerformanceTimeline[d.name][d.operatorName]['webPerformance'] = [];
                }
                operatorPerformanceTimeline[d.name][d.operatorName]['webPerformance'].push({'x': parseInt(d.Time), 'y': parseFloat(d.webPerformance)});

                if (operatorPerformanceTimeline[d.name][d.operatorName]['overallPerformance'] === undefined) {
                    operatorPerformanceTimeline[d.name][d.operatorName]['overallPerformance'] = [];
                }
                operatorPerformanceTimeline[d.name][d.operatorName]['overallPerformance'].push({'x': parseInt(d.Time), 'y': parseFloat(d.overallPerformance)});

            });
            count++;
            //console.log(operatorPerformanceTimeline);



        });



        d3.csv('csv/ma_kpi.csv', function (d) {
            return {
                name: d.geo_country,
                code: '',
                operatorName: d.operator,
                operatorNameUnAnonymized: d.operator_anonymized,
                Time: d.time,
                StartupTime: parseFloat(d.startup_time),
                RebufferingErrors: parseFloat(d.rebuffer_time_per_minute),
                AverageBitrate: parseFloat(d.bitrate)
            };
        }, function (error, rows) {
            rows.forEach(function (d) {
                if (maKpi[d.name] === undefined) {
                    maKpi[d.name] = {};
                }
                if (maKpi[d.name][d.operatorName] === undefined) {
                    maKpi[d.name][d.operatorName] = {};
                }

                maKpi[d.name][d.operatorName]['operatorNameUnAnonymized'] = d.operatorNameUnAnonymized;

                if (maKpi[d.name][d.operatorName]['StartupTime'] === undefined) {
                    maKpi[d.name][d.operatorName]['StartupTime'] = [];
                }
                maKpi[d.name][d.operatorName]['StartupTime'].push({'x': parseInt(d.Time), 'y': parseFloat(d.StartupTime)});

                if (maKpi[d.name][d.operatorName]['RebufferingErrors'] === undefined) {
                    maKpi[d.name][d.operatorName]['RebufferingErrors'] = [];
                }
                maKpi[d.name][d.operatorName]['RebufferingErrors'].push({'x': parseInt(d.Time), 'y': parseFloat(d.RebufferingErrors)});

                if (maKpi[d.name][d.operatorName]['AverageBitrate'] === undefined) {
                    maKpi[d.name][d.operatorName]['AverageBitrate'] = [];
                }
                maKpi[d.name][d.operatorName]['AverageBitrate'].push({'x': parseInt(d.Time), 'y': parseFloat(d.AverageBitrate)});

            });
            count++;
            //console.log(operatorPerformanceTimeline);



        });
        
        
        
        d3.csv('csv/key_rum_kpi.csv', function (d) {
            return {
                name: d.geo_country,
                code: '',
                operatorName: d.operator,
                operatorNameUnAnonymized: d.operator_anonymized,
                Time: d.time,
                PageLoadTime: parseFloat(d.page_load_time),
                FirstByteTime: parseFloat(d.first_byte_time),
                DownloadTime: parseFloat(d.download_time)
            };
        }, function (error, rows) {
            rows.forEach(function (d) {
                if (keyRumKpi[d.name] === undefined) {
                    keyRumKpi[d.name] = {};
                }
                if (keyRumKpi[d.name][d.operatorName] === undefined) {
                    keyRumKpi[d.name][d.operatorName] = {};
                }

                keyRumKpi[d.name][d.operatorName]['operatorNameUnAnonymized'] = d.operatorNameUnAnonymized;

                if (keyRumKpi[d.name][d.operatorName]['PageLoadTime'] === undefined) {
                    keyRumKpi[d.name][d.operatorName]['PageLoadTime'] = [];
                }
                keyRumKpi[d.name][d.operatorName]['PageLoadTime'].push({'x': parseInt(d.Time), 'y': parseFloat(d.PageLoadTime)});

                if (keyRumKpi[d.name][d.operatorName]['FirstByteTime'] === undefined) {
                    keyRumKpi[d.name][d.operatorName]['FirstByteTime'] = [];
                }
                keyRumKpi[d.name][d.operatorName]['FirstByteTime'].push({'x': parseInt(d.Time), 'y': parseFloat(d.FirstByteTime)});

                if (keyRumKpi[d.name][d.operatorName]['DownloadTime'] === undefined) {
                    keyRumKpi[d.name][d.operatorName]['DownloadTime'] = [];
                }
                keyRumKpi[d.name][d.operatorName]['DownloadTime'].push({'x': parseInt(d.Time), 'y': parseFloat(d.DownloadTime)});

            });
            count++;
            //console.log(operatorPerformanceTimeline);



        });
    }

    function getJSONFromCSVScreen1() {


        $.each(countryJSON, function (i) {
            var temp = {};
            var currentCountry = countryJSON[i].name;
            temp['geoCountry'] = currentCountry;
            temp['countryCode'] = countryJSON[i].code;

            var latlong = {
                latitude: countryJSON[i].latitude,
                longitude: countryJSON[i].longitude
            };
            temp['latlong'] = latlong;
            temp['mediaPerformance'] = parseFloat(countryGlobalPerformanceJSON[currentCountry].mediaPerformance);
            temp['webPerformance'] = parseFloat(countryGlobalPerformanceJSON[currentCountry].webPerformance);
            temp['overallPerformance'] = parseFloat(countryGlobalPerformanceJSON[currentCountry].overallPerformance);
            temp['operators'] = operatorsPerformance[currentCountry];
            globalPerformanceJson.push(temp);

        });
    }


    function getJSONFromCSVScreen2() {


        $.each(countryJSON, function (i) {
            var temp = {};
            var currentCountry = countryJSON[i].name;
            temp['geoCountry'] = currentCountry;
            temp['countryCode'] = countryJSON[i].code;
            temp['mediaPerformance'] = countryGlobalPerformanceJSON[currentCountry]['mediaPerformance'];
            temp['webPerformance'] = countryGlobalPerformanceJSON[currentCountry]['webPerformance'];
            temp['overallPerformance'] = countryGlobalPerformanceJSON[currentCountry]['overallPerformance'];

            var latlong = {
                latitude: countryJSON[i].latitude,
                longitude: countryJSON[i].longitude
            };
            temp['latlong'] = latlong;
            temp['operators'] = [];
            Object.keys(operatorPerformanceTimeline[currentCountry]).forEach(function (currentOperator) {
                var operatorInfo = {};
                operatorInfo = {
                    operatorName: currentOperator,
                    operatorId: 0,
                    operatorNameUnAnonymized: operatorPerformanceTimeline[currentCountry][currentOperator]['operatorNameUnAnonymized'],
                    mediaPerformance: operatorPerformanceTimeline[currentCountry][currentOperator]['mediaPerformance'],
                    webPerformance: operatorPerformanceTimeline[currentCountry][currentOperator]['webPerformance'],
                    overallPerformance: operatorPerformanceTimeline[currentCountry][currentOperator]['overallPerformance']
                };
                temp['operators'].push(operatorInfo);
            });
            globalPerformanceTimelineJSON.push(temp);

        });

        //Update IDS of operator
        var idCount = 1;
        $.each(globalPerformanceTimelineJSON, function (i) {
            $.each(globalPerformanceTimelineJSON[i].operators, function (k) {
                globalPerformanceTimelineJSON[i].operators[k].operatorId = idCount++;
            });
        });

        //console.log(temp);
    }
    
    
    
        function getJSONFromCSVScreen3() {


        $.each(countryJSON, function (i) {
            var temp = {};
            var currentCountry = countryJSON[i].name;
            temp['geoCountry'] = currentCountry;
            temp['countryCode'] = countryJSON[i].code;
           
            var latlong = {
                latitude: countryJSON[i].latitude,
                longitude: countryJSON[i].longitude
            };
            temp['latlong'] = latlong;
            temp['operators'] = [];

            Object.keys(maKpi[currentCountry]).forEach(function (currentOperator) {
                var operatorInfo = {};
                operatorInfo = {
                    operatorName: currentOperator,
                    operatorId: 0,
                    operatorNameUnAnonymized: maKpi[currentCountry][currentOperator]['operatorNameUnAnonymized'],
                    StartupTime: maKpi[currentCountry][currentOperator]['StartupTime'],
                    RebufferingErrors: maKpi[currentCountry][currentOperator]['RebufferingErrors'],
                    AverageBitrate: maKpi[currentCountry][currentOperator]['AverageBitrate']
                };
                temp['operators'].push(operatorInfo);
            });
            maKpiJSON.push(temp);

        });

        //Update IDS of operator
        var idCount = 1;
        $.each(maKpiJSON, function (i) {
            $.each(maKpiJSON[i].operators, function (k) {
                maKpiJSON[i].operators[k].operatorId = idCount++;
            });
        });

        //console.log(temp);
    }
    
    
    
     function getJSONFromCSVScreen4() {


        $.each(countryJSON, function (i) {
            var temp = {};
            var currentCountry = countryJSON[i].name;
            temp['geoCountry'] = currentCountry;
            temp['countryCode'] = countryJSON[i].code;
           
            var latlong = {
                latitude: countryJSON[i].latitude,
                longitude: countryJSON[i].longitude
            };
            temp['latlong'] = latlong;
            temp['operators'] = [];

            Object.keys(keyRumKpi[currentCountry]).forEach(function (currentOperator) {
                var operatorInfo = {};
                operatorInfo = {
                    operatorName: currentOperator,
                    operatorId: 0,
                    operatorNameUnAnonymized: keyRumKpi[currentCountry][currentOperator]['operatorNameUnAnonymized'],
                    StartupTime: keyRumKpi[currentCountry][currentOperator]['PageLoadTime'],
                    RebufferingErrors: keyRumKpi[currentCountry][currentOperator]['FirstByteTime'],
                    AverageBitrate: keyRumKpi[currentCountry][currentOperator]['DownloadTime']
                };
                temp['operators'].push(operatorInfo);
            });
            keyRumKpiJSON.push(temp);

        });

        //Update IDS of operator
        var idCount = 1;
        $.each(keyRumKpiJSON, function (i) {
            $.each(keyRumKpiJSON[i].operators, function (k) {
                keyRumKpiJSON[i].operators[k].operatorId = idCount++;
            });
        });

        //console.log(temp);
    }

    return {
        getScreen1Data: function (callback) {
            fetchData();
            var t = setInterval(function () {
                //console.log(count);
                if (count === 6) {
                    count = 0;
                    clearInterval(t);
                    getJSONFromCSVScreen1();
                    callback(globalPerformanceJson);
                }
            }, 10);
        },
        getScreen2Data: function (callback) {
            fetchData();
            var t = setInterval(function () {
                //console.log(count);
                if (count === 6) {
                    count = 0;
                    clearInterval(t);
                    getJSONFromCSVScreen2();
                    callback(globalPerformanceTimelineJSON);
                }
            }, 10);
        },
        getScreen3Data: function (callback) {
            fetchData();
            var t = setInterval(function () {
                //console.log(count);
                if (count === 6) {
                    count = 0;
                    clearInterval(t);
                    getJSONFromCSVScreen3();
                    callback(maKpiJSON);
                }
            }, 10);
        },
        getScreen4Data: function (callback) {
            fetchData();
            var t = setInterval(function () {
                //console.log(count);
                if (count === 6) {
                    count = 0;
                    clearInterval(t);
                    getJSONFromCSVScreen4();
                    callback(keyRumKpiJSON);
                }
            }, 10);
        }

    };
})();