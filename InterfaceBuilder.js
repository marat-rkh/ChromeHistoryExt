function InterfaceBuilder() {
    InterfaceBuilder.HISTORY_CONTAINER_ID = 'HistoryContainer';

    InterfaceBuilder.SEARCH_FIELD_HEIGHT = 101;
    var roots = null;
    var foundIDs = null;
    var wrapperElem = null;

    this.setInterfaceWrapper = function(wrapper) {
        wrapperElem = wrapper;
    };

    this.buildTitleForm = function () {
        var titleContainer = document.createElement('div');
        titleContainer.className = CssClassNames.TITLE_AREA_CONTAINER;

        titleContainer.appendChild(DomElemsFactory.createTitle());
        titleContainer.appendChild(DomElemsFactory.createSearchRangeText());
        titleContainer.appendChild(DomElemsFactory.createTimeRangeSelect());
        var searchSection = DomElemsFactory.createSearchSection(this.foundHandler.bind(this));
        titleContainer.appendChild(searchSection["SearchField"]);
        titleContainer.appendChild(searchSection["SearchButton"]);
        titleContainer.appendChild(DomElemsFactory.createClearHistoryButton(this.deleteHandler.bind(this)));

        wrapperElem.appendChild(titleContainer);
    };

    this.deleteHandler = function() {
        if (confirm("Are you sure you want to delete all history?")) {
           chrome.history.deleteAll(function(){});
           window.localStorage.clear();
        } 
    };

    var buildInitialHistoryArea = function(rawNodes) {
        roots = ForestBuilder(rawNodes);
        drawForest(false);
    };

    var drawForest = function(flagFoundStrategy) {
        var historyContainer = document.createElement('div');
        var histContainerHeight = window.innerHeight - InterfaceBuilder.SEARCH_FIELD_HEIGHT;
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
                strategy = new DefFoldStrategy(2, defFoldPredicate);
            }

            var visualTree = TreeVisualizer.buildTree(roots[i], strategy);
            historyContainer.appendChild(visualTree);
        }
        var loadingElem = document.getElementById(DomElemsFactory.LOADING_IMG_ID);
        if(loadingElem != null) {
            wrapperElem.removeChild(loadingElem);
        }
        wrapperElem.appendChild(historyContainer);
    };

    var drawFoundForest = function(foundRawNodes) {
        if(roots == null ) {
            alert("error");
        } else {
            foundIDs = { };
            for(var i=0; i< foundRawNodes.length; i++) {
            foundIDs[ foundRawNodes[i].VisitItem.visitId ] = true;  // use:  if( key in visitIds ) { ... }
        }
            removeOldHistoryContainerIfExists();
            drawForest(true);
        }
    };

    this.start = function() {
        var today = new Date();
        GetRawNodes.applyFunction('', 0, today.getTime(), 0, buildInitialHistoryArea);
    };

    this.foundHandler = function() {
        var word = document.getElementById(DomElemsFactory.SEARCH_FIELD_ID).value;
        if(word == "") {
            removeOldHistoryContainerIfExists();
            drawForest(false);
        } else {
           var today = new Date();
           var hourMilSeconds = 60*60*1000;
           var weekMilSeconds = 7*24*hourMilSeconds;
           var timePeriodMilSec =  4*weekMilSeconds;
           
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
               default:
                  break;
           }
              
           GetRawNodes.applyFunction(word, today.getTime() - timePeriodMilSec, today.getTime(), 0, drawFoundForest);
        }
    };

    function removeOldHistoryContainerIfExists() {
        var historyDiv = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
        wrapperElem.removeChild(historyDiv);
    }
}