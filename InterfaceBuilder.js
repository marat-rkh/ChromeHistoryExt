function InterfaceBuilder() {
    
    this.searchFieldID = 'SearchField';
    this.deleteAllID = 'DeleteAll';
    var searchFieldHeight;
    
    this.buildSearchForm = function (parentDomElement) {
        var titleText = document.createElement('div');
        titleText.innerText = 'History';

        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = InterfaceBuilder.searchFieldID;

        var searchButton = document.createElement('input');
        searchButton.type = 'button';
        searchButton.value = 'Search';
        searchButton.onclick = this.foundHandler;//handleSearchAction;

        var searchFieldContainer = document.createElement('div');
        searchFieldContainer.className = CssClassNames.SEARCH_FIELD_CONTAINER;
        searchFieldContainer.appendChild(titleText);
        searchFieldContainer.appendChild(inputText);
        searchFieldContainer.appendChild(searchButton);
        parentDomElement.appendChild(searchFieldContainer);
    }
    
    
    this.buildTitleForm = function (parentDomElement) {
        
        
        var titleText = document.createElement('div');
        titleText.innerText = 'History';
        
        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = InterfaceBuilder.searchFieldID;

        var searchButton = document.createElement('input');
        searchButton.type = 'button';
        searchButton.value = 'Search';
        searchButton.onclick = this.foundHandler;
        
        var deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Delete all history';
        deleteButton.onclick = this.deleteHandler;
        
        
        
        var titleContainer = document.createElement('div');
        titleContainer.className = CssClassNames.SEARCH_FIELD_CONTAINER;
        titleContainer.appendChild(titleText);
        
        titleContainer.appendChild(inputText);
        titleContainer.appendChild(searchButton);
        
        titleContainer.appendChild(deleteButton);
        
        parentDomElement.appendChild(titleContainer);
        searchFieldHeight = titleContainer.offsetHeight;
    }
    
     this.deleteHandler = function() {
      chrome.history.deleteAll(function(){});  
      window.localStorage.clear();
    }

    InterfaceBuilder.HISTORY_CONTAINER_ID = 'HistoryContainer';

    var roots = null;
    
    buildInitialHistoryArea = function(parentDomElement, rawNodes) {
      
        roots = ForestBuilder(rawNodes);      
        this.drawForest(parentDomElement, false);
    }
     

    drawForest = function(parentDomElement, flagFoundStrategy) {
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
//                strategy = new DefFoldStrategy(2, defFoldPredicate);
                strategy = new DefFoldStrategy(2, searchResFoldPredicate.bind(null, foundIDs));
            } else {
                strategy = new DefFoldStrategy(2, defFoldPredicate); //hardcoded values !!!!!!!!!!
            }
            
            var visualTree = TreeVisualizer.buildTree(roots[i], strategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    } 

    var foundIDs = null;
   
    drawFoundForest = function(foundRawNodes) {
   
      if( roots == null ) {
         alert("error");
          
      } else {
         
         foundIDs = { };
         for(var i=0; i<foundRawNodes.length; i++) {
            foundIDs[ foundRawNodes[i].VisitItem.visitId ] = true;  // use:  if( key in visitIds ) { ... } 
         }

          removeOldHistoryContainerIfExists(document.body);
         this.drawForest(document.body, true);
      }
    }


   // this.apply(foundString, startTime, lastTime, countItems)
   this.start = function(parentDomElement) {
         var drawHistoryCallback = buildInitialHistoryArea.bind(null, parentDomElement);
         var today = new Date();
         var weekMilSeconds = 7*24*60*60*1000;
         GetRawNodes.applyFunction('', today.getTime() - weekMilSeconds, today.getTime(), 0, drawHistoryCallback);
   }
   
   this.foundHandler = function() {
      
      var word = document.getElementById(InterfaceBuilder.searchFieldID).value;
      var today = new Date();
      var weekMilSeconds = 7*24*60*60*1000;
      GetRawNodes.applyFunction(word, today.getTime() - weekMilSeconds, today.getTime(), 0, drawFoundForest);
   }

    function removeOldHistoryContainerIfExists(parentDomElement) {
        var historyDiv = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
        parentDomElement.removeChild(historyDiv);
    }
}
