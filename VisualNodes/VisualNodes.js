"use strict";
// Visual nodes
function VisualNode () {
    this._drawBasic = function (cell, txt) {
        cell.innerHTML = txt;
    }
}

SimpleNode.prototype = new VisualNode();
function SimpleNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
    };

    var txt = "node";
}

FoldedNode.prototype = new VisualNode();
function FoldedNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
        cell.onclick = function() {
            alert("unfolded");
        };
    };

    var txt = "...";
}

LinkNode.prototype = new VisualNode();
function LinkNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
    };

    var txt = "\\";
}

//Tree visualizer
function TreeVisualizer () {
    this.drawIn = function (tab, y0, x0, nodes) {
        for (var i = 0; i < nodes.length; i++, y0++, x0++) {
            var currentCell = tab.rows[y0].cells[x0];
            nodes[i].drawIn(currentCell);
        };
    }
}

function drawSomeTree() {
    var tab = document.getElementById('myTable');
    var nodes = [new SimpleNode, new FoldedNode, new SimpleNode, new LinkNode, new SimpleNode];
    var treeVisualizer = new TreeVisualizer();
    treeVisualizer.drawIn(tab, 0, 0, nodes);
}

window.onload = function() {
    drawSomeTree();
};