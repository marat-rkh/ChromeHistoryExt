"use strict";

function VisualNode (/*htmlRepr | childrenList, isVisible, contentClass*/) {
    //public static const fields
    VisualNode.HTYPE = 'li';
    VisualNode.CONTENT_HTYPE = 'div';
    VisualNode.CONTAINER_HTYPE = 'ul';

    VisualNode.VISIBLE_CLASS = 'NodeContentVisible';
    VisualNode.INVISIBLE_CLASS = 'NodeContentInvisible';
    VisualNode.CONTAINER_SHIFTED_CLASS = 'ContainerShifted';
    VisualNode.CONTAINER_NOTSHIFTED_CLASS = 'ContainerNotShifted';

    // constructors
    var htmlNode;
    //from htmlRepr
    if(arguments.length == 1) {
        htmlNode = arguments[0];
    }
    //new one
    if(arguments.length == 3) {
        htmlNode = document.createElement(VisualNode.HTYPE);
        htmlNode.appendChild(createContent(arguments[2]));
        htmlNode.appendChild(createContainer(arguments[0]));
        if(arguments[1] == true) {
            makeVisible();
        }
        else {
            makeInvisible();
        }
    }

    //public
    this.getHtml = function () {
        return htmlNode;
    }
    this.addChild = function (child) {
        htmlNode.children[1].appendChild(child.getHtml());
    }
    this.getChildren = function () {
        return htmlNode.children[1].children;
    }

    this.setVisible = function() {
        setVisibilityClasses(VisualNode.VISIBLE_CLASS, VisualNode.CONTAINER_SHIFTED_CLASS);
    }
    this.setInvisible = function() {
        setVisibilityClasses(VisualNode.INVISIBLE_CLASS, VisualNode.CONTAINER_NOTSHIFTED_CLASS);
    }

    //protected
    this._setContent = function(txt) {
        return htmlNode.children[0].innerText = txt;
    }

    //private
    function createContent (contentClass) {
        var content = document.createElement(VisualNode.CONTENT_HTYPE);
        content.className = contentClass;
        return content;
    }

    function createContainer (childrenList) {
        var container = document.createElement(VisualNode.CONTAINER_HTYPE);
        if(typeof childrenList !== "undefined") {
            for(var i = 0; i < childrenList.length; i++) {
                var cld = childrenList[i].getHtml();
                container.appendChild(cld);
            }
        }
        return container;
    }

    function getChildrenContainer() {
        return htmlNode.children[1];
    }

    function getContent() {
        return htmlNode.children[0];
    }

    function makeVisible() {
        getContent().className += (' ' + VisualNode.VISIBLE_CLASS);
        getChildrenContainer().className += " ContainerShifted"
    }

    function makeInvisible() {
        getContent().className += (' ' + VisualNode.INVISIBLE_CLASS);
        getChildrenContainer().className += " ContainerNotShifted"
    }

    function setVisibilityClasses (visibilityClass, shiftingClass) {
        var re = new RegExp("(^|\\s)(" + VisualNode.INVISIBLE_CLASS + "|" + VisualNode.VISIBLE_CLASS + ")(\\s|$)");
        var modifiedClassString = getContent().className.replace(re, '$1'+visibilityClass+'$3');
        getContent().className = modifiedClassString;
        re = new RegExp("(^|\\s)(" + VisualNode.CONTAINER_SHIFTED_CLASS + "|" + VisualNode.CONTAINER_NOTSHIFTED_CLASS + ")(\\s|$)");
        modifiedClassString = getChildrenContainer().className.replace(re, '$1'+shiftingClass+'$3');
        getChildrenContainer().className = modifiedClassString;
    }
}

SimpleNode.prototype = new VisualNode();
SimpleNode.prototype.constructor = SimpleNode;
function SimpleNode(/*htmlRepr | childrenList, isVisible, content*/) {
    SimpleNode.cssClass = "SimpleNode";

    //constructors
    if(arguments.length == 1) {
        VisualNode.call(this, arguments[0])
    }
    else {
        VisualNode.call(this, arguments[0], arguments[1], SimpleNode.cssClass);
        this._setContent(arguments[2]);
    }
}

FillerNode.prototype = new VisualNode();
FillerNode.prototype.constructor = FillerNode;
function FillerNode(/*htmlRepr | childrenList, isVisible*/) {
    var txt = "...";

    FillerNode.cssClass = "FillerNode";

    //constructors
    if(arguments.length == 1) {
        VisualNode.call(this, arguments[0])
    }
    else {
        VisualNode.call(this, arguments[0], arguments[1], FillerNode.cssClass);
        this._setContent(txt);
    }
}

DelimitterNode.prototype = new VisualNode();
DelimitterNode.prototype.constructor = DelimitterNode;
function DelimitterNode (childrenList) {
    DelimitterNode.cssClass = 'DelimitterNode';

    VisualNode.call(this, childrenList, false, DelimitterNode.cssClass);
}

function nodeFromHtml(htmlNode) {
    if(htmlNode.tagName != 'LI') {
        return;
    }
    if(elemHasClass(htmlNode.children[0], SimpleNode.cssClass)) {
        return new SimpleNode(htmlNode);
    }
    if(elemHasClass(htmlNode.children[0], FillerNode.cssClass)) {
        return new FillerNode(htmlNode);
    }
    if(elemHasClass(htmlNode.children[0], DelimitterNode.cssClass)) {
        return new DelimitterNode([]);
    }
}