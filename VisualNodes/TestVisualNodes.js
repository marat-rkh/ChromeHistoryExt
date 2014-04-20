"use strict";

function drawSomeTree() {

    var root = new TreeNode([new TreeNode([new TreeNode([new TreeNode([new TreeNode([], 1, "1")], 2, "2")], 3, "3")], 4, "4")], 5, "5");
    //var root = new TreeNode([new TreeNode([new TreeNode([new TreeNode([], 1)], 2)], 3)], 4);

    var visualTreeBuilder = new VisualTreeBuilder(root, 4);
    
    document.body.appendChild(visualTreeBuilder.getHtml());
}

window.onload = function() {
    drawSomeTree();
};