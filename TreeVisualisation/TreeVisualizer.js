"use strict";

//static class
var TreeVisualizer = {
    'buildTree' : function (treeRoot, foldingStrategy) {
//        var treeEventsHandler = createEventsHandler();
//        var treeContainer = createVisualTree(treeRoot, foldingStrategy);
//        treeEventsHandler.appendChild(treeContainer);
//        return treeEventsHandler;
        return createVisualTree(treeRoot, foldingStrategy);

//        function createEventsHandler () {
//            var treeEventsHandler = document.createElement('div');
//            treeEventsHandler.onclick = unfoldEventHandler;
//            return treeEventsHandler;
//        }

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
    },

    'unfoldTreePart' : function (htmlNode) {
        var node = NodeVisualizer.fromHtml(htmlNode);
        NodeVisualizer.setSimpleEdge(node);
        node.setDelimiterState();
        var currentNode = node.getParent();
        while(!currentNode.isVisible()) {
            currentNode.setVisible();
            NodeVisualizer.setFoldEdge(currentNode);
            currentNode = currentNode.getParent();
        }
        currentNode.setFoldNodeState();
    },

    'foldTreePart' : function(htmlNode) {
        var current = NodeVisualizer.fromHtml(htmlNode);
        foldUp(current.getParent());
        foldDown(current);

        function foldUp(visualNode) {
            var currentNode = visualNode;
            while(!currentNode.isFoldNode()) {
                NodeVisualizer.setSimpleEdge(currentNode);
                currentNode.setInvisible();
                currentNode = currentNode.getParent();
            }
            currentNode.resetFoldNodeState();
        }

        function foldDown(visualNode) {
            var currentNode = visualNode;
            while(!currentNode.isDelimiter()) {
                NodeVisualizer.setSimpleEdge(currentNode);
                currentNode.setInvisible();
                currentNode = currentNode.getChildren()[0];
            }
            currentNode.resetDelimiterState();
            NodeVisualizer.setUnfoldEdge(currentNode);
        }
    }
};