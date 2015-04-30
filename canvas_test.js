var my_canvas = document.getElementById("canvas");
var context = my_canvas.getContext("2d");

var locs = [];
var names = [];
var parentBonds = [];
var childBonds = [];
var lastAction = [];

var name = 'MannoseSq';
backgroundGrid(1000,700, 20);
//var userInput = Molecule()
// var mol = new Object()

function addSugar(name, x, y) {
	locs.push([x, y]);
	names.push(name);
}

function addBond(px, py, cx, cy) {
	parentBonds.push([px, py]);
	childBonds.push([cx, cy]);
}

function addAction(action) {
	if (action === 'sugar') {
		lastAction.push('sugar');
	}
	else {
		lastAction.push('bond');
	}
}

function clearScreen() {
	console.log("doing the things")
	locs = [];
	names = [];
	parentBonds = [];
	childBonds = [];
	lastAction = [];
	undo();
	console.log("finished the things")
}

function undo() {
	var action = lastAction.pop();
	//alert(action);
	if (action === 'sugar' && names.length !== 0) {
		//alert(names);
		locs.pop();
		names.pop();
		alert(names);
	}
	else {
		if (parentBonds.length !== 0) {
			alert(parentBonds);
			parentBonds.pop();
			childBonds.pop();
			alert(parentBonds);
		}
	}
	context.clearRect(0, 0, my_canvas.width, my_canvas.height);
	backgroundGrid(1000,700, 20);

	for (var i = 0; i < locs.length; i++) {
		drawShape(names[i], locs[i][0], locs[i][1], 10);
	};
	//alert(parentBonds[0][0] + "-" + parentBonds[0][1]);
	for (var i = 0; i < parentBonds.length; i++) {
		alert(i);
		// context.lineWidth = 1;
		// context.beginPath();
		// context.moveTo(parentBonds[i][0], parentBonds[i][1]);
		// context.lineTo(childBonds[i][0], childBonds[i][1]);
		// context.stroke();
		// context.closePath();

		drawBond(parentBonds[i][0], parentBonds[i][1], childBonds[i][0], childBonds[i][1]);
	};
}

function drawBond(px, py, cx, cy) {
	context.beginPath();
    context.moveTo(px, py);
    context.lineTo(cx, cy);
    context.lineWidth = 3;
    context.stroke();
    context.closePath();
}

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

function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.closePath();

}

function getName() {
	//alert("name currently is: " + name)
	return name;
}

function setName(n) {
	name = n;
	//alert("name has been changed to: " + name)
}

// function molName() {
// 	return userInput.printName();
// }

// function getObj() {
// 	return mol;
// }

//###############################################################################
//###############################################################################


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
	context.strokeStyle="C9C8CC";
	context.stroke();
	context.closePath();
	//context.endPath();
}

function highlight (x, y, r) {
	context.beginPath();
	context.arc(x, y, r, 0, 2*Math.PI);
	context.fillStyle="rgba(100, 100, 100, 0.3)";
	context.fill();
	context.stroke();
	context.closePath();
}

//////////////////////////
// Molecule Object
//////////////////////////

// function Sugar(name) {
//     this.n = name;
//     this.bonds = [null, null, null, null, null, null];
//     this.adj = [null, null, null, null, null, null];
// }

// Sugar.prototype = {

//     constructor Sugar,

//     idString: function () {
//         bondCount = 0;
//         bondType = [];
//         for i in xrange(this.bonds.length):
//             if this.bonds[i]:
//                 bondCount += 1;
//                 bondType.push(this.bonds[i] + str(i+1));
//         string = str(bondCount) + this.n;
//         for bond in bondType:
//             string += bond;
//         string += '-';
//         return string;
//     }
// }

// function Molecule() {
    
//     this.root = null;
//     this.ident = "";
// }

// Molecule.prototype = {

//     //restore constructor
//     constructor: Molecule,
    
//     addRoot: function (sugar) {
//         this.root = sugar;
//     }

//     addBond: function (parent, child, pos, bond) {
//         parent.adj[pos] = child;
//         parent.bonds[pos] = bond;
//     }

//     genId: function () {
//         this.genIdHelper(this.root);
//         return this.ident;
//     }

//     genIdHelper: function (node) {
//         this.ident += node.idString();
//         hasChild = false;
//         for i in xrange(node.adj.length):
//             if node.adj[i]:
//                 hasChild = true;
//                 this.genIdHelper(node.adj[i]);
//         if not hasChild:
//             this.ident += '/';
//     }
// }


