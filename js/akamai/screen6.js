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
    var countries = [
        {label: 'North Korea', value: 'North Korea', selected: "selected"},
        {label: 'Japan', value: 'Japan', selected: "selected"},
        {label: 'UK Operator 1', value: 'UK_Operator_1', selected: "selected"},
        {label: 'US', value: 'US', selected: "selected"},
        {label: 'France', value: 'France', selected: "selected"},
        {label: 'UK', value: 'UK'},
        {label: 'Germany', value: 'Germany'}

    ];
    
    $('#select-country').multiselect({
        buttonText: function (options, select) {
            return ' Countries ';
        }

    });
    $("#select-country").multiselect('dataprovider', countries);
  

    var color1 = ["#00CCFF",
        "#b93e3d",
        "#448e4d",
        "#333300",
        "#b9783f"];
    var color2 = [
        "#b9783f",
        "#333300",
        "#b9783f"];
    var data1 = [
        {
            "category": "North Korea",
            "Media QoE Scores in Global": "94.3",
            "color":"#00CCFF"
        },
        {
            "category": "Japan",
            "Media QoE Scores in Global": "89.6",
            "color":"#00CCFF"
        },
        {
            "category": "",
            "Media QoE Scores in Global": "87.2",
            "color":"#FFB56C"
        },
        {
            "category": "US",
            "Media QoE Scores in Global": "79.4",
            "color":"#00CCFF"
        },
        {
            "category": "France",
            "Media QoE Scores in Global": "72.7",
            "color":"#00CCFF"
        }
    ];
    staticPage.RenderGraph("chart1", data1, "Media QoE Scores in Global", color1,0,180,'UK_Operator_1');
    var data2 = [
        {
            "category": "Japan_Operator_1",
            "Media QoE Scores in Japan": "96.4",
              "color":"#FFFF99"
        },
        {
            "category": "Japan_Operator_2",
            "Media QoE Scores in Japan": "91.8",
             "color":"#FFFF99"
        },
        {
            "category": "Japan_Operator_3",
            "Media QoE Scores in Japan": "87.2",
             "color":"#FFB56C"
        },
        {
            "category": "Japan_Operator_4",
            "Media QoE Scores in Japan": "83.3",
             "color":"#FFFF99"
        },
        {
            "category": "Japan_Operator_5",
            "Media QoE Scores in Japan": "74.6",
             "color":"#FFFF99"
        }
    ];

    staticPage.RenderGraph("chart2", data2, "Media QoE Scores in Japan", color2,20,160,'');
});
