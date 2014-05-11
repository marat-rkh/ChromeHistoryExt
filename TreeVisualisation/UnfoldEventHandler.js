"use strict";

function unfoldEventHandler(event) {
    event = event || window.event;
    var clickedElem = event.target || event.srcElement;

    if(CssUtils.elemHasClass(clickedElem, CssClassNames.FOLDED_EDGE)) {
        var nodeWithFoldedEdge = NodeVisualizer.fromHtml(clickedElem.parentNode);
        TreeVisualizer.unfoldTreePart(nodeWithFoldedEdge);
    }
}