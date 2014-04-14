function showVisit(visitItem) {
                 
            document.write("<li>" + visitItem.id + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + visitItem.visitId + "</li>");
            document.write("<li>" + visitItem.visitTime + "</li>");
            document.write("<li>" + visitItem.referringVisitId + "</li>");
            document.write("<li>" + visitItem.transition+ "</li>");
            document.write("</ul>");
}
  
function showHist(histItems) {
                     
            document.write("<li>" + histItems.title + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + histItems.id + "</li>");
            document.write("<li>" + histItems.url + "</li>");
            document.write("<li>" + histItems.visitCount + "</li>");
            document.write("<li>" + histItems.typedCount + "</li>");
            document.write("</ul>");
            
}
      


  function foo2( visit_items, hist_item, startTime, endTime) {
       
       for(var j=0; j < visit_items.length; j++) {
               
               if( startTime <= visit_items[j].visitTime && visit_items[j].visitTime <= endTime ) {    
                  /* 
                  showHist( hist_item )
                  showVisit(visit_items[j])
                  document.write("<hr>");
                  */
                  var rawNode = { histItem: hist_item, visitItem: visit_items[j] }
                  rawNodes.push(rawNode)
               } 
       }      
       
  }
  
  
function foo1 ( hist_items, startTime, endTime ) {

   function curry_foo2( hi, st, et ) {
      return function(a) {
         return foo2(a, hi, st, et );
      }
   }
      
   for(var i=0; i < hist_items.length; i++) {
      
      //var A = { hi : hist_items[i] };
      var url = hist_items[i].url 
      
      var par;
      chrome.history.getVisits( {
                                'url' :url 
                                }
                                , curry_foo2(hist_items[i], startTime, endTime)
      );
      
   }
  
}     
      
      
      
function Get(text, startTime, endTime, maxResults) {
   
   function curry_foo1( st, et ) {
      return function(a) {
         return foo1(a, st, et);
      }
   }
    
   chrome.history.search({
            'text': text,
            'startTime': startTime,
            'endTime': endTime,
            'maxResults': maxResults       
            },
            curry_foo1(startTime, endTime)
   );     
   
}

         
                     
//        
var rawNodes = [];            
Get('', 0, 1397471396974.2898, 3);

alert("Get raw nodes")

