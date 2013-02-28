var entries = {};

function submitJournalEntry(){
  var note = $("#journalText").val();
  var weight = $("#weight").val();

  var exerciseArray = [];

  $("#journalExerciseList input:checkbox:checked").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, true);
  });

 $("#journalExerciseList input:checkbox:not(:checked)").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, false);
  });

  var entry = note + "%&" + weight + "%&" +  JSON.stringify(exerciseArray);

  console.log(entry);

  addJournal(entry);
  return false;
}

function refreshJournal(){
    $("#journalExerciseList").html("");
    $("#journalText").html("")

    for(var i = 0; i < myPlan.length; i++){ 
        var num = "" + i;
        console.log(myPlan[i]);
        var container = $('<input type ="checkbox" name ="plan"' + num + " value=" + JSON.stringify(myPlan[i]) + ">");
        $("#journalExerciseList").append(container).append(myPlan[i]).append("<br>");
        num = "";
    }
}

function getJournal() {
  $.ajax({
    type: "get",
    url: "/entry",
    success: function(data) {
      entries = data.entries;
      refreshJournal();
    }
  });
  console.log("plan: " + JSON.stringify(myPlan));
  console.log("entries: " + JSON.stringify(entries));
}

function addJournal(entry) {
  $.ajax({
    type: "post",
    data: {"entry": entry},
    url: "/entry",
    success: function(data) { 
      var date = new Date();
      entries[date] = data["entry"];
      refreshJournal();
      refreshPlan();
      makeGraph();
    }
  });
}

$(document).ready(function(){
    getJournal();
});