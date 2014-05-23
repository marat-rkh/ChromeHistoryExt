"use strict";

function defFoldPredicate(visualNode) {
    if(typeof visualNode == 'undefined' || visualNode === null) {
        return false;
    }
    if(visualNode.getParent() == null) {
        return false;
    }
    if(visualNode.getChildren().length == 0) {
        return false;
    }
    if(visualNode.getNodeType() === CssClassNames.TRANS_NODE) {
        return false;
    }
    return true;
}