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
    },

    'createTitle' : function() {
        var textDiv = document.createElement('div');
        textDiv.innerText = 'History';
        return textDiv;
    },

    'createSearchRangeText' : function() {
        var textDiv = document.createElement('div');
        textDiv.innerText = 'Search from: ';
        return textDiv;
    },

    'TIME_RANGE_SELECT_ID' : "TimeRangeSelect",
    'TIME_RANGE_SELECT_DIV_ID' : "TimeRangeSelectDiv",
    'createTimeRangeSelect' : function() {
        var select = document.createElement("SELECT");
        select.setAttribute("id", DomElemsFactory.TIME_RANGE_SELECT_ID);
        addOption(select, "from the beginning of time", "0", true);
        addOption(select, "last day", "1", false);
        addOption(select, "last week", "2", false);
        addOption(select, "last month", "3", false);
        var divContainer = document.createElement('div');
        divContainer.setAttribute("id", DomElemsFactory.TIME_RANGE_SELECT_DIV_ID);
        divContainer.appendChild(select);
        return divContainer;

        function addOption (selectObj, text, value, isDefaultSelected) {
            var option = document.createElement("option");
            option.appendChild(document.createTextNode(text));
            option.setAttribute("value", value);
            if (isDefaultSelected) {
                option.defaultSelected = true;
            }
            selectObj.appendChild(option);
        }
    },

    'SEARCH_BUTTON_ID' : "SearchButton",
    'SEARCH_FIELD_ID' : "SearchField",
    'createSearchSection' : function(searchActionHandler) {
        return {'SearchButton' : createSearchButton(), 'SearchField' : createSearchField()};

        function createSearchButton() {
            var buttonSearch = document.createElement('input');
            buttonSearch.type = "button";
            buttonSearch.id = DomElemsFactory.SEARCH_BUTTON_ID;
            buttonSearch.value = "Search";
            buttonSearch.onclick = searchActionHandler;
            return buttonSearch;
        }

        function createSearchField() {
            var textSearch = document.createElement('input');
            textSearch.type = "text";
            textSearch.id = DomElemsFactory.SEARCH_FIELD_ID;

            textSearch.onkeydown = function() {
                if (event.keyCode == 13) {
                    document.getElementById(DomElemsFactory.SEARCH_BUTTON_ID).click();
                }
            };
            return textSearch;
        }
    },

    'createClearHistoryButton' : function(deleteActionHandler) {
        var deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Clear all history...';
        deleteButton.onclick = deleteActionHandler;
        return deleteButton;
    }
};

function wrapInDiv(elem, divCssClass) {
    var divContainer = document.createElement('div');
    if(divCssClass != null) {
        divContainer.className = divCssClass;
    }
    divContainer.appendChild(elem);
    return divContainer;
}