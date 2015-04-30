
class Sugar:

	def __init__(self, name):
		self.name = name
		self.bonds = [None, None, None, None, None, None]
		self.adj = [None, None, None, None, None, None]

	def id_string(self):
		bondCount = 0
		bondType = []
		for i in xrange(len(self.bonds)):
			if self.bonds[i]:
				bondCount += 1
				bondType.append(self.bonds[i] + str(i+1))
		string = str(bondCount) + self.name
		for bond in bondType:
			string += bond
		string += '-'
		return string

	def __str__(self):
		return self.name 

class Glycome:

	def __init__(self):
		self.root = None
		self.id = ""

	def add_root(self, sugar):
		self.root = sugar

	def add_bond(self, parent, child, pos, bond):
		parent.adj[pos] = child
		parent.bonds[pos] = bond

	def gen_id(self):
		self.gen_id_helper(self.root)
		return self.id

	def gen_id_helper(self, node):
		self.id += node.id_string()
		hasChild = False
		for i in xrange(len(node.adj)):
			if node.adj[i]:
				hasChild = True
				self.gen_id_helper(node.adj[i])
		if not hasChild:
			self.id += '/'

	def __str__(self):
		full = self.root.name
		que = []
		que.append(self.root)
		while len(que) > 0:
			node = que.pop(0)
			end = True
			for i in xrange(6):
				if node.adj[i]:
					full += "-" + node.bonds[i] + str(i) + "-" + node.adj[i].name
					que.append(node.adj[i])
					end = False
			if end:
				full += "/"
		return full


def main():
	lst = []
	a = Sugar('one')
	b = Sugar('two')
	c = Sugar('three')
	d = Sugar('four')
	e = Sugar('five')
	f = Sugar('six')

	lst.append(a)
	lst.append(b)
	lst.append(c)
	lst.append(d)
	lst.append(e)
	lst.append(f)

	tree = Glycome()

	tree.add_root(a)
	tree.add_bond(lst[0], lst[1], 0, 'a')
	tree.add_bond(lst[0], lst[2], 4, 'b')
	tree.add_bond(lst[1], lst[3], 2, 'a')
	tree.add_bond(lst[1], lst[4], 5, 'b')
	tree.add_bond(lst[3], lst[5], 1, 'a')
	print tree
	print 
	print tree.gen_id()


main()


