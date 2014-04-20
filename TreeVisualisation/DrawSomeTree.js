"use strict";

function drawSomeTree() {

    var visualTree = TreeVisualizer.buildTree(TwoBranches(), 6);
    document.body.appendChild(visualTree);
}

function Branch4 () {
    return new TreeNode([new TreeNode([new TreeNode([new TreeNode([], 1, "1")], 2, "2")], 3, "3")], 4, "4");
}

function Branch5 () {
    return new TreeNode([new TreeNode([new TreeNode([new TreeNode([new TreeNode([], 1, "1")], 2, "2")], 3, "3")], 4, "4")], 5, "5");
}

function TwoBranches () {
    var br1 = new TreeNode([new TreeNode([new TreeNode([new TreeNode([], 1, "1")], 2, "2")], 3, "3")], 4, "4");
    var br2 = new TreeNode([new TreeNode([new TreeNode([], 1, "8")], 2, "9")], 3, "10");
    return new TreeNode([new TreeNode([new TreeNode([br1, br2], 5, "5")], 6, "6")], 7, "7");
}

window.onload = function() {
    drawSomeTree();
};