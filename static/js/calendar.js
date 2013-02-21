function getMonthString(n){
    switch(n){
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}

function getDaysInMonth(year, month){
    return new Date(year, month+1, 0).getDate();
}
function makeCalendar(){
    var calendar = $("#calendar")

    var date = new Date();

    var currMonthNum = date.getMonth();
    var currMonth = getMonthString(currMonthNum);

    var year = date.getFullYear();

    $("#calendarMonth").html(currMonth + " " + year);

    var startCol = date.getDay();
    var startRow = 1;
    if (startCol === 0)
        startRow = 2;
    
    var count = 1;
    var numDaysInMonth = getDaysInMonth(year, currMonthNum);
    console.log(numDaysInMonth);
    var currRow = startRow;
    var currCol = startCol + 1;
    console.log("Starting at: (" + currRow + "," + currCol + ")");
    while (count <= numDaysInMonth){
        var currCell = $("#cal_" + currRow + "_" + currCol);
        currCell.html(count);
        count++;
        currCol += 1;
        if (currCol==8){
            currCol = 1;
            currRow += 1;
        }
    }

}