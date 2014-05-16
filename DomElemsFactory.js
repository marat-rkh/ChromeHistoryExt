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
    },

    'createDateString' : function(date) {
        var dayStrElem = document.createElement('div');
        dayStrElem.innerText = date;
        dayStrElem.className = CssClassNames.DATE_STR;
        return dayStrElem;
    }
};