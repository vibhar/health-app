$(document).ready(function(){
    $("#healthJournalButton").click(function(){
        $("#healthJournalScreen").css("display", "");
        $("#myPlanScreen").css("display", "none");
        $("#myProgressScreen").css("display", "none");
    })

    $("#myPlanButton").click(function(){
        $("#healthJournalScreen").css("display", "none");
        $("#myPlanScreen").css("display", "");
        $("#myProgressScreen").css("display", "none");
    })
    
    $("#myProgressButton").click(function(){
        $("#healthJournalScreen").css("display", "none");
        $("#myPlanScreen").css("display", "none");
        $("#myProgressScreen").css("display", "");

        makeGraph();
    })

});
