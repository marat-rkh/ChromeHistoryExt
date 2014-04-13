"use strict";

function VisualNode () {
    // constructor
    var htmlNode = document.createElement('li');
    htmlNode.className = "Node";
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

    this._setCSSClassName = function (clsName) {
        htmlNode.children[0].className += (" " + clsName);
    }

    //private
    function createContent () {
        var content = document.createElement('div');
        content.className = "Content";
        return content
    }

    function createContainer () {
        var container = document.createElement('ul');
        return container;
    }
}

SimpleNode.prototype = new VisualNode();
function SimpleNode(childrenList) {
    //private
    var txt = "node";
    var cssClassName = "Simple"

    //constructor
    VisualNode.call(this, childrenList);
    this._setContent(txt);
    this._setChildren(childrenList);
    this._setCSSClassName(cssClassName);
}

FoldedNode.prototype = new VisualNode();
function FoldedNode(childrenList) {
    var txt = "...";
    var cssClassName = "Folded"

    //constructor
    VisualNode.call(this, childrenList);
    this._setContent(txt);
    this._setChildren(childrenList);
    this._setCSSClassName(cssClassName);
}