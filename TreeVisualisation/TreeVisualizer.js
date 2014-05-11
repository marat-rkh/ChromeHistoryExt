"use strict";

//static class
var TreeVisualizer = {
    'buildTree' : function (treeRoot, foldingStrategy) {
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
    },

    'unfoldTreePart' : function (node) {
        NodeVisualizer.setSimpleEdge(node);
        node.setDelimiterState();
        var currentNode = node.getParent();
        while(!currentNode.isVisible()) {
            currentNode.setVisible();
            currentNode = currentNode.getParent();
        }
        currentNode.setFoldNodeState();
        createFoldButton(currentNode);

        function createFoldButton(node) {
            var foldButton = document.createElement('button');
            foldButton.className = CssClassNames.FOLD_BUTTON;
            foldButton.innerHTML = 'Fold';
            foldButton.onclick = TreeVisualizer.foldTreePart.bind(null, node);
            node.getContent().appendChild(foldButton);
        }
    },

    'foldTreePart' : function(node) {
        removeFoldButton(node);
        node.resetFoldNodeState();
        var currentNode = node.getChildren()[0];
        while(!currentNode.isDelimiter()) {
            currentNode.setInvisible();
            currentNode = currentNode.getChildren()[0];
        }
        currentNode.resetDelimiterState();
        NodeVisualizer.setEdgeFolded(currentNode);

        function removeFoldButton(node) {
            var foldButton = node.getContent().children[1];
            node.getContent().removeChild(foldButton);
        }
    }
};