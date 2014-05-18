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

    //public methods
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
        if(CssUtils.elemHasClass(this.getContent(), CssClassNames.TRANS_NODE)) {
            return CssClassNames.TRANS_NODE;
        }
        return CssClassNames.SIMPLE_NODE;
    };

    this.getId = function() {
        return this.getHtml().className;
    };

//    this.getEdgeType = function() {
//        if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_EDGE)) {
//            return CssClassNames.SIMPLE_EDGE;
//        } else if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_INVISIBLE_EDGE)) {
//            return CssClassNames.SIMPLE_INVISIBLE_EDGE;
//        } else if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.FOLDED_EDGE)) {
//            return CssClassNames.FOLDED_EDGE;
//        } else if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.FOLDED_INVISIBLE_EDGE)) {
//            return CssClassNames.FOLDED_INVISIBLE_EDGE;
//        }
//        return null;
//    };

    this.addChild = function (child) {
        getChildrenContainer().appendChild(child.getHtml());
    };

    this.setVisible = function() {
        var classToReplace = CssClassNames.INVISIBLE_CONTENT + "|" + CssClassNames.VISIBLE_CONTENT;
        CssUtils.changeCssClass(this.getContent(), classToReplace, CssClassNames.VISIBLE_CONTENT);
        classToReplace = CssClassNames.CONTAINER_SHIFTED + "|" + CssClassNames.CONTAINER_NOTSHIFTED;
        CssUtils.changeCssClass(getChildrenContainer(), classToReplace, CssClassNames.CONTAINER_SHIFTED);
        classToReplace = CssClassNames.SIMPLE_EDGE + "|" + CssClassNames.SIMPLE_INVISIBLE_EDGE +
                         "|" + CssClassNames.FOLDED_EDGE + "|" + CssClassNames.FOLDED_INVISIBLE_EDGE;
        if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_EDGE) ||
           CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_INVISIBLE_EDGE))
        {
            CssUtils.changeCssClass(getEdgePicElem(), classToReplace, CssClassNames.SIMPLE_EDGE);
        } else {
            CssUtils.changeCssClass(getEdgePicElem(), classToReplace, CssClassNames.FOLDED_EDGE);
        }
    };
    this.setInvisible = function() {
        var classToReplace = CssClassNames.INVISIBLE_CONTENT + "|" + CssClassNames.VISIBLE_CONTENT;
        CssUtils.changeCssClass(this.getContent(), classToReplace, CssClassNames.INVISIBLE_CONTENT);
        classToReplace = CssClassNames.CONTAINER_SHIFTED + "|" + CssClassNames.CONTAINER_NOTSHIFTED;
        CssUtils.changeCssClass(getChildrenContainer(), classToReplace, CssClassNames.CONTAINER_NOTSHIFTED);
        classToReplace = CssClassNames.SIMPLE_EDGE + "|" + CssClassNames.SIMPLE_INVISIBLE_EDGE +
            "|" + CssClassNames.FOLDED_EDGE + "|" + CssClassNames.FOLDED_INVISIBLE_EDGE;
        if(CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_EDGE) ||
            CssUtils.elemHasClass(this.getEdgePicElem(), CssClassNames.SIMPLE_INVISIBLE_EDGE))
        {
            CssUtils.changeCssClass(getEdgePicElem(), classToReplace, CssClassNames.SIMPLE_INVISIBLE_EDGE);
        } else {
            CssUtils.changeCssClass(getEdgePicElem(), classToReplace, CssClassNames.FOLDED_INVISIBLE_EDGE);
        }
    };
    this.isVisible = function() {
        return CssUtils.elemHasClass(this.getContent(), CssClassNames.VISIBLE_CONTENT);
    };

    this.setFoldNodeState = function() {
        if(!CssUtils.elemHasClass(this.getContent(), CssClassNames.FOLD_NODE_STATE)) {
            CssUtils.addCssClass(this.getContent(), CssClassNames.FOLD_NODE_STATE);
        }
    };
    this.resetFoldNodeState = function() {
        CssUtils.removeCssClass(this.getContent(), CssClassNames.FOLD_NODE_STATE);
    };
    this.isFoldNode = function() {
        return CssUtils.elemHasClass(this.getContent(), CssClassNames.FOLD_NODE_STATE);
    };

    this.setDelimiterState = function() {
        if(!CssUtils.elemHasClass(this.getContent(), CssClassNames.DELIMITER_STATE)) {
            CssUtils.addCssClass(this.getContent(), CssClassNames.DELIMITER_STATE);
        }
    };
    this.resetDelimiterState = function() {
        CssUtils.removeCssClass(this.getContent(), CssClassNames.DELIMITER_STATE);
    };
    this.isDelimiter = function() {
        return CssUtils.elemHasClass(this.getContent(), CssClassNames.DELIMITER_STATE);
    };

    this.equals = function(otherVisualNode) {
        return this.getHtml().className === otherVisualNode.getHtml().className;
    };

    //private section
    function getEdgePicElem() {
        return htmlNode.children[0];
    }
    function getContent() {
        return htmlNode.children[1];
    }
    function getChildrenContainer() {
        return htmlNode.children[2];
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

    function makeVisible() {
        CssUtils.addCssClass(getContent(), CssClassNames.VISIBLE_CONTENT);
        CssUtils.addCssClass(getChildrenContainer(), CssClassNames.CONTAINER_SHIFTED);
    }
    function makeInvisible() {
        CssUtils.addCssClass(getContent(), CssClassNames.INVISIBLE_CONTENT);
        CssUtils.addCssClass(getChildrenContainer(), CssClassNames.CONTAINER_NOTSHIFTED);
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