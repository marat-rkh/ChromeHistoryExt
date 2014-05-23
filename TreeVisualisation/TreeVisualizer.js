"use strict";

//static class
var TreeVisualizer = {
    'buildTree' : function (treeRoot, foldingStrategy) {
        var treeContainer = document.createElement('ul');
        var visualRoot = BFSTraverse(treeRoot);
        foldingStrategy.fold(visualRoot, null, 0);
        treeContainer.appendChild(visualRoot.getHtml());
        return treeContainer;

        function oldLinearVisTreeBuild(treeRoot) {
            var visualRoot = NodeVisualizer.createRoot(treeRoot, [], true);
            var currentVisualNode = visualRoot;
            var currentNode = treeRoot.childrenArray[0];
            while (typeof currentNode != 'undefined' && currentNode !== null) {
                var newVisualNode;
                if (isTransNode(currentNode)) {
                    newVisualNode = NodeVisualizer.createTransNode(currentNode, [], true);
                } else {
                    newVisualNode = NodeVisualizer.createSimpleNode(currentNode, [], true);
                }
                currentVisualNode.addChild(newVisualNode);
                currentVisualNode = newVisualNode;
                currentNode = currentNode.childrenArray[0];
            }
            return visualRoot;
        }

        function BFSTraverse(treeRoot) {
            var usualQueue = [];
            var visualQueue = [];
            usualQueue.push(treeRoot);
            var visualRoot = NodeVisualizer.createRoot(treeRoot, [], true);
            visualQueue.push(visualRoot);
            while(usualQueue.length > 0) {
                var currentUsualNode = usualQueue.shift();
                var currentVisualNode = visualQueue.shift();
                
                for(var i = 0; i < currentUsualNode.childrenArray.length; ++i) {
                    var newVisualChild;
                    if(isTransNode(currentUsualNode.childrenArray[i])) {
                        newVisualChild = NodeVisualizer.createTransNode(currentUsualNode.childrenArray[i], [], true);
                    } else {
                        newVisualChild = NodeVisualizer.createSimpleNode(currentUsualNode.childrenArray[i], [], true);
                    }
                    
                    currentVisualNode.addChild(newVisualChild);
                    usualQueue.push(currentUsualNode.childrenArray[i]);
                    visualQueue.push(newVisualChild);
                }
                
                var liChildren = currentVisualNode.getLIChildren();
                for(var i=0; i < liChildren.length - 1; i++) {
                  CssUtils.addCssClass( liChildren[i] , ' ' + CssClassNames.LEFT_VERT_LINE);
                }             
                 
            }
            return visualRoot;
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
