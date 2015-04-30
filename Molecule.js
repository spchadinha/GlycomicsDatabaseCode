
function Sugar(name) {
    this.n = name;
    this.bonds = [null, null, null, null, null, null];
    this.adj = [null, null, null, null, null, null];
}

Sugar.prototype = {

    constructor Sugar,

    idString: function () {
        bondCount = 0;
        bondType = [];
        for i in xrange(this.bonds.length):
            if this.bonds[i]:
                bondCount += 1;
                bondType.push(this.bonds[i] + str(i+1));
        string = str(bondCount) + this.n;
        for bond in bondType:
            string += bond;
        string += '-';
        return string;
    }
};

function Molecule() {
    
    this.root = null;
    this.ident = "Molecule: ";
}

Molecule.prototype = {

    //restore constructor
    constructor: Molecule,
    
    addRoot: function (sugar) {
        this.root = sugar;
    }

    addBond: function (parent, child, pos, bond) {
        parent.adj[pos] = child;
        parent.bonds[pos] = bond;
    }

    genId: function () {
        this.genIdHelper(this.root);
        return this.ident;
    }

    genIdHelper: function (node) {
        this.ident += node.idString();
        hasChild = false;
        for i in xrange(node.adj.length):
            if node.adj[i]:
                hasChild = true;
                this.genIdHelper(node.adj[i]);
        if not hasChild:
            this.ident += '/';
    }

    printName: function () {
        return this.ident;
    }
};
