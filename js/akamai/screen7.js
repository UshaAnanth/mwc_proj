/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var screen7 = (function () {

    var model = {
        getUKMarketRanking: []
    };
    $(document).ready(function () {
        
        $("#menu-box").hide();
                $("#menu-icon").click(function () {
                $("#menu-box").toggle(500, "linear");
         });
        
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
        var data = [
            {
                "category": "",
                "color":"#FFB56C",
                "Media QoE Scores in London": "87.2",
              
                
            },
            {
                "category": "UK_Operator_2",
                "color":"#FFFF99",
                "Media QoE Scores in London": "76.9"
            },
            {
                "category": "UK_Operator_3",
                "color":"#FFFF99",
                "Media QoE Scores in London": "73.2"
            },
            {
                "category": "UK_Operator_4",
                "color":"#FFFF99",
                "Media QoE Scores in London": "64.7"
            }
        ];
        var color2 = [
            "#19D175",
            "#b7b83f",
            "#b9783f"];

        staticPage.RenderGraph("chart4", data, "Media QoE Scores in London", color2,10,95,'UK_Operator_1');
        
    });

  
})();
