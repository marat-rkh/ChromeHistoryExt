"use strict";

function VisualTreeBuilder () {
    var treeEventsHandler = createEventsHandler();
    var treeContainer = createTree();
    treeEventsHandler.appendChild(treeContainer);

    this.getHtml = function () {
        return treeEventsHandler;
    }

    function createEventsHandler () {
        var treeEventsHandler = document.createElement('div');
        treeEventsHandler.onclick = nodeFoldUnfoldHandler;
        return treeEventsHandler;
    }

    function createTree () {
        var treeContainer = document.createElement('ul');
        var leaf = new SimpleNode();
        var inner1 = new FoldedNode([leaf]);
        var leaf2 = new SimpleNode();
        var inner2 = new SimpleNode([leaf2]);
        var inner3 = new FoldedNode([inner2])
        var root = new SimpleNode([inner1, inner3]);
        treeContainer.appendChild(root.getHtml());
        return treeContainer;
    }
}