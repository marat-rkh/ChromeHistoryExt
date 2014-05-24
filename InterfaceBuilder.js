function InterfaceBuilder() {
    InterfaceBuilder.HISTORY_CONTAINER_ID = 'HistoryContainer';

    var searchFieldHeight;
    var roots = null;
    var foundIDs = null;

    this.buildTitleForm = function (parentDomElement) {
//        var textSearch = document.createElement('input');
//        textSearch.type = "text";
//        textSearch.id = InterfaceBuilder.searchFieldID;
//
//        textSearch.onkeydown = function() {
//            if (event.keyCode == 13) {
//                document.getElementById('btnSearch').click();
//            }
//        };
//
//        var buttonSearch = document.createElement('input');
//        buttonSearch.type="button";
//        buttonSearch.id = 'btnSearch';
//        buttonSearch.value="Search";
//        buttonSearch.onclick= this.foundHandler;

//        var titleText = document.createElement('div');
//        titleText.innerText = 'History';

//        var searchRangeText = document.createElement('div');
//        searchRangeText.innerText = 'Search from: ';

//        var deleteButton = document.createElement('input');
//        deleteButton.type = 'button';
//        deleteButton.value = 'Delete all history';
//        deleteButton.onclick = this.deleteHandler;

        var titleContainer = document.createElement('div');
        titleContainer.className = CssClassNames.TITLE_AREA_CONTAINER;

        titleContainer.appendChild(DomElemsFactory.createTitle());
        titleContainer.appendChild(DomElemsFactory.createSearchRangeText());
        titleContainer.appendChild(DomElemsFactory.createTimeRangeSelect());
        var searchSection = DomElemsFactory.createSearchSection(this.foundHandler.bind(this));
        titleContainer.appendChild(searchSection["SearchField"]);
        titleContainer.appendChild(searchSection["SearchButton"]);
        titleContainer.appendChild(DomElemsFactory.createClearHistoryButton(this.deleteHandler.bind(this)));

        parentDomElement.appendChild(titleContainer);
        searchFieldHeight = titleContainer.offsetHeight;
    };

    this.deleteHandler = function() {
        if (confirm("Are you sure you want to delete all history?")) {
           chrome.history.deleteAll(function(){});
           window.localStorage.clear();
        } 
    };

    var buildInitialHistoryArea = function(parentDomElement, rawNodes) {
        roots = ForestBuilder(rawNodes);
        drawForest(parentDomElement, false);
    };

    var drawForest = function(parentDomElement, flagFoundStrategy) {
        var historyContainer = document.createElement('div');
        var histContainerHeight = window.innerHeight - searchFieldHeight - 20;
        historyContainer.setAttribute("style","height:" + histContainerHeight + "px");
        historyContainer.id = InterfaceBuilder.HISTORY_CONTAINER_ID;
        historyContainer.className = CssClassNames.HISTORY_DIV;
        var dateBuf = null;

        for(var i = roots.length-1; i >= 0; i--) {
            if(dateBuf != roots[i].getDate()) {
                dateBuf = roots[i].getDate();
                var dayStrElem = DomElemsFactory.createDateString(dateBuf);
                historyContainer.appendChild(dayStrElem);
            }

            var strategy = null;
            if( flagFoundStrategy == true) {
                strategy = new DefFoldStrategy(2, searchResFoldPredicate.bind(null, foundIDs));
            } else {
                strategy = new DefFoldStrategy(2, defFoldPredicate); //hardcoded values !!!!!!!!!!
            }

            var visualTree = TreeVisualizer.buildTree(roots[i], strategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    };

    var drawFoundForest = function(foundRawNodes) {
        if(roots == null ) {
            alert("error");
        } else {
            foundIDs = { };
            for(var i=0; i< foundRawNodes.length; i++) {
            foundIDs[ foundRawNodes[i].VisitItem.visitId ] = true;  // use:  if( key in visitIds ) { ... }
        }
            removeOldHistoryContainerIfExists(document.body);
            drawForest(document.body, true);
        }
    };

    this.start = function(parentDomElement) {
        var drawHistoryCallback = buildInitialHistoryArea.bind(null, parentDomElement);
        var today = new Date();
        GetRawNodes.applyFunction('', 0, today.getTime(), 0, drawHistoryCallback);
    };

    this.foundHandler = function() {
        var word = document.getElementById(DomElemsFactory.SEARCH_FIELD_ID).value;
        if(word == "") {
            removeOldHistoryContainerIfExists(document.body);
            drawForest(document.body, false);      
        } else {
           var today = new Date();
           var hourMilSeconds = 60*60*1000;
           var weekMilSeconds = 7*24*hourMilSeconds;
           var timePeriodMilSec =  today.getTime();
           
           var objSel = document.getElementById(DomElemsFactory.TIME_RANGE_SELECT_ID);
           timePeriod = objSel.options[objSel.selectedIndex].text;
           
           switch (timePeriod) {
               case "last hour":
                  timePeriodMilSec = hourMilSeconds;
                  break;
               case "last day":
                  timePeriodMilSec = 24*hourMilSeconds;
                  break;
               case "last week":
                  timePeriodMilSec = weekMilSeconds;
                  break;
               case "last month":
                  timePeriodMilSec = 4*weekMilSeconds;
                  break;
               case "from the beginning of time":
                  timePeriodMilSec = today.getTime();
                  break;
               default:
                  timePeriodMilSec = today.getTime();
                  break;
           }
              
           GetRawNodes.applyFunction(word, today.getTime() - timePeriodMilSec, today.getTime(), 0, drawFoundForest);
        }
    };

    function removeOldHistoryContainerIfExists(parentDomElement) {
        var historyDiv = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
        parentDomElement.removeChild(historyDiv);
    }
}
