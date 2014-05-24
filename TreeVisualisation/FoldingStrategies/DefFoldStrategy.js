"use strict";

function DefFoldStrategy (foldingLimit, isFoldablePred) {
    var mFoldingLimit = foldingLimit;
    var mIsFoldablePred = isFoldablePred;

    this.fold = function (visualNode, lastNotFolded, toFoldNum) {
        if(typeof visualNode != 'undefined' && visualNode !== null) {
            if(visualNode.getChildren().length > 1 || mIsFoldablePred(visualNode) == false) {
                if(toFoldNum >= mFoldingLimit && lastNotFolded != null) {
                    makeBranchPartInvisible(lastNotFolded, visualNode);
                }
                lastNotFolded = visualNode;
                toFoldNum = 0;
                for(var i = 0; i < visualNode.getChildren().length; ++i) {
                    this.fold(visualNode.getChildren()[i], lastNotFolded, toFoldNum);
                }
                setVertEdges(visualNode);
            } else {
                ++toFoldNum;
                this.fold(visualNode.getChildren()[0], lastNotFolded, toFoldNum);
            }
        }
    };

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

    function setVertEdges(visualNode) {
        var visualChildren = visualNode.getChildren();
        for (var j = 0; j < visualChildren.length - 1; ++j) {
            if (visualChildren[j].isVisible()) {
                CssUtils.addCssClass(visualChildren[j].getHtml(), CssClassNames.SIMPLE_VERT_EDGE);
            } else {
                CssUtils.addCssClass(visualChildren[j].getHtml(), CssClassNames.FOLDED_VERT_EDGE);
            }
        }
    }
}