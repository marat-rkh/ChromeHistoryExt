"use strict";

function searchResFoldPredicate(foundNodesIDs, visualNode) {
    if(visualNode.getId() in foundNodesIDs) {
        visualNode.setEmphasisedLinkState();
        return false;
    }
    return defFoldPredicate(visualNode);
}