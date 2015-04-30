# GlycomicsDatabaseCode
This repository contains the code for the Davidson College glycomics database pilot. At the creation of the repository - all code was written by Spencer Chadinha


The purpose of this code is to explore intuitive human computer interaction methods that allow
chemists to easily search glycomic molecules by drawing them on the screen using a universal 
nomenclature.

As of 4-29-2015 Spencer Chadinha is the author of code in this repository

canvas_listener : a listener for the canvas in canvas_test.html

canvas_test.css : css stylings for canvas_test.html

canvas_test.html : webpage containing the interactive canvas element 

canvas_test.js : javascript code that interacts with the canvas element in canvas_test.html, allowing the user to draw molecules, undo actions, and clear the canvas

Molecule.js : contains a Sugar and a Molecule object. Eventually, these objects will be incorporated into the code in canvas_test.js - making managing the canvas object oriented and easier to maintain/update. Currently, it is unknown if these objects behave as intended

treetest.py : a working implementation of the Sugar and Molecule objects in python