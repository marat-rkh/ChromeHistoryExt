var DomElemsFactory = {
    'createUnfoldButton' : function(htmlNode) {
        var unfoldButton = document.createElement('button');
        unfoldButton.className = CssClassNames.UNFOLD_BUTTON;
        unfoldButton.onclick = TreeVisualizer.unfoldTreePart.bind(null, htmlNode);
        return unfoldButton;
    },

    'createFoldButton' : function(htmlNode) {
        var unfoldButton = document.createElement('button');
        unfoldButton.className = CssClassNames.FOLD_BUTTON;
        unfoldButton.onclick = TreeVisualizer.foldTreePart.bind(null, htmlNode);
        return unfoldButton;
    }
};