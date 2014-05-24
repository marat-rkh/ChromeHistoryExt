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
    }
};