function showVisit(visitItem) {
                 
            document.write("<li>" + visitItem.id + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + visitItem.visitId + "</li>");
            document.write("<li>" + visitItem.visitTime + "</li>");
            document.write("<li>" + visitItem.referringVisitId + "</li>");
            document.write("<li>" + visitItem.transition+ "</li>");
            document.write("</ul>");
}
  
function showHist(histItem) {
                     
            document.write("<li>" + histItem.title + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + histItem.id + "</li>");
            document.write("<li>" + histItem.url + "</li>");
            document.write("<li>" + histItem.visitCount + "</li>");
            document.write("<li>" + histItem.typedCount + "</li>");
            document.write("</ul>");
            
}

function showRawNodes(array) {

   for(var i=0; i< array.length ;i++) {
      showHist( array[i].HistoryItem )
      showVisit(array[i].VisitItem)
      document.write("<hr>");                  
   }
}


//GetRawNodes.applyFunction('', 0, 139747139697400, 3, showRawNodes) 

