var myPlan = [];

function isSameDay(day1, day2){
  return day1.getMonth() === day2.getMonth() &&
         day1.getYear() === day2.getYear() &&
         day1.getDate() === day2.getDate();
}

function submitExercisePlanItem(){
    var description = $("#description").val();
    var type = $('form input[type=radio]:checked').attr("id");
    if (type === undefined){
      return false;
    }
    
    addPlan(type + " " + description);
    $("#description").val("");

    return false;
}

function refreshPlan(){
    $("#myExercisePlanList").html("");

    for(var i=0; i < myPlan.length; i++){
        var newItem = $("<li>");
        newItem.html(myPlan[i]);
        $("#myExercisePlanList").append(newItem);
    }
}

function getPlan() {
  $.ajax({
    type: "get",
    url: "/plan",
    success: function(data) {
      myPlan = data.plan;
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
      myPlan.push(data['task']);
      refreshJournal();
      refreshPlan();
    }
  });
}

$(document).ready(function(){
    getPlan();
});

