function InterfaceBuilder() {
    
    this.searchFieldID = 'SearchField';
    
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

    InterfaceBuilder.HISTORY_CONTAINER_ID = 'HistoryContainer';

    var roots = null;
    
    buildInitialHistoryArea = function(parentDomElement, rawNodes) {
      
        roots = ForestBuilder(rawNodes);      
        this.drawForest(parentDomElement, false);
    }
     
     
    drawForest = function(parentDomElement, flagFoundStrategy) {
        var historyContainer = document.createElement('div');
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
//                strategy = new SearchResultStrategy(4, foundIDs); //hardcoded values !!!!!!!!!!
                strategy = new DefaultStrategy(4, 2);
            } else {
               strategy = new DefaultStrategy(4, 2); //hardcoded values !!!!!!!!!!
            }
            
            var visualTree = TreeVisualizer.buildTree(roots[i], strategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    } 

    var foundIDs = null;
   
    drawFoundForest = function(foundRawNodes) {
   
      if( this.roots == null ) {
         alert("error");
          
      } else {
         
         foundIDs = { };
         for(var i=0; i<foundRawNodes.length; i++) {
            foundIDs[ foundRawNodes[i].VisitItem.visitId ] = true;  // use:  if( key in visitId ) { ... } 
         }

          removeOldHistoryContainerIfExists(document.body);
         this.drawForest(document.body, true);
      }
    }


   // this.apply(foundString, startTime, lastTime, countItems)
   this.start = function(parentDomElement) {
         var drawHistoryCallback = buildInitialHistoryArea.bind(null, parentDomElement);
         GetRawNodes.applyFunction('', 0, 100000000000000, 100, drawHistoryCallback);
   }
   
   this.foundHandler = function() {
      
      var word = document.getElementById(InterfaceBuilder.searchFieldID).value;
      GetRawNodes.applyFunction(word, 0, 100000000000000, 10, drawFoundForest);
   }

    function removeOldHistoryContainerIfExists(parentDomElement) {
        var historyDiv = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
        parentDomElement.removeChild(historyDiv);
    }
}
