function makeGraph(){
    console.log(entries);
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect ( 0 , 0 , width , height );
    var points = []


    dates = [];
    for (var key in entries){
        dates.push(new Date(key));
    }
 
    var date_sort_desc = function (date1, date2) {
      if (date1 > date2) return 1;
      if (date1 < date2) return -1;
      return 0;
    };
 
    dates.sort(date_sort_desc);
    console.log(dates);

    var numPoints = Math.min(dates.length, 7);
    for (var i = 0; i < numPoints; i++){
        var tmp = entries[dates[dates.length-i-1]];
        if (tmp !== undefined){
            var weight = tmp.split("%&")[1]
            console.log("weight: " + weight);
            points.push([dates[dates.length-i-1], weight]);
        }
    }
    console.log(points);

    //draw frame of axis
    ctx.beginPath();
    ctx.moveTo(1/10 * width, 1/10 * height);
    ctx.lineTo(1/10 * width, 9/10 * height);
    ctx.lineTo(9/10 * width, 9/10 * height);
    ctx.lineWidth = 3;
    ctx.stroke();

    console.log("foobar")
    ctx.save();
    ctx.font = '20px Calibri';
    ctx.translate(1/30 * width, 4/6*height);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Weight (lbs)",0,0);
    ctx.restore();

    var minWeight = 80;
    var maxWeight = 200;


    var graphPoints = [];

    var bottomLeftGraph = [1/10 * width, 9/10 * height];
    var bottomRightGraph = [9/10 * width, 9/10 * height];
    var topLeftGraph = [1/10 * width, 1/10 * height];
    var graphWidth = bottomRightGraph[0] - bottomLeftGraph[0];
    var graphHeight = bottomLeftGraph[1] - topLeftGraph[1];

    var numDisplayPoints = points.length;
    console.log("sadgjkdsgk: " + points.length);
    
    var count = -1;
    if (numPoints > 0)
        count = numDisplayPoints-1;

    //draw the points on the graph
    while (count >= 0) {
        var point = points[points.length-1-count];
            
        var x = bottomLeftGraph[0] + 10 + (count)/numDisplayPoints * (graphWidth-10);
        var y = bottomLeftGraph[1] - (point[1]-minWeight)/(maxWeight- minWeight) * (graphHeight-10);
        console.log(y);
        graphPoints.push([x,y]);
        count -= 1;
    }

    function circle(ctx, cx, cy, radius) {
        ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    }

    for (var i = 0; i < graphPoints.length; i++){
        ctx.beginPath();
        circle(ctx, graphPoints[i][0], graphPoints[i][1], 5);
        ctx.fill();
    }
    if (numPoints > 0){
        ctx.beginPath();
        ctx.moveTo(graphPoints[0][0], graphPoints[0][1]);
        for (var i = 1; i < graphPoints.length; i++){
            ctx.lineTo(graphPoints[i][0], graphPoints[i][1]);
        }
        ctx.stroke();
    }

    var numAxisDashes = 6;

    //y axis
    for (var i=1; i < numAxisDashes; i++){
        ctx.beginPath();
        ctx.moveTo(bottomLeftGraph[0], bottomLeftGraph[1] - i / numAxisDashes * graphHeight);
        ctx.lineTo(bottomLeftGraph[0] - 10, bottomLeftGraph[1] - i / numAxisDashes * graphHeight);
        ctx.stroke();

        ctx.fillText("" + (80 + i*20) , bottomLeftGraph[0] - 30, bottomLeftGraph[1] - i / numAxisDashes * graphHeight + 5);
    }

    //x axis
    numAxisDashes = points.length;
    for (var i=0; i < numAxisDashes; i++){
        ctx.beginPath();
        ctx.moveTo(bottomLeftGraph[0] + 10 + (i)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1]);
        ctx.lineTo(bottomLeftGraph[0] + 10 + (i)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1] + 10);
        ctx.stroke();

        ctx.fillText("" + (points[i][0].getMonth() + 1) + "/" +  points[i][0].getDate(), bottomLeftGraph[0] + 5 + (i)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1] + 20);

    }

    
}