// add the event listener to the document
document.addEventListener("DOMContentLoaded", init, false);
var px = [0]; // keep track of the x position of all sugars on the canvas
var py = [0]; // keep track of the y position of all sugars on the canvas

var r = 20; // radius of shaps
var clickedX = -1; // tracks the x position of the last clicked shape on the canvas
var clickedY = -1; // tracks the y position of hte last clicked shape on the canvas

/*
Initialize the event listener 
*/
function init() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

/*
Gets the position of a click event on the canvas 
*/
function getPosition(event) {
    var x = new Number(); // x position of click
    var y = new Number(); // y position of click
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

    // adjust for location of the canvas on the page
    x -= canvas.offsetLeft; 
    y -= canvas.offsetTop;

    // decision process for click events
    if (isLegal(x, y)) { // ensure space is not occupied
        drawShape(getName(), x, y, r/2) 
        // store x and y location of the sugar
        px.push(x);
        py.push(y);
        // add the sugar and action to the undo stack
        addSugar(getName(), x, y);
        addAction('sugar');

        // reset the clicked location to unclicked
        clickedY = -1;
        clickedX = -1;
     }
    else { // if the space is occupied, need to draw a bond
        var coords = getNearest(x, y); // find the nearest sugar to the spot clicked

        // if another sugar has already been clicked, a bond will be drawn from that sugar to this sugar
        if (clickedX >= 0) {
            drawBond(clickedX, clickedY, coords[0], coords[1]); // draws a bond between two sugars
            addBond(clickedX, clickedY, coords[0], coords[1]); // adds the bond to a list of current bonds
            addAction('bond'); // updates the last action to be the addition of a bond

            // reset the clicked location to unclicked
            clickedY = -1;
            clickedX = -1;
        }
        // if the is the first sugar clicked, its location will be stored incase another sugar is clicked
        else {
            clickedX = coords[0];
            clickedY = coords[1];
        }
     }
}

/*
Determines if a given location is already occupied

Parameters
    - x : The x coordinate of the most recent click
    - y : The y coordinate of the most recent click
*/
function isLegal(x, y) {
    var valid = true;
    for (var i = 0; i < px.length; i++) {
        // checks if x and y are both within the radius of another sugar
        if (x>px[i]-r && x<px[i]+r && y<py[i]+r && y>py[i]-r) {
            valid = false;
            break;
        }
    }
    return valid;
}

/*
Finds the nearest sugar to the given point

Parameters:
    - x : The x coordinate of the most recent click
    - y : The y coordinate of the most recent click
*/
function getNearest(x, y) {
    for (var i = 0; i < px.length; i++) {
        // checks if x and y are both within the radius of another sugar
        if ((x>px[i]-r && x<px[i]+r) && (y<py[i]+r && y>py[i]-r)) {
            return [px[i], py[i]];
        }
    }
}

function popXY() {
    px.pop();
    py.pop();
}

function clearXY() {
    px = [];
    py = [];
}




        