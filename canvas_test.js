
// get the canvas
var my_canvas = document.getElementById("canvas");
var context = my_canvas.getContext("2d");

// The following variables are all used as stacks for the undo function
var locs = []; // stores the location of all sugars on the canvas
var names = []; // stores the name of each sugar on the canvas
var parentBonds = []; // stores location of one endpoint of a bond
var childBonds = []; // stores the location of the other endpoint of a bond
var lastAction = []; // stores the last action made

var name = 'MannoseSq'; // name of the current selected molecule
backgroundGrid(1000,700, 20); // draws the grid on the canvas

/*
Adds a sugar to the stacks that maintain sugar locations and names on the canvas
*/
function addSugar(name, x, y) {
	locs.push([x, y]);
	names.push(name);
}
/*
Adds a bond to the stacks that maintain bond locations on the canvas
*/
function addBond(px, py, cx, cy) {
	parentBonds.push([px, py]);
	childBonds.push([cx, cy]);
}

/*
Adds the last action to the lastAction stack
*/
function addAction(action) {
	if (action === 'sugar') {
		lastAction.push('sugar');
	}
	else {
		lastAction.push('bond');
	}
}

/*
Clears all the stacks to reset the canvas
*/
function clearScreen() {
	locs = [];
	names = [];
	parentBonds = [];
	childBonds = [];
	lastAction = [];
	undo();
	clearXY();
}

/*
Undoes the user's last action, removing either a sugar or a bond
*/
function undo() {
	var action = lastAction.pop(); // determine if the last action placed a sugar or bond
	// if sugar, remove last sugar's data
	if (action === 'sugar' && names.length !== 0) {
		locs.pop();
		names.pop();
		popXY();
	}
	// if bond, remove last bond's data
	else {
		if (parentBonds.length !== 0) {
			parentBonds.pop();
			childBonds.pop();
		}
	}

	// reset the canvas by drawing a clear rectangle and redoing the grid
	context.clearRect(0, 0, my_canvas.width, my_canvas.height);
	backgroundGrid(1000,700, 20);

	// redraw all remaining sugars
	for (var i = 0; i < locs.length; i++) {
		drawShape(names[i], locs[i][0], locs[i][1], 10);
	}
	// redraw all remaining bonds 
	for (var i = 0; i < parentBonds.length; i++) {
		drawBond(parentBonds[i][0], parentBonds[i][1], childBonds[i][0], childBonds[i][1]);
	};
}

/*
Draw a bond from one sugar to another sugar
*/
function drawBond(px, py, cx, cy) {
	context.beginPath();
    context.moveTo(px, py);
    context.lineTo(cx, cy);
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
}

