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

    this.historyContainerID = 'HistoryContainer';

    var roots = null;
    
    buildInitialHistoryArea = function(parentDomElement, rawNodes) {
      
        roots = ForestBuilder(rawNodes);      
        this.drawForest(parentDomElement, false);
    }
     
     
    drawForest = function(parentDomElement, flagFoundStrategy) {
    
        var historyContainer = document.createElement('div');
        historyContainer.id = InterfaceBuilder.historyContainerID;
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
               //var strategy = new FoundStrategy(foundIDs); 
               strategy = new DefaultStrategy(4, 2); //hardcoded values !!!!!!!!!!
            } else {
               strategy = new DefaultStrategy(4, 2); //hardcoded values !!!!!!!!!!
            }
            
            var visualTree = TreeVisualizer.buildTree(roots[i], strategy);
            historyContainer.appendChild(visualTree);
        }
        parentDomElement.appendChild(historyContainer);
    } 
   
   
    drawFoundForest = function(foundRawNodes) {
   
      if( this.roots == null ) {
         alert("error");
          
      } else {
         
         foundIDs = []
         for(var i=0; i<foundRawNodes.length; i++) {
            foundIDs.push(foundRawNodes[i].VisitItem.visitId);
         }
         
         this.drawForest(document.body, true);
      }
    }
   


   // this.apply(foundString, startTime, lastTime, countItems)
   this.start = function(parentDomElement) {
         var drawHistoryCallback = buildInitialHistoryArea.bind(null, parentDomElement);
         GetRawNodes.applyFunction('', 0, 100000000000000, 100, drawHistoryCallback);
   }
   
   this.foundHandler = function() {
      //alert(evt.keyCode)
      alert("test")
      //alert( document.getElementById('Search').value ); 
      GetRawNodes.applyFunction('', 0, 100000000000000, 10, drawFoundForest);
   }
}
