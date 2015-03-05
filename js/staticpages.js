var staticPage = (function () {
function RenderGraph(chart,data,displayTitle,color,x,y,field)
{
    AmCharts.makeChart(chart,
            {
                "type": "serial",
                "categoryField": "category",
                "rotate": true,
                "angle": 25,
                "depth3D": 25,
                "startDuration": 1,
                "fontFamily": "Helvetica",
                "theme": "black",
                "categoryAxis": {
                    "gridPosition": "start"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-1",
                        "title": displayTitle,
                        "lineColorField":'color',
                        "colorField":'color',
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
                "allLabels": [
                    {
                        "text": field,
                        "bold": true,
                        "x": x,
                        "y": y
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
return {
        RenderGraph: RenderGraph      
    };
})();;