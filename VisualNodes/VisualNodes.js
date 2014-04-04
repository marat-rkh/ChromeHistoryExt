"use strict";

function VisualNode () {
    // constructor
    var htmlNode = document.createElement('li');
    htmlNode.appendChild(createContent());
    htmlNode.appendChild(createContainer());

    //public
    this.getHtml = function () {
        return htmlNode;
    }

    //protected
    this._setContent = function(txt) {
        return htmlNode.children[0].innerText = txt;
    }

    this._setChildren = function(childrenList) {
        if(typeof childrenList !== "undefined") {
            for(var i = 0; i < childrenList.length; i++) {
                var cld = childrenList[i].getHtml();
                htmlNode.children[1].appendChild(cld);
            }
        }
    }

    //private
    function createContent () {
        return document.createElement('div');
    }

    function createContainer () {
        return document.createElement('ul');
    }

    function container () {
        return htmlNode.children[1];
    }
}

SimpleNode.prototype = new VisualNode();
function SimpleNode(childrenList) {
    //private
    var txt = "node";

    //constructor
    this._setContent(txt);
    this._setChildren(childrenList);
}

FoldedNode.prototype = new VisualNode();
function FoldedNode(childrenList) {
    var txt = "...";

    //constructor
    this._setContent(txt);
    this._setChildren(childrenList);
}

LinkNode.prototype = new VisualNode();
function LinkNode(childrenList) {
    var txt = "\\";

    //constructor
    this._setContent(txt);
    this._setChildren(childrenList);
}