
function showHist(hist_item) {
                 
        document.write( "<hr>" + "<p>" + " H i s t o r y I t e m." + "</p>" + "<hr>");
    
            document.write("<li>" + hist_item.title + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + hist_item.id + "</li>");
            document.write("<li>" + hist_item.url + "</li>");
            document.write("<li>" + hist_item.visitCount + "</li>");
            document.write("<li>" + hist_item.visitCount + "</li>");
            document.write("</ul>");
}
      
function showVisit(visit_items) {
                 
        document.write("<hr>" + "<p>" + "V i s i t   I t e m s." + "</p>" + "<hr>");
        document.write("<ul>"); 
        for(var i=0; i< visit_items.length; i++) {
            
            document.write("<li>" + visit_items[i].id + "</li>");
            document.write("<ul>");
            document.write("<li>" + visit_items[i].visitId + "</li>");
            document.write("<li>" + visit_items[i].visitTime + "</li>");
            document.write("<li>" + visit_items[i].referringVisitId + "</li>");
            document.write("<li>" + visit_items[i].transition+ "</li>");
            document.write("</ul>");

        }
        document.write("</ul>");
}
  
 
function show(rawNodes) {
       
   for(var i=0; i < rawNodes.length; i++){
      showHist(rawNodes[i].HistoryItem);
   }
   
   for(var j=0; j < rawNodes.length; j++){
      showVisit(rawNodes[j].VisitItems);
   }
}  


     
      
      
function GetHistItems(text, startTime, endTime, maxResults) {
   
   var context = {histNodes: null};
   
   function forGet(hist_items) {

      context.histNodes = hist_items;
      //3

   }
   
   //1
   chrome.history.search({
            'text': text,
            'startTime': startTime,
            'endTime': endTime,
            'maxResults': maxResults       
            },
            forGet);
   
   //2 

   alert("Are you ready get HistoryItems?");    // whithout this string  Get not work :( ignore getVisits return call first
    
   return context.histNodes;              
}


  
function GetVisitItems(url) {
   
   var context = {visitNodes: null};
   
   function forGet(visit_items) {

      context.visitNodes = visit_items;

   }

   chrome.history.getVisits({
                              'url' :url 
                            }
                           , forGet);


   alert("Are you ready get VisitItems?");     // whithout this string Get not work :( ignore getVisits return call first 
        
   return context.visitNodes;              
}



function createRawNode(histItem) {
   
   var rawNode = {
   HistoryItem : histItem,
   VisitItems : []
   }
   
   var visItems = GetVisitItems(histItem.url);

   rawNode.VisitItems = visItems;
   
   return rawNode;
}

       
function Get(text, startTime, endTime, maxResults) {
   
   var rawNodes = [];
   var histItems = GetHistItems(text, startTime, endTime, maxResults);
   

   for(var i=0; i < histItems.length; i++) {
      
      
      rawNodes.push( createRawNode(histItems[i]) );
   }
        
   return rawNodes;              
}






var rawNodes = Get('', 0, 10000000000000, 3);

show(rawNodes);
           

