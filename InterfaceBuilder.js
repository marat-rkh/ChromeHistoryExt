var InterfaceBuilder = {
    'searchFieldID' : 'SearchField',
    'buildSearchForm' : function (parentDomElement) {
        var titleText = document.createElement('div');
        titleText.innerText = 'History';

        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = InterfaceBuilder.searchFieldID;
//        inputText.className = CssClassNames.

        var searchButton = document.createElement('input');
        searchButton.type = 'button';
        searchButton.value = 'Search';
        searchButton.onclick = handleSearchAction;

        var searchFieldContainer = document.createElement('div');
        searchFieldContainer.className = CssClassNames.SEARCH_FIELD_CONTAINER;
        searchFieldContainer.appendChild(titleText);
        searchFieldContainer.appendChild(inputText);
        searchFieldContainer.appendChild(searchButton);
        parentDomElement.appendChild(searchFieldContainer);
    },

    'historyContainerID' : 'HistoryContainer',
    "buildHistoryArea" : function(parentDomElement, isSearched, rawNodes) {
        var historyContainer = document.createElement('div');
        historyContainer.id = InterfaceBuilder.historyContainerID;
        historyContainer.className = CssClassNames.HISTORY_DIV;
        var dateBuf = null;
        var roots = ForestBuilder(rawNodes);

        for(var i = roots.length-1; i >= 0; i--) {
            if(dateBuf != roots[i].getDate()) {
                dateBuf = roots[i].getDate();
                var dayStrElem = DomElemsFactory.createDateString(dateBuf);
                historyContainer.appendChild(dayStrElem);
            }

            var foldStrategy;
            if(isSearched) {
                foldStrategy = null; // SearchStrategy must be here
            } else {
                foldStrategy = new DefaultStrategy(4, 2); //hardcoded values !!!!!!!!!!
            }
            var visualTree = TreeVisualizer.buildTree(roots[i], foldStrategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    },

    'removeHistoryArea' : function(parentDomElement) {
        var historyContainer = document.getElementById(InterfaceBuilder.historyContainerID);
        parentDomElement.removeChild(historyContainer);
    }
};