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
        
        var id = $(this).attr('id');
        var foo = id.split("_");
        var row = parseInt(foo[1]);
        var col = parseInt(foo[2]);
        var startCol = calendarDate.getDay();

        if ((row === 1) && (col < startCol+1)){
            return;
        }
        
        var count = 0;
        var notHit = true;

        currCol = startCol+1;
        currRow = 1
        while (notHit){
            if ((currCol===col) && (currRow===row)){
                notHit=false;
            }
            currCol += 1;
            if (currCol===8){
                currCol = 1;
                currRow += 1;
            }
            count += 1;
        }
        var date = count;

        var hoverDate = new Date(calendarDate.getYear() + 1900, 
                                 calendarDate.getMonth(),
                                 date);
        for (var key in entries){
            var val = entries[key].split("%&");
            var stuff = JSON.parse(val[val.length-1]);

            if (isSameDay(hoverDate, new Date(key))){
                var displayStr = "";
                for (item in stuff){
                    displayStr += stuff[item] + "<br/>";
                }
                $(this).append("<div id='popup'>" + displayStr + "</div>");
                return;
            }
        }
        if (hoverDate.getMonth() === calendarDate.getMonth())
            $(this).append("<div id='popup'>No data for this day</div>");
        
    },
    function () {
    $(this).find("#popup").remove();
  });
     makeCalendar(calendarDate);

});
