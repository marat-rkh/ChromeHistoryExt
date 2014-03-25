"use strict";

function drawSomeTree() {
    var tab = document.getElementById('myTable');
    var nodes = [new SimpleNode, new FoldedNode, new SimpleNode, new LinkNode, new SimpleNode];
    var treeVisualizer = new TreeVisualizer();
    treeVisualizer.drawIn(tab, 0, 0, nodes);
}

window.onload = function() {
    drawSomeTree();
};