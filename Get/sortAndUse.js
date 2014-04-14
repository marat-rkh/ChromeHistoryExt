function showHist(hist_item) {
                     
            document.write("<li>" + hist_item.title + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + hist_item.id + "</li>");
            document.write("<li>" + hist_item.url + "</li>");
            document.write("<li>" + hist_item.visitCount + "</li>");
            document.write("<li>" + hist_item.typedCount + "</li>");
            document.write("</ul>");
            
}
      
function showVisit(visit_item) {
                 
            document.write("<li>" + visit_item.id + "</li>");
            
            document.write("<ul>");
            document.write("<li>" + visit_item.visitId + "</li>");
            document.write("<li>" + visit_item.visitTime + "</li>");
            document.write("<li>" + visit_item.referringVisitId + "</li>");
            document.write("<li>" + visit_item.transition+ "</li>");
            document.write("</ul>");
}
  
 
function show(rawNodes) {
       
   for(var i=0; i < rawNodes.length; i++){
      document.write("<hr>");
      showHist(rawNodes[i].histItem);
      showVisit(rawNodes[i].visitItem);
      document.write("<hr>");
   }
   
}  




function compareRawNodes( rn1, rn2 ) {
   
   if( (rn1.visitItem).visitTime > (rn2.visitItem).visitTime) {
      return 1;
   }
   else if( (rn1.visitItem).visitTime < (rn2.visitItem).visitTime) {
      return -1;
   }
   else {
      return 0;
   }
}

  

rawNodes.sort(compareRawNodes)

show(rawNodes)




