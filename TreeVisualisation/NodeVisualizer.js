"use strict";

var NodeVisualizer = {
    'createRoot' : function (rootNode, childrenList, isVisible) {
        var visualRoot = createNoEdgedNode(rootNode, childrenList, isVisible);
        visualRoot.getEdgePicElem().className = CssClassNames.SIMPLE_INVISIBLE_EDGE;
        return visualRoot;
    },

    'createSimpleNode' : function(usualNode, childrenList, isVisible) {
        var visualNode = createSimpleEdgedNode(usualNode, childrenList, isVisible);
        var contentElem = visualNode.getContent();
        contentElem.className += (' ' + CssClassNames.SIMPLE_NODE);
        return visualNode;
    },

    'createTransNode' : function(usualNode, childrenList, isVisible) {
        var visualNode = createSimpleEdgedNode(usualNode, childrenList, isVisible);
        var contentElem = visualNode.getContent();
        contentElem.className += (' ' + CssClassNames.TRANS_NODE);
        return visualNode;
    },

    'fromHtml' : function(htmlNode) {
        if(htmlNode.tagName != 'LI') {
            return null;
        }
        return new VisualNode(htmlNode);
    },

    'setUnfoldEdge' : function (visualNode) {
        var edgePicElem = visualNode.getEdgePicElem();
        clearEdgeContainer(edgePicElem);
        CssUtils.addCssClass(edgePicElem, CssClassNames.FOLDED_EDGE);
        edgePicElem.appendChild(DomElemsFactory.createUnfoldButton(visualNode.getHtml()));
    },

    'setSimpleEdge' : function (visualNode) {
        var edgePicElem = visualNode.getEdgePicElem();
        clearEdgeContainer(edgePicElem);
        CssUtils.addCssClass(edgePicElem, CssClassNames.SIMPLE_EDGE);
    },

    'setFoldEdge' : function (visualNode) {
        var edgePicElem = visualNode.getEdgePicElem();
        clearEdgeContainer(edgePicElem);
        CssUtils.addCssClass(edgePicElem, CssClassNames.UNFOLDED_EDGE);
        edgePicElem.appendChild(DomElemsFactory.createFoldButton(visualNode.getHtml()));
    }
};

function clearEdgeContainer(edgeContainer) {
    CssUtils.removeCssClass(edgeContainer, CssClassNames.SIMPLE_EDGE);
    CssUtils.removeCssClass(edgeContainer, CssClassNames.FOLDED_EDGE);
    CssUtils.removeCssClass(edgeContainer, CssClassNames.UNFOLDED_EDGE);
    var buttonsOnEdge = edgeContainer.getElementsByTagName('button');
    for(var i = 0; i < buttonsOnEdge.length; ++i) {
        edgeContainer.removeChild(buttonsOnEdge[i]);
    }
}

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
    var timeDiv = document.createElement('div');
    //timeDiv.innerText = usualNode.getTime();
    timeDiv.innerText = '15.36';
    content.appendChild(timeDiv);

    var favicon = document.createElement('img');
    favicon.src = 'http://www.google.com/s2/favicons?domain=' + usualNode.url;
    content.appendChild(favicon);

    var aElem = document.createElement('a');
    aElem.innerText = usualNode.title;
    aElem.href = usualNode.url;
    aElem.target = '_blank';
    content.appendChild(aElem);
}