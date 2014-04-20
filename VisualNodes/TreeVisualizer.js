"use strict";

function VisualTreeBuilder (treeRoot, maxLength) {
    var treeEventsHandler = createEventsHandler();
    var treeContainer = createVisualTree(treeRoot, maxLength);
    treeEventsHandler.appendChild(treeContainer);

    this.getHtml = function () {
        return treeEventsHandler;
    }

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
                    newVisualNode = new SimpleNode([], true, currentNode.childrenArray[0].name);
                    buildVisualTree(currentNode.childrenArray[0], newVisualNode, maxLength - 1, false);
                }
                else {
                    if(!foldingInProcess) {
                        var newFoldedChild = new SimpleNode([], false, currentNode.childrenArray[0].name);
                        newVisualNode = new FoldedNode([newFoldedChild], true);
                        buildVisualTree(currentNode.childrenArray[0], newFoldedChild, maxLength - 1, true);
                    }
                    else {
                        newVisualNode = new SimpleNode([], false, currentNode.childrenArray[0].name);
                        buildVisualTree(currentNode.childrenArray[0], newVisualNode, maxLength, true);
                    }
                }
                currentVisualNode.addChild(newVisualNode);  
            }



            // for (var i = 0; i < currentNode.children.length; i++) {
            //     var newVisualNode;
            //     if(currentNode.children[i].branchLength <= maxLength) {
            //         newVisualNode = new SimpleNode([], VisualNode.VISIBLE_CLASS);
            //         buildVisualTree(currentNode.children[i], newVisualNode, )
            //     }
            //     var newVisualNode = createVisualNode(currentNode.children[i], fold);
            //     if(fold) {
            //         folded = folded + 1;
            //     }
            //     buildVisualTree(currentNode, newVisualNode, maxLength - folded);
            //     currentVisualNode.addChild(newVisualNode);
            // };

        }
    }

    //not implemented yet
    function isTransitional(treeNode) {
        return false;
    }

    function hasManyChildren(treeNode) {
        return treeNode.childrenArray.length > 1;
    }

    // function  buildNoFoldingVisualTree (treeRoot, visualTreeRoot) {
    //     if(treeRoot.childrenArray.length != 0) {
    //         for (var i = 0; i < treeRoot.childrenArray.length; i++) {
    //             var newNode = new SimpleNode([], VisualNode.VISIBLE_CLASS);
    //             buildVisualTree(treeRoot.childrenArray[i], newNode);
    //             visualTreeRoot.addChild(newNode);
    //         }
    //     }
    // }
}