"use strict";

function VisualTreeBuilder () {
    var treeContainer = document.createElement('ul');
    var leaf = new SimpleNode();
    var root = new SimpleNode([leaf]);
    treeContainer.appendChild(root.getHtml());

    this.getHtml = function () {
        return treeContainer;
    }
}