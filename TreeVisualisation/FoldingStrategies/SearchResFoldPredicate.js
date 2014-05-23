"use strict";

function searchResFoldPredicate(foundNodesIDs, visualNode) {
    if(visualNode.getId() in foundNodesIDs) {
        NodeVisualizer.setLinkEmphasis(visualNode);
        return false;
    }
    return defFoldPredicate(visualNode);
}