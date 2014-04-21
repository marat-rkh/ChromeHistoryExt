"use strict";

//static class
var TreeVisualizer;

//methods
var buildTree = function (treeRoot, maxLength) {
    var treeEventsHandler = createEventsHandler();
    var treeContainer = createVisualTree(treeRoot, maxLength);
    treeEventsHandler.appendChild(treeContainer);
    return treeEventsHandler;

    function createEventsHandler () {
        var treeEventsHandler = document.createElement('div');
        treeEventsHandler.onclick = nodeFoldUnfoldHandler;
        return treeEventsHandler;
    }

    function createVisualTree (treeRoot, maxLength) {
        var treeContainer = document.createElement('ul');

        var visualTreeRoot = new SimpleNode([], true, treeRoot.name);
        buildVisualTree(treeRoot, visualTreeRoot, maxLength - 1, false);
        //var visualTreeRoot = new SimpleNode([new SimpleNode([new SimpleNode([], true)], true)], true);

        treeContainer.appendChild(visualTreeRoot.getHtml());
        return treeContainer;
    }

    function buildVisualTree (treeRoot, visualTreeRoot, maxLength, foldingInProcess) {
        var currentNode = treeRoot;
        var currentVisualNode = visualTreeRoot;

        if(typeof currentNode.childrenArray !== "undefined" && currentNode.childrenArray.length > 0) {
            if(hasManyChildren(currentNode)) {
                if(foldingInProcess) {
                    var delimitterNode = new DelimitterNode([]);
                    currentVisualNode.addChild(delimitterNode);
                    currentVisualNode = delimitterNode;
                }
                for (var i = 0; i < currentNode.childrenArray.length; i++) {
                    var newVisualNode = new SimpleNode([], true, currentNode.childrenArray[i].name);
                    buildVisualTree(currentNode.childrenArray[i], newVisualNode, maxLength - 1, false);
                    currentVisualNode.addChild(newVisualNode);
                }
            }
            else {
                var newVisualNode;
                if(isTransitional(currentNode.childrenArray[0]) ||
                   hasManyChildren(currentNode.childrenArray[0]) ||
                   currentNode.childrenArray[0].branchLength <= maxLength) 
                {
                    if(foldingInProcess) {
                        var delimitterNode = new DelimitterNode([]);
                        currentVisualNode.addChild(delimitterNode);
                        currentVisualNode = delimitterNode;
                    }
                    newVisualNode = new SimpleNode([], true, currentNode.childrenArray[0].name);
                    buildVisualTree(currentNode.childrenArray[0], newVisualNode, maxLength - 1, false);
                }
                else {
                    if(!foldingInProcess) {
                        var newFoldedChild = new SimpleNode([], false, currentNode.childrenArray[0].name);
                        newVisualNode = new FillerNode([newFoldedChild], true);
                        buildVisualTree(currentNode.childrenArray[0], newFoldedChild, maxLength - 1, true);
                    }
                    else {
                        newVisualNode = new SimpleNode([], false, currentNode.childrenArray[0].name);
                        buildVisualTree(currentNode.childrenArray[0], newVisualNode, maxLength, true);
                    }
                }
                currentVisualNode.addChild(newVisualNode);  
            }
        }
    }

    //not implemented yet
    function isTransitional(treeNode) {
        return false;
    }

    function hasManyChildren(treeNode) {
        return treeNode.childrenArray.length > 1;
    }
}

var unfoldTreePart = function (node) {
    if(node instanceof DelimitterNode) {
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