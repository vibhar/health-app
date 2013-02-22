$(document).ready(function(){
    $("#healthJournalButton").click(function(){
        $("#healthJournalScreen").css("display", "");
        $("#myPlanScreen").css("display", "none");
        $("#myProgressScreen").css("display", "none");
    });

    $("#myPlanButton").click(function(){
        $("#healthJournalScreen").css("display", "none");
        $("#myPlanScreen").css("display", "");
        $("#myProgressScreen").css("display", "none");
    });
    
    $("#myProgressButton").click(function(){
        $("#healthJournalScreen").css("display", "none");
        $("#myPlanScreen").css("display", "none");
        $("#myProgressScreen").css("display", "");
        clearCalendar();
        makeCalendar(calendarDate);
    });

    $("#calPrevMonth").click(function(){
        calendarDate.setMonth(calendarDate.getMonth()-1);
        clearCalendar();
        makeCalendar(calendarDate);
    });

    $("#calNextMonth").click(function(){
        calendarDate.setMonth(calendarDate.getMonth()+1);
        clearCalendar();
        makeCalendar(calendarDate);

    });

});
