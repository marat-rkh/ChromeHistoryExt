"use strict";

//static class
var TreeVisualizer = {
    'buildTree' : function (treeRoot, foldingStrategy) {
        var treeContainer = document.createElement('ul');
        var visualRoot = BFSTraverse(treeRoot);
        foldingStrategy.fold(visualRoot, null, 0);
        treeContainer.appendChild(visualRoot.getHtml());
        return treeContainer;

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
        TreeVisualizer.setVertEdges(currentNode);
    },

    'foldTreePart' : function(htmlNode) {
        var current = NodeVisualizer.fromHtml(htmlNode);
        foldDown(current);
        foldUp(current.getParent());

        function foldUp(visualNode) {
            var currentNode = visualNode;
            while(!currentNode.isFoldNode()) {
                NodeVisualizer.setSimpleEdge(currentNode);
                currentNode.setInvisible();
                currentNode = currentNode.getParent();
            }
            currentNode.resetFoldNodeState();
            TreeVisualizer.setVertEdges(currentNode);
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
    },

    'setVertEdges' : function (visualNode) {
        var visualChildren = visualNode.getChildren();
        if(typeof visualChildren != 'undefined' && visualChildren !== null) {
            for (var j = 0; j < visualChildren.length - 1; ++j) {
                if (visualChildren[j].isVisible()) {
                    setVertEdgeCssClass(visualChildren[j], CssClassNames.SIMPLE_VERT_EDGE);
                } else {
                    setVertEdgeCssClass(visualChildren[j], CssClassNames.FOLDED_VERT_EDGE);
                }
            }
        }

        function setVertEdgeCssClass(visualNode, cssClassName) {
            CssUtils.removeCssClass(visualNode.getHtml(), CssClassNames.SIMPLE_VERT_EDGE);
            CssUtils.removeCssClass(visualNode.getHtml(), CssClassNames.FOLDED_VERT_EDGE);
            CssUtils.addCssClass(visualNode.getHtml(), cssClassName);
        }
    }
};
