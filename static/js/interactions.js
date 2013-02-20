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

    var submitExercisePlanItem = function (){
        var length = $("#lengthExercise").val();
        var type = $("#typeExercise").val();
        console.log(length + " " + type);

        $("#lengthExercise").val("");
        $("#typeExercise").val("");

        return false;
    }
});

var submitExercisePlanItem = function (){
        var length = $("#lengthExercise").val();
        var type = $("#typeExercise").val();
        console.log(length + " " + type);

        $("#lengthExercise").val("");
        $("#typeExercise").val("");

        var newItem = $("<li>");
        newItem.html(length + " " + type);
        $("#myExercisePlanList").append(newItem);
        return false;
}