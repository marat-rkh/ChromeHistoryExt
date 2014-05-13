var InterfaceBuilder = {
    'searchFieldID' : 'SearchField',
    'buildSearchForm' : function (parentDomElement) {
        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = InterfaceBuilder.searchFieldID;

        var searchButton = document.createElement('input');
        searchButton.type = 'button';
        searchButton.value = 'Search';
        searchButton.onclick = handleSearchAction;

        var searchFieldContainer = document.createElement('div');
        searchFieldContainer.className = CssClassNames.SEARCH_FIELD_CONTAINER;
        searchFieldContainer.appendChild(inputText);
        searchFieldContainer.appendChild(searchButton);
        parentDomElement.appendChild(searchFieldContainer);
    },

    'buildInitialHistoryArea' : function(parentDomElement, rawNodes) {
        var historyContainer = document.createElement('div');
        var dateBuf = null;
        var roots = ForestBuilder(rawNodes);

        for(var i = roots.length-1; i >= 0; i--) {
            if(dateBuf != roots[i].getDate()) {
                dateBuf = roots[i].getDate();
                var dayStrElem = document.createElement('div');
                dayStrElem.innerText = dateBuf;
                historyContainer.appendChild(dayStrElem);
            }

            var defStrategy = new DefaultStrategy(4, 2); //hardcoded values !!!!!!!!!!
            var visualTree = TreeVisualizer.buildTree(roots[i], defStrategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    }
};