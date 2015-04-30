document.addEventListener("DOMContentLoaded", init, false);
var px = [0];
var py = [0];

var r = 20;
var clickedX = -1;
var clickedY = -1;
var hasSelected = false;
// x = getObj();
// var to = null;
// var from = null;

function init() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event) {
    var x = new Number();
    var y = new Number();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    if (event.x != undefined && event.y != undefined) { // For all browsers except FireFox
        x = event.x;
        y = event.y;
    }
    else { // Firefox method to get the position
        x = event.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    if (isLegal(x, y)) {
        drawShape(getName(), x, y, r/2)
        px.push(x);
        py.push(y);
        //alert(molName());
        // n = makeNode(getName())
        // nodeList.add(n)
        addSugar(getName(), x, y);
        addAction('sugar');
     }
    else {
        // find x and y coordinate [if (x>px[i]-r && x<px[i]+r && y<py[i]+r && y>py[i]-r)]
        // determine the position of the node in the list given the coordinates
        // if !from, set from = to the node
        // else prompt bond type and set from = null
        var coords = getNearest(x, y);
        if (hasSelected) {
            // ctx.beginPath();
            // ctx.moveTo(clickedX, clickedY);
            // ctx.lineTo(coords[0], coords[1]);
            // ctx.lineWidth = 3;
            // ctx.stroke();
            // ctx.closePath();
            drawBond(clickedX, clickedY, coords[0], coords[1]);
            hasSelected = false;
            addBond(clickedX, clickedY, coords[0], coords[1]);
            addAction('bond');
            clickedY = -1;
            clickedX = -1;
        }
        else {
            hasSelected = true;
            clickedX = coords[0];
            clickedY = coords[1];
        }
     }
}

function isLegal(x, y) {
    var valid = true;
    for (var i = 0; i < px.length; i++) {
        if (x>px[i]-r && x<px[i]+r && y<py[i]+r && y>py[i]-r) {
            valid = false;
            // alert("coordinate " + x + ", " + y + " is invalid, coordinate " + px[i] + " " + py[i] + " is too close \n"
            //      + (px[i]+r)+" "+(px[i]-r)+"            "+(py[i]+r)+" "+(py[i]-r))
        }
    }
    return valid;
}

function getNearest(x, y) {
    for (var i = 0; i < px.length; i++) {
        if ((x>px[i]-r && x<px[i]+r) && (y<py[i]+r && y>py[i]-r)) {
            return [px[i], py[i]];
        }
    }
}







        