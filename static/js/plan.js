var plan = [];

function isSameDay(day1, day2){
  return day1.getMonth() === day2.getMonth() &&
         day1.getYear() === day2.getYear() &&
         day1.getDate() === day2.getDate();
}

function submitExercisePlanItem(){
        var length = $("#lengthExercise").val();
        var type = $("#typeExercise").val();

        addPlan(length + " " + type
            )
        $("#lengthExercise").val("");
        $("#typeExercise").val("");

        return false;
}

function refreshPlan(){
    $("#myExercisePlanList").html("");

    for(var i=0; i < plan.length; i++){
        var newItem = $("<li>");
        newItem.html(plan[i]);
        $("#myExercisePlanList").append(newItem);
    }
}

function getPlan() {
  $.ajax({
    type: "get",
    url: "/plan",
    success: function(data) {
      plan = data.plan;
      refreshPlan();
    }
  });
}

function addPlan(task) {
  $.ajax({
    type: "post",
    data: {"task": task},
    url: "/plan",
    success: function(data) { 
      plan.push(data['task']);
      refreshPlan();
    }
  });
}

$(document).ready(function(){
    getPlan();
});

