"use strict";

function VisualNode (/*htmlRepr | id, childrenList, isVisible*/) {
    //public static const fields
    VisualNode.NODE_HTYPE = 'li';
    VisualNode.EDGE_PIC_ELEM_HTYPE = 'div';
    VisualNode.CONTENT_HTYPE = 'div';
    VisualNode.CONTAINER_HTYPE = 'ul';

    // constructors
    var htmlNode;
    //from htmlRepr
    if(arguments.length == 1) {
        htmlNode = arguments[0];
    }
    //new one
    if(arguments.length == 3) {
        htmlNode = createNode(arguments[0]);
        htmlNode.appendChild(document.createElement(VisualNode.EDGE_PIC_ELEM_HTYPE));
        htmlNode.appendChild(createContent());
        htmlNode.appendChild(createContainer(arguments[1]));
        if(arguments[2] == true) {
            makeVisible();
        }
        else {
            makeInvisible();
        }
    }

    this.getHtml = function () {
        return htmlNode;
    };
    this.getChildren = function () {
        var childrenInHtml = getChildrenContainer().children;
        var visualChildren = [];
        for(var i = 0; i < childrenInHtml.length; ++i) {
            visualChildren[i] = NodeVisualizer.fromHtml(childrenInHtml[i]);
        }
        return visualChildren;
    };
    this.getParent = function() {
        var nodeContainerUl = htmlNode.parentNode;
        if(nodeContainerUl !== null) {
            return NodeVisualizer.fromHtml(nodeContainerUl.parentNode);
        }
        return null;
    };
    this.getEdgePicElem = getEdgePicElem;
    this.getContent = getContent;

    this.getNodeType = function() {
        var classesStr = getContent().className;
        if(classesStr.indexOf(CssClassNames.TRANS_NODE) > -1) {
            return CssClassNames.TRANS_NODE;
        }
        return CssClassNames.SIMPLE_NODE;
    };

    this.addChild = function (child) {
        getChildrenContainer().appendChild(child.getHtml());
    };

    this.setVisible = function() {
        var edgeClass = this.getEdgePicElem().className;
        if(edgeClass.indexOf(CssClassNames.SIMPLE_EDGE) > -1 ||
           edgeClass.indexOf(CssClassNames.SIMPLE_INVISIBLE_EDGE) > -1)
        {
            setVisibilityClasses(CssClassNames.VISIBLE_CONTENT, CssClassNames.CONTAINER_SHIFTED,
                CssClassNames.SIMPLE_EDGE);
        } else {
            setVisibilityClasses(CssClassNames.VISIBLE_CONTENT, CssClassNames.CONTAINER_SHIFTED,
                CssClassNames.FOLDED_EDGE);
        }
    };
    this.setInvisible = function() {
        var edgeClass = this.getEdgePicElem().className;
        if(edgeClass.indexOf(CssClassNames.SIMPLE_EDGE) > -1 ||
           edgeClass.indexOf(CssClassNames.SIMPLE_INVISIBLE_EDGE) > -1)
        {
            setVisibilityClasses(CssClassNames.INVISIBLE_CONTENT, CssClassNames.CONTAINER_NOTSHIFTED,
                CssClassNames.SIMPLE_INVISIBLE_EDGE);
        } else {
            setVisibilityClasses(CssClassNames.INVISIBLE_CONTENT, CssClassNames.CONTAINER_NOTSHIFTED,
                CssClassNames.FOLDED_INVISIBLE_EDGE);
        }
    };

    this.equals = function(otherVisualNode) {
        return this.getHtml().className === otherVisualNode.getHtml().className;
    }

    function createNode(id) {
        var htmlNodeElem = document.createElement(VisualNode.NODE_HTYPE);
        htmlNodeElem.className = id.toString();
        return htmlNodeElem;
    }
    function createContent() {
        var contentElem = document.createElement(VisualNode.CONTENT_HTYPE);
        contentElem.className = CssClassNames.NODE_CONTENT;
        return contentElem;
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

    function getEdgePicElem() {
        return htmlNode.children[0];
    }
    function getContent() {
        return htmlNode.children[1];
    }
    function getChildrenContainer() {
        return htmlNode.children[2];
    }

    function makeVisible() {
        getContent().className += (' ' + CssClassNames.VISIBLE_CONTENT);
        getChildrenContainer().className += (' ' + CssClassNames.CONTAINER_SHIFTED);
    }

    function makeInvisible() {
        getContent().className += (' ' + CssClassNames.INVISIBLE_CONTENT);
        getChildrenContainer().className += (' ' + CssClassNames.CONTAINER_NOTSHIFTED);
    }

    function setVisibilityClasses (visibilityClass, shiftingClass, edgeClass) {
        var re = new RegExp("(^|\\s)(" + CssClassNames.INVISIBLE_CONTENT + "|" + CssClassNames.VISIBLE_CONTENT + ")(\\s|$)");
        var modifiedClassString = getContent().className.replace(re, '$1'+visibilityClass+'$3');
        getContent().className = modifiedClassString;

        re = new RegExp("(^|\\s)(" + CssClassNames.CONTAINER_SHIFTED + "|" + CssClassNames.CONTAINER_NOTSHIFTED + ")(\\s|$)");
        modifiedClassString = getChildrenContainer().className.replace(re, '$1'+shiftingClass+'$3');
        getChildrenContainer().className = modifiedClassString;

        re = new RegExp("(^|\\s)(" + CssClassNames.SIMPLE_EDGE + "|" + CssClassNames.SIMPLE_INVISIBLE_EDGE +
            "|" + CssClassNames.FOLDED_EDGE + "|" + CssClassNames.FOLDED_INVISIBLE_EDGE + ")(\\s|$)");
        modifiedClassString = getEdgePicElem().className.replace(re, '$1'+edgeClass+'$3');
        getEdgePicElem().className = modifiedClassString;
    }
}

//SimpleNode.prototype = new VisualNode();
//SimpleNode.prototype.constructor = SimpleNode;
//function SimpleNode(/*htmlRepr | childrenList, isVisible, content*/) {
//    SimpleNode.cssClass = "SimpleNode";
//
//    //constructors
//    if(arguments.length == 1) {
//        VisualNode.call(this, arguments[0])
//    }
//    else {
//        VisualNode.call(this, arguments[0], arguments[1], SimpleNode.cssClass);
//        this._setContent(arguments[2]);
//    }
//}

//FillerNode.prototype = new VisualNode();
//FillerNode.prototype.constructor = FillerNode;
//function FillerNode(/*htmlRepr | childrenList, isVisible*/) {
//    var txt = "...";
//
//    FillerNode.cssClass = "FillerNode";
//
//    //constructors
//    if(arguments.length == 1) {
//        VisualNode.call(this, arguments[0])
//    }
//    else {
//        VisualNode.call(this, arguments[0], arguments[1], FillerNode.cssClass);
//        this._setContent(txt);
//    }
//}
//
//DelimiterNode.prototype = new VisualNode();
//DelimiterNode.prototype.constructor = DelimiterNode;
//function DelimiterNode (childrenList) {
//    DelimiterNode.cssClass = 'DelimiterNode';
//
//    VisualNode.call(this, childrenList, false, DelimiterNode.cssClass);
//}