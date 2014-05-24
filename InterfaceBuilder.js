function InterfaceBuilder() {
    
    this.searchFieldID = 'SearchField';
    this.deleteAllID = 'DeleteAll';
    InterfaceBuilder.HISTORY_CONTAINER_ID = 'HistoryContainer';
    
    var searchFieldHeight;
    var roots = null;
    var foundIDs = null;
            
   
    submit_handler = function(form) {
    alert("!");
    return false;
    }
   
   
    this.buildTitleForm = function (parentDomElement) {
       
        var textSearch = document.createElement('input');
        textSearch.type = "text";
        textSearch.id = InterfaceBuilder.searchFieldID;
        
        textSearch.onkeydown = function(){ 
          if (event.keyCode == 13) {
            document.getElementById('btnSearch').click();
          }
        }; 
        
        var buttonSearch = document.createElement('input');
        buttonSearch.type="button"; 
        buttonSearch.id = 'btnSearch'; 
        buttonSearch.value="Search";
        buttonSearch.onclick= this.foundHandler; //"doSomething();"
        
        /*var formClick = document.createElement('form');
        
        formClick.onsubmit = "return submit_handler(this)";
        formClick.method = "POST"; 
        
        var click = document.createElement('input');
        click.name="anything"; 
        
        var button = document.createElement('input');
        button.type="submit";
        button.value = "Search ..." 
        
        formClick.appendChild(click);
        formClick.appendChild(button);
        */
        
        var titleText = document.createElement('div');
        titleText.innerText = 'History';
        
        
        /*
        var inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.id = InterfaceBuilder.searchFieldID;
         
        var searchButton = document.createElement('input');
        searchButton.type = 'button';
        searchButton.value = 'Search';
        searchButton.onclick = this.foundHandler;
        */
        
        var deleteButton = document.createElement('input');
        deleteButton.type = 'button';
        deleteButton.value = 'Delete all history';
        deleteButton.onclick = this.deleteHandler;
        
        
        var titleContainer = document.createElement('div');
        titleContainer.className = CssClassNames.SEARCH_FIELD_CONTAINER;
        
        titleContainer.appendChild(titleText);
        titleContainer.appendChild(textSearch);
        titleContainer.appendChild(buttonSearch);
        
        titleContainer.appendChild(deleteButton);
        
        parentDomElement.appendChild(titleContainer);
        searchFieldHeight = titleContainer.offsetHeight;
    }
    
     this.deleteHandler = function() {
      chrome.history.deleteAll(function(){});  
      window.localStorage.clear();
    }

    
    var buildInitialHistoryArea = function(parentDomElement, rawNodes) {
      
        roots = ForestBuilder(rawNodes);      
        drawForest(parentDomElement, false);
    }
     
     
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

    var drawFoundForest = function(foundRawNodes) {
      if( roots == null ) {
         alert("error");
      } else {
         foundIDs = { };
         for(var i=0; i< foundRawNodes.length; i++) {
            foundIDs[ foundRawNodes[i].VisitItem.visitId ] = true;  // use:  if( key in visitIds ) { ... } 
         }
         removeOldHistoryContainerIfExists(document.body);
         drawForest(document.body, true);
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
      
      if(word == "") {
         removeOldHistoryContainerIfExists(document.body);        
         drawForest(document.body, false);
      } else {
         GetRawNodes.applyFunction(word, today.getTime() - weekMilSeconds, today.getTime(), 0, drawFoundForest);
      }
   }

   function removeOldHistoryContainerIfExists(parentDomElement) {
       var historyDiv = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
       parentDomElement.removeChild(historyDiv);
   }
   
}
