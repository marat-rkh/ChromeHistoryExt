"use strict";

function TreeNode (parent, title, url, id) {
    this.childrenArray = [];
    this.parent = parent;
    this.title = title;
    this.url = url;
    this.id = id;

    this.equals = function (treeNode) {
        return this.id === treeNode.id;
    }
}