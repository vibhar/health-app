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

    $("#graphButton").click(function(){
        $("canvas").css("display", "");
        $("#calendar").css("display", "none");
        makeGraph();
    });

    $("#calendarButton").click(function(){
        $("canvas").css("display", "none");
        $("#calendar").css("display", "");
        makeCalendar(calendarDate);
    });

    $(".cal").hover(function(){
        // $(this).append("<div id='popup'>nksegeglsnk</div>");
        var id = $(this).attr('id');
        var foo = id.split("_");
        var row = foo[1];
        var col = foo[2];
        var startCol = calendarDate.getDay();
        console.log(startCol);
        console.log(row);
        if ((row === "1") && (parseInt(col) < startCol+1)){
            return;
        }
        console.log(foo);
        // console.log(calendarDate);
    },
    function () {
    $(this).find("#popup").remove();
  });
     makeCalendar(calendarDate);

});
