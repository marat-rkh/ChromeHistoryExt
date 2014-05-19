"use strict";

function SearchResultStrategy (maxWidth, foundNodesIds) {
    var branchMaxLength = maxWidth - 1;
    var nodesQueue = [];
    var foundNodesIdsMap = foundNodesIds;
    var leaf;

    this.fold = function(visualNode) {
        if(typeof visualNode != 'undefined' && visualNode !== null && visualNode.getChildren().length != 0) {
            var root = visualNode;
            var currentNode = root;
            while(typeof currentNode.getChildren()[0] != 'undefined' && currentNode.getChildren()[0] !== null) {
                currentNode = currentNode.getChildren()[0];
            }
            var leaf = currentNode;
            if(root.equals(leaf)) {
                root.setInvisible();
            } else {
                makeBranchPartInvisible(root, leaf);
                root.setInvisible();
                leaf.setInvisible();
            }
        }
    };

//    this.fold = function (visualNode) {
//        if(typeof visualNode != 'undefined' && visualNode !== null && visualNode.getChildren().length != 0) {
//            fillQueue(visualNode);
//            makeFolded(visualNode);
//        }
//    };

    function fillQueue(root) {
        var currentNode = root.getChildren()[0];
        while (typeof currentNode.getChildren()[0] != 'undefined' && currentNode.getChildren()[0] !== null) {
            if(currentNode.getId() in foundNodesIdsMap) {
                nodesQueue.push(currentNode);
            }
            currentNode = currentNode.getChildren()[0];
        }
        leaf = currentNode;
    }

    function makeFolded(root) {
        if(nodesQueue.length != 0) {
            var last = nodesQueue[nodesQueue.length - 1];
            makeBranchPartInvisible(last, leaf);
            for (var i = nodesQueue.length - 1; i > 0; --i) {
                makeBranchPartInvisible(nodesQueue[i - 1], nodesQueue[i]);
            }
            makeBranchPartInvisible(root, nodesQueue[0]);
        } else {
            if(root.equals(leaf)) {
                root.setInvisible();
            } else {
                makeBranchPartInvisible(root, leaf);
                leaf.setInvisible();
                root.setInvisible();
            }
        }
    }

    function makeBranchPartInvisible(endNode, startNode) {
        if(startNode.getParent().equals(endNode)) {
            return;
        }
        NodeVisualizer.setUnfoldEdge(startNode);
        var currentNode = startNode.getParent();
        while(!currentNode.equals(endNode)) {
            currentNode.setInvisible();
            currentNode = currentNode.getParent();
        }
    }
}