/*
Draw a sugar depending on the currently selected sugar name

used a switch statement to allow all sugars to be drawn with a single function
call depening on the input provided to the function.
*/
function drawShape(name, x, y, r) {
	context.lineWidth = 1;
	switch (name) {
		case 'ManA':
			context.beginPath()
			context.moveTo(x,y+r);
			context.lineTo(x,y-r);
			context.lineTo(x+r,y);
			context.lineTo(x,y+r);
			context.fillStyle="56E87D";
			context.fill();
			context.lineTo(x-r,y);
			context.lineTo(x,y-r);
			context.stroke()
			context.closePath()
			break;
		case 'Fucose':
			context.beginPath()
			context.moveTo(x+r, y+r)
			context.lineTo(x, y-r)
			context.lineTo(x-r, y+r)
			context.lineTo(x+r, y+r)
			context.fillStyle = "red";
			context.fill()
			context.stroke()
			context.closePath()
			break;
		case 'NeuAc':
			context.beginPath()
			context.moveTo(x,y+r);
			context.lineTo(x+r,y);
			context.lineTo(x,y-r);
			context.lineTo(x-r,y);
			context.lineTo(x,y+r);
			context.fillStyle="E359F0";
			context.fill();
			context.stroke()
			context.closePath()
			break;
		case 'NeuGc':
			context.beginPath()
			context.moveTo(x,y+r);
			context.lineTo(x+r,y);
			context.lineTo(x,y-r);
			context.lineTo(x-r,y);
			context.lineTo(x,y+r);
			context.fillStyle="C7E9ED";
			context.fill();
			context.stroke()
			context.closePath()
			break;
		case 'KDN':
			context.beginPath()
			context.moveTo(x,y+r);
			context.lineTo(x+r,y);
			context.lineTo(x,y-r);
			context.lineTo(x-r,y);
			context.lineTo(x,y+r);
			context.fillStyle="89F5BF";
			context.fill();
			context.stroke()
			context.closePath()
			break;
		case 'MannoseDi':
			context.beginPath();
			context.moveTo(x-r,y-r);
			context.lineTo(x+r,y+r);
			context.lineTo(x+r, y-r);
			context.lineTo(x-r,y-r);

			context.fillStyle="56E87D";
			context.fill();

			context.lineTo(x-r,y+r);
			context.lineTo(x+r,y+r);

			context.stroke();
			context.closePath();
			break;
		case 'MannoseCi':
			context.beginPath();
			context.arc(x, y, r, 0, 2*Math.PI);
			context.fillStyle="56E87D";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'MannoseSq':
			context.beginPath();
			context.moveTo(x+r,y+r);
			context.lineTo(x-r,y+r);
			context.lineTo(x-r,y-r);
			context.lineTo(x+r,y-r);
			context.lineTo(x+r,y+r);

			context.fillStyle="56E87D";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'GlucoseDi':
			context.beginPath();
			context.moveTo(x-r,y-r);
			context.lineTo(x+r,y+r);
			context.lineTo(x+r, y-r);
			context.lineTo(x-r,y-r);

			context.fillStyle="blue";
			context.fill();

			context.lineTo(x-r,y+r);
			context.lineTo(x+r,y+r);

			context.stroke();
			context.closePath();
			break;
		case 'GlucoseCi':
			context.beginPath();
			context.arc(x, y, r, 0, 2*Math.PI);
			context.fillStyle="blue";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'GlucoseSq':
			context.beginPath();
			context.moveTo(x+r,y+r);
			context.lineTo(x-r,y+r);
			context.lineTo(x-r,y-r);
			context.lineTo(x+r,y-r);
			context.lineTo(x+r,y+r);

			context.fillStyle="blue";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'GalactoseDi':
			context.beginPath();
			context.moveTo(x-r,y-r);
			context.lineTo(x+r,y+r);
			context.lineTo(x+r, y-r);
			context.lineTo(x-r,y-r);

			context.fillStyle="yellow";
			context.fill();

			context.lineTo(x-r,y+r);
			context.lineTo(x+r,y+r);

			context.stroke();
			context.closePath();
			break;
		case 'GalactoseCi':
			context.beginPath();
			context.arc(x, y, r, 0, 2*Math.PI);
			context.fillStyle="yellow";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'GalactoseSq':
			context.beginPath();
			context.moveTo(x+r,y+r);
			context.lineTo(x-r,y+r);
			context.lineTo(x-r,y-r);
			context.lineTo(x+r,y-r);
			context.lineTo(x+r,y+r);

			context.fillStyle="yellow";
			context.fill();
			context.stroke();
			context.closePath();
			break;
		case 'GalA':
			context.beginPath()
			context.moveTo(x,y+r);
			context.lineTo(x,y-r);
			context.lineTo(x-r,y);
			context.lineTo(x,y+r);
			context.fillStyle="yellow";
			context.fill();
			context.lineTo(x+r,y);
			context.lineTo(x,y-r);
			context.stroke()
			context.closePath()
			break;
		case 'IdoA':
			context.beginPath();
			context.moveTo(x+r, y);
			context.lineTo(x-r, y);
			context.lineTo(x,y+r);
			context.lineTo(x+r, y);

			context.fillStyle="tan";
			context.fill();

			context.lineTo(x, y-r);
			context.lineTo(x-r, y);

			context.stroke();
			context.closePath();
			break;
		case 'GlcA':
			context.beginPath();
			context.moveTo(x+r, y);
			context.lineTo(x-r, y);
			context.lineTo(x,y-r);
			context.lineTo(x+r, y);

			context.fillStyle="blue";
			context.fill();

			context.lineTo(x, y+r);
			context.lineTo(x-r, y);

			context.stroke();
			context.closePath();
			break;
		case 'Xylose':
			context.beginPath()
			context.moveTo(x,y-r);
			context.lineTo(x-r/4, y-r/4);
			context.lineTo(x-r, y-r/4);
			context.lineTo(x-r/3, y+r/6);
			context.lineTo(x-2*r/3, y+r);
			context.lineTo(x, y+r/3);
			context.lineTo(x+2*r/3, y+r);
			context.lineTo(x+r/3, y+r/6);
			context.lineTo(x+r, y-r/4);
			context.lineTo(x+r/4, y-r/4);
			context.lineTo(x, y-r);
			context.fillStyle="F2DCB8";
			context.fill();
			context.stroke();
			context.closePath();
			break;
	}
}

