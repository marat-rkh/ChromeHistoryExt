"use strict";

//static class
var NodeVisualizer;

//methods
var createRoot = function (rootNode, childrenList, isVisible) {
    return createNoEdgedNode(rootNode, childrenList, isVisible);
};

var createSimpleNode = function(usualNode, childrenList, isVisible) {
    var visualNode = createSimpleEdgedNode(usualNode, childrenList, isVisible);
    var contentElem = visualNode.getContent();
    contentElem.className += (' ' + CssClassNames.SIMPLE_NODE);
    return visualNode;
};

var createTransNode = function(usualNode, childrenList, isVisible) {
    var visualNode = createSimpleEdgedNode(usualNode, childrenList, isVisible);
    var contentElem = visualNode.getContent();
    contentElem.className += (' ' + CssClassNames.TRANS_NODE);
    return visualNode;
};

var fromHtml = function(htmlNode) {
    if(htmlNode.tagName != 'LI') {
        return null;
    }
    return new VisualNode(htmlNode);
};

var setEdgeFolded = function (visualNode) {
    var edgePicElem = visualNode.getEdgePicElem();
    CssUtils.changeCssClass(edgePicElem, CssClassNames.SIMPLE_EDGE, CssClassNames.FOLDED_EDGE);
};

var setSimpleEdge = function (visualNode) {
    var edgePicElem = visualNode.getEdgePicElem();
    CssUtils.changeCssClass(edgePicElem, CssClassNames.FOLDED_EDGE, CssClassNames.SIMPLE_EDGE);
};

function createSimpleEdgedNode(usualNode, childrenList, isVisible) {
    var visualNode = createNoEdgedNode(usualNode, childrenList, isVisible);
    var edgePicElem = visualNode.getEdgePicElem();
    edgePicElem.className = CssClassNames.SIMPLE_EDGE;
    return visualNode;
}

function createNoEdgedNode (usualNode, childrenList, isVisible) {
    var visualNode = new VisualNode(usualNode.id, childrenList, isVisible);
    var content = visualNode.getContent();
    fillVisualNodeContent(usualNode, content);
    return visualNode;
}

function fillVisualNodeContent(usualNode, content) {
    var aElem = document.createElement('a');
    aElem.innerText = usualNode.title;
    aElem.href = usualNode.url;
    content.appendChild(aElem);
}

//set class methods
NodeVisualizer = {
    'createRoot' : createRoot,
    'createSimpleNode' : createSimpleNode,
    'createTransNode' : createTransNode,
    'fromHtml' : fromHtml,
    'setEdgeFolded' : setEdgeFolded,
    'setSimpleEdge' : setSimpleEdge
};