var entries = {};
var plan = [];

function submitJournalEntry(){
  var note = $("#journalText").val();
  var calories = $("#calories");

  var exerciseArray = [];

  $("#exerciseForm input:checkbox:checked").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, true);
  });

 $("#exerciseForm input:checkbox:not(:checked)").each(function() {
    var item = $(this).val() // do your staff with each checkbox
    exerciseArray.push(item, false);
  });

  var entry = note + " " +  calories + " " +  JSON.stringify(exerciseArray);

  console.log(entry);

  addJournal(entry)
  return false;
}

function refreshJournal(){
    $("#journalExerciseList").html("");
    $("#journalText").html("")

    for(var key in entries){ 
        var newItem = $("<li>");
        newItem.html(entries[key]);
        $("#journalExerciseList").append(newItem);
    }

    $("#journalExerciseList").append(entries);
}

function getJournal() {
  $.ajax({
    type: "get",
    url: "/entry",
    success: function(data) {
      entries = data.entries;
      plan = data.plan;
      refreshJournal();
    }
  });
  console.log(JSON.stringify(plan));
  console.log(JSON.stringify(entries));
}

function addJournal(entry) {
  $.ajax({
    type: "post",
    data: {"entry": entry},
    url: "/entry",
    success: function(data) { 
      var date = new Date();
      entries[date] = data[entry];
      refreshJournal();
    }
  });
}

$(document).ready(function(){
    getJournal();
});

