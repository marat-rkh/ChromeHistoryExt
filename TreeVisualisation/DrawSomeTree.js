"use strict";

function drawSomeTree() {
    var defStrategy = new DefaultStrategy(4, 3);
    var visualTree = TreeVisualizer.buildTree(Branch(), defStrategy);
    document.body.appendChild(visualTree);
}

function Branch () {
    var root = new TreeNode(null, 'rt', 'http://vk.com', 1);
    var inner1 = new TreeNode(root, 'inner1', 'http://vk.com', 2);
    root.childrenArray = [inner1];
    var inner2 = new TreeNode(inner1, 'inner2', 'http://vk.com', 3);
    inner1.childrenArray = [inner2];
    var inner3 = new TreeNode(inner2, 'inner3', 'http://vk.com', 4);
    inner2.childrenArray = [inner3];
    var leaf = new TreeNode(inner3, 'leaf', 'http://vk.com', 5);
    inner3.childrenArray = [leaf];
    return root;
}

window.onload = function() {
    drawSomeTree();
};