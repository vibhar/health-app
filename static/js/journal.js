var entries = {};

function submitJournalEntry(){
  var note = $("#journalText").val();
  var weight = $("#weight").val();

  var exerciseArray = [];

  $("#journalExerciseList input:checkbox:checked").each(function() {
    var item = $(this).val();
    exerciseArray.push(item);
  });

  // We know they're crappy delimiters; please don't break our app. 
  var entry = note + "%&" + weight + "%&" +  JSON.stringify(exerciseArray);

  addJournal(entry);
  return false;
}

function refreshJournal(){
    $("#journalExerciseList").html("");
    $("#journalText").html("")
    $("#date").html("")

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var monthString = getMonthString(month);

    $("#date").append(monthString + " " + day + ", " + year)

    for(var i = 0; i < myPlan.length; i++){ 
        var num = "" + i;
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
}

function addJournal(entry) {
  $.ajax({
    type: "post",
    data: {"entry": entry},
    url: "/entry",
    success: function(data) { 
      // Rewrites journal entries made on the same day, but
      // otherwise will create a new journal entry. 
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var index = new Date(year, month, day);

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