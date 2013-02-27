var entries = {};

function submitJournalEntry(){
  var note = $("#journalText").val();
  var weight = $("#weight").val();

  var exerciseArray = [];

  $("#exerciseForm input:checkbox:checked").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, true);
  });

 $("#exerciseForm input:checkbox:not(:checked)").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, false);
  });

  var entry = note + "%&" + weight + "%&" +  JSON.stringify(exerciseArray);

  console.log(entry);

  addJournal(entry)
  return false;
}

var topics = ['All','Cat1','Cat2'];



function refreshJournal(){
    $("#journalExerciseList").html("");
    $("#journalText").html("")

    var container = $("journalExerciseList");

    for(var i = 0; i < myPlan.length; i++){ 
        var newItem = $("<li>");
        newItem.html(myPlan[i]);
        $("#journalExerciseList").append(newItem);
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

