    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var width = canvas.width;
    var height = canvas.height;
    var points = []

    var d8 = new Date("February 16, 2013");
    var d7 = new Date("February 15, 2013");
    var d6 = new Date("February 14, 2013");
    var d5 = new Date("February 13, 2013");
    var d4 = new Date("February 12, 2013");
    var d3 = new Date("February 11, 2013");
    var d2 = new Date("February 10, 2013");
    var d1 = new Date("February 9, 2013");

    points.push([d1,100]);
    points.push([d2,90]);
    points.push([d3,120]);
    points.push([d4,110]);
    points.push([d5,150]);
    points.push([d6,110]);
    points.push([d7,100]);
    points.push([d8,130]);

    //draw frame of axis
    ctx.beginPath();
    ctx.moveTo(1/10 * width, 1/10 * height);
    ctx.lineTo(1/10 * width, 9/10 * height);
    ctx.lineTo(9/10 * width, 9/10 * height);
    ctx.lineWidth = 3;
    ctx.stroke();

    var minWeight = 80;
    var maxWeight = 200;


    var graphPoints = [];

    var bottomLeftGraph = [1/10 * width, 9/10 * height];
    var bottomRightGraph = [9/10 * width, 9/10 * height];
    var topLeftGraph = [1/10 * width, 1/10 * height];
    var graphWidth = bottomRightGraph[0] - bottomLeftGraph[0];
    var graphHeight = bottomLeftGraph[1] - topLeftGraph[1];

    var numDisplayPoints = 7;

    var count = numDisplayPoints;

    //draw the points on the graph
    while (count > 0) {
        var point = points[points.length-1-count];
            
        var x = bottomLeftGraph[0] + 10 + (count-1)/numDisplayPoints * (graphWidth-10);
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

    ctx.beginPath();
    ctx.moveTo(graphPoints[0][0], graphPoints[0][1]);
    for (var i = 1; i < graphPoints.length; i++){
        ctx.lineTo(graphPoints[i][0], graphPoints[i][1]);
    }
    ctx.stroke();


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
    numAxisDashes = 8
    for (var i=1; i < numAxisDashes; i++){
        ctx.beginPath();
        ctx.moveTo(bottomLeftGraph[0] + 10 + (i-1)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1]);
        ctx.lineTo(bottomLeftGraph[0] + 10 + (i-1)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1] + 10);
        ctx.stroke();

        ctx.fillText("" + (points[i][0].getMonth() + 1) + "/" +  points[i][0].getDate(), bottomLeftGraph[0] + 5 + (i-1)/numDisplayPoints * (graphWidth-10), bottomLeftGraph[1] + 20);

    }

