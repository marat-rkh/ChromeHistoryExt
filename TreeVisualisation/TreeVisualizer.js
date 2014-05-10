"use strict";

//static class
var TreeVisualizer;

//methods
var buildTree = function (treeRoot, foldingStrategy) {
    var treeEventsHandler = createEventsHandler();
    var treeContainer = createVisualTree(treeRoot, foldingStrategy);
    treeEventsHandler.appendChild(treeContainer);
    return treeEventsHandler;

    function createEventsHandler () {
        var treeEventsHandler = document.createElement('div');
        treeEventsHandler.onclick = nodeFoldUnfoldHandler;
        return treeEventsHandler;
    }

    function createVisualTree (treeRoot, foldingStrategy) {
        var treeContainer = document.createElement('ul');

        var visualRoot = NodeVisualizer.createRoot(treeRoot, [], true);
        var currentVisualNode = visualRoot;
        var currentNode = treeRoot.childrenArray[0];
        while(typeof currentNode != 'undefined' && currentNode !== null) {
            var newVisualNode;
            if(isTransNode(currentNode)) {
                newVisualNode = NodeVisualizer.createTransNode(currentNode, [], true);
            } else {
                newVisualNode = NodeVisualizer.createSimpleNode(currentNode, [], true);
            }
            currentVisualNode.addChild(newVisualNode);
            currentVisualNode = newVisualNode;
            currentNode = currentNode.childrenArray[0];
        }
        foldingStrategy.fold(visualRoot);

        treeContainer.appendChild(visualRoot.getHtml());
        return treeContainer;
    }

    function isTransNode(usualNode) {
        if(usualNode.parent !== null) {
            var nodeHrefElem = toHrefElem(usualNode.url);
            var parentHrefElem = toHrefElem(usualNode.parent.url);
            return nodeHrefElem.hostname !== parentHrefElem.hostname;
        }
        return false;
    }

    function toHrefElem(url) {
        var hrefElem = document.createElement("a");
        hrefElem.href = url;
        return hrefElem;
    }
}

var unfoldTreePart = function (node) {
    if(node instanceof DelimiterNode) {
        return;
    }
    if(node instanceof FillerNode) {
        node.setInvisible();
    }
    else if(node instanceof SimpleNode) {
        node.setVisible();
    }
    for(var i = 0; i < node.getChildren().length; i++) {
        unfoldTreePart(nodeFromHtml(node.getChildren()[i]));
    }
}

//set class methods
TreeVisualizer = {
    'buildTree' : buildTree,
    'unfoldTreePart' : unfoldTreePart
}