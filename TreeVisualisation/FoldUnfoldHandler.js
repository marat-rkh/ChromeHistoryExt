"use strict";

function nodeFoldUnfoldHandler(event) {
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if(!elemHasClass(clickedElem, FillerNode.cssClass)) {
        return;
    }
    var fillerNode = new FillerNode(clickedElem.parentNode);
    TreeVisualizer.unfoldTreePart(fillerNode);
}