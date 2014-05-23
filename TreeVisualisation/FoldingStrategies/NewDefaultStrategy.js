"use strict";

//function NewDefaultStrategy (maxWidth, transQueueSize) {
//    var branchMaxLength = maxWidth - 1;
//    var mTransQueueSize = transQueueSize;
//    var transQueue = [];
//    var freshHistQueue = [];
//
//    this.fold = function (visualNode) {
//        if(typeof visualNode != 'undefined' && visualNode !== null && visualNode.getChildren().length != 0) {
//            newFillQueues(visualNode);
//            makeFolded(visualNode);
//        }
//    };
//
//    function fillQueues(root) {
//        var currentNode = root.getChildren()[0];
//        while (typeof currentNode != 'undefined' && currentNode !== null) {
//            freshHistQueue.push(currentNode);
//            while (transQueue.length + freshHistQueue.length > branchMaxLength) {
//                var headOfFresh = freshHistQueue.shift();
//                if (headOfFresh.getNodeType() === CssClassNames.TRANS_NODE) {
//                    transQueue.push(headOfFresh);
//                    if (transQueue.length > mTransQueueSize) {
//                        transQueue.shift();
//                    }
//                }
//            }
//            currentNode = currentNode.getChildren()[0];
//        }
//    }
//
//    function newFillQueues(root) {
//        var currentNode = root;
//        while (currentNode.getChildren().length != 0) {
//            var currentParams = getCurrentStrategyParams();
//            for (var i = currentNode.getChildren().length - 1; i > 0; --i) {
//                var localFoldStrategy = new NewDefaultStrategy(currentParams['restWidth'], currentParams['restTransQueueSize']);
//                localFoldStrategy.fold(currentNode.getChildren()[i]);
//            }
//            currentNode = currentNode.getChildren()[0];
//            freshHistQueue.push(currentNode);
//            while (transQueue.length + freshHistQueue.length > branchMaxLength) {
//                var headOfFresh = freshHistQueue.shift();
//                if (headOfFresh.getNodeType() === CssClassNames.TRANS_NODE) {
//                    transQueue.push(headOfFresh);
//                    if (transQueue.length > mTransQueueSize) {
//                        transQueue.shift();
//                    }
//                }
//            }
//        }
//    }
//
//    function getCurrentStrategyParams() {
//        var restWidth = Math.max(2, branchMaxLength - transQueue.length + freshHistQueue.length);
//        var restTransQueueSize = Math.max(0, mTransQueueSize - transQueue.length);
//        return {'restWidth' : restWidth, 'restTransQueueSize' : restTransQueueSize };
//    }
//
//    function makeFolded(root) {
//        if (foldingHappened(root)) {
//            var headOfFresh = freshHistQueue[0];
//            var firstVisibleParent = (transQueue.length == 0) ? root : transQueue[transQueue.length - 1];
//            makeBranchPartInvisible(firstVisibleParent, headOfFresh);
//            for (var i = transQueue.length - 1; i > 0; --i) {
//                makeBranchPartInvisible(transQueue[i - 1], transQueue[i]);
//            }
//            if (transQueue.length > 0 && !transQueue[0].getParent().equals(root)) {
//                makeBranchPartInvisible(root, transQueue[0]);
//            }
//        }
//    }
//
//    function foldingHappened(root) {
//        return !freshHistQueue[0].getParent().equals(root) || transQueue.length != 0;
//    }
//
//    function makeBranchPartInvisible(endNode, startNode) {
//        if(startNode.getParent().equals(endNode)) {
//            return;
//        }
//        NodeVisualizer.setUnfoldEdge(startNode);
//        var currentNode = startNode.getParent();
//        var prevNode = startNode;
//        while(!currentNode.equals(endNode)) {
//            makeSubtreeInvisible(currentNode, prevNode);
//            prevNode = currentNode;
//            currentNode = currentNode.getParent();
//        }
//    }
//
//    function makeSubtreeInvisible(root, childToSkip) {
//        for(var i = 0; i < root.getChildren().length; ++i) {
//            if(childToSkip == null || !root.getChildren()[i].equals(childToSkip)) {
//                makeSubtreeInvisible(root.getChildren()[i], null);
//            }
//        }
//        root.setInvisible();
//    }
//}