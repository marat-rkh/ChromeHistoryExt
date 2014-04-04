"use strict";

function drawSomeTree() {
    var visualTreeBuilder = new VisualTreeBuilder();
    document.body.appendChild(visualTreeBuilder.getHtml());
}

window.onload = function() {
    drawSomeTree();
};