/*
Allows the listener to get the name of the currently selected molecule
*/
function getName() {
	return name;
}

/*
Allows html buttons to be used to change the name of the current sugar
*/
function setName(n) {
	name = n;
}

//###############################################################################
//###############################################################################


/*
Draws the grid on the canvas
*/
function backgroundGrid (width, height, space) {
	var rows = height/space;
	var cols = width/space;
	context.lineWidth = 1;
	context.beginPath();
	for (i = 0; i < rows; i++) {
		context.moveTo(0, i*space);
		context.lineTo(width,i*space);
	}
	for (j = 0; j < cols; j++) {
		context.moveTo(j*space, 0);
		context.lineTo(j*space, height);
	}
	context.strokeStyle="C9C8CC"; // makes the grid gray
	context.stroke();
	context.closePath();
}


//////////////////////////
// Molecule Object
//////////////////////////

/*
The Sugar class represents a single sugar that the user placed on the canvas. Used to
encode the image drawn by the user into an ID string that can be input to a SQL database.

Glycomic molcules will be represented as directed graphs, thus each sugar will have incoming
and outgoing bonds/edges.

A sugar object knows what type of sugar it is (name), the type of bonds it has 
(inBonds and outBounds), and which sugars it shares bonds with (adj).
*/
function Sugar(name) {
    this.n = name;
    this.bonds = [null, null, null, null, null, null];
    this.adj = [null, null, null, null, null, null];
}

/*
idstring function generates the id string for the sugar 
*/
Sugar.prototype.idstring = function() {
    bondCount = 0; 
    bondType = []; // used to generate the id string
    for (var i = 0; i < this.bonds.length; i++) {
        if (this.bonds[i]) { // if there is a bond in this position
            bondCount += 1;
            bondType.push(this.bonds[i] + str(i+1));
        }
    }
    string = str(bondCount) + this.n; // add number of bonds and sugar name to string
    for (var b = 0; b < bondType.length; b++) { 
        string += bondType[b]; // add bond name and position to id string 
    }
    string += '-'; // use a dash to separate bonds from sugars
    return string;

    //final output looks like "2ManAalpha1beta2-"
}

/*
The molecule class stores sugars in a directed graph/tree structure
*/
function Molecule() {
    
    this.root = null;
    this.ident = "";
}

/*
Adds a root to the graph - the root must be added because the user decides what sugar
will be at the root of their molecule.
*/
Molecule.prototype.addRoot = function(sugar) {
    this.root = sugar;
};

/*
Adds a bond between two sugars

It doesn't matter which sugar is the parent and which is the child, the direction
of the bond is handeled when the ID for the molecule is generated.
*/
Molecule.prototype.addBond = function (parent, child, pos, bond) {
    parent.adj[pos] = child;
    parent.bonds[pos] = bond;
};

/*
Generates the ID of the molecule using a recursive helper that performs 
a pre order traversal of the molecule.
*/
Molecule.prototype.genId = function () {
    this.genIdHelper(this.root, 7);
    return this.ident;
};

/*
Helper function that generates the ID of the molecule 
*/
Molecule.prototype.genIdHelper = function (node, inBond) {
    this.ident += node.idString(); // add the current node's ID string to the molecule ID
    hasChild = false; 
    for (var i = 0; i < node.adj.length; i++) { // for every potential node adjacent to the current node
        if (node.adj[i] && i != inBond) { // if the adjacent node exists and is not the parent
            hasChild = true;
            this.genIdHelper(node.adj[i], i); // recursive case
        }
    }
    if (!hasChild){ // if the node is a leaf, indicate the branch is done with a '/'
        this.ident += '/';
    }
}





