"use strict";

function VisualNode (childrenList, isVisible) {
    // constructor
    var htmlNode = document.createElement('li');
    htmlNode.appendChild(createContent());
    htmlNode.appendChild(createContainer(childrenList));
    if(isVisible) {
        makeVisible();
    }
    else {
        makeInvisible();
    }

    //public
    this.getHtml = function () {
        return htmlNode;
    }

    this.addChild = function (child) {
        htmlNode.children[1].appendChild(child.getHtml());
    }

    //protected
    this._setContent = function(txt) {
        return htmlNode.children[0].innerText = txt;
    }

    this._addCSSClassName = function (clsName) {
        htmlNode.children[0].className += (" " + clsName);
    }

    //private
    function createContent () {
        var content = document.createElement('div');
        content.className = "Content";
        return content
    }

    function createContainer (childrenList) {
        var container = document.createElement('ul');
        if(typeof childrenList !== "undefined") {
            for(var i = 0; i < childrenList.length; i++) {
                var cld = childrenList[i].getHtml();
                container.appendChild(cld);
            }
        }
        return container;
    }

    function makeVisible() {
        htmlNode.children[0].className = "NodeContentVisible";
        htmlNode.children[1].className = "ContainerShifted"
    }

    function makeInvisible() {
        htmlNode.children[0].className = "NodeContentInvisible";
        htmlNode.children[1].className = "ContainerNotShifted"
    }
}

SimpleNode.prototype = new VisualNode();
SimpleNode.prototype.constructor = SimpleNode;
function SimpleNode(childrenList, isVisible, content) {
    //private
    var txt = "node";

    //constructor
    VisualNode.call(this, childrenList, isVisible);
    this._setContent(content);
}

FoldedNode.prototype = new VisualNode();
SimpleNode.prototype.constructor = FoldedNode;
function FoldedNode(childrenList, isVisible) {
    var txt = "...";

    //constructor
    VisualNode.call(this, childrenList, isVisible);
    this._setContent(txt);
}