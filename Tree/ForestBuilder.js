
function ForestBuilder( rawNodes ) {
 
   //chrome.history.deleteAll(function(){});  window.localStorage.clear();
   
   function findParentIdForReloadItems(startId) {
      
      var curRealoadVisitId = startId;
      while(curRealoadVisitId in redirectTempMap) {
         curRealoadVisitId = redirectTempMap[curRealoadVisitId];
      }
      return curRealoadVisitId;
   }
   
   var arrayTreeNodes = [];
   var visitIdToTreeNodeMap = {};
   var redirectTempMap = {};
   var roots = [];
   
   
   for(var i=0; i < rawNodes.length; i++) {
      
      var currentTreeNode = null;
      var curVisId = rawNodes[i].VisitItem.visitId; 
      var refVisId = window.localStorage.getItem(curVisId);
      
      if( rawNodes[i].VisitItem.transition == 'reload' &&  
          ( window.localStorage.getItem(curVisId) !== null &&
            window.localStorage.getItem(curVisId) !== "null")) {
          
         redirectTempMap[curVisId] = window.localStorage.getItem(curVisId); 
         var time = rawNodes[i].VisitItem.visitTime;
         var parentIdForReloadItems = findParentIdForReloadItems(curVisId);
         visitIdToTreeNodeMap[parentIdForReloadItems].rawNode.VisitItem.visitTime = time;
         continue;
      }
      
      if( window.localStorage.getItem(curVisId) == null || window.localStorage.getItem(curVisId) == "null" ) {   
         refVisId = rawNodes[i].VisitItem.referringVisitId;      
      }

         
      if(refVisId in visitIdToTreeNodeMap) {   
         currentTreeNode = new TreeNode( rawNodes[i], visitIdToTreeNodeMap[refVisId] );           
         visitIdToTreeNodeMap[refVisId].childrenArray.push( currentTreeNode );
         
      } else if (refVisId in redirectTempMap) {
         var parentIdForReloadItems = findParentIdForReloadItems(refVisId);
         currentTreeNode = new TreeNode( rawNodes[i], visitIdToTreeNodeMap[parentIdForReloadItems] );
         visitIdToTreeNodeMap[parentIdForReloadItems].childrenArray.push( currentTreeNode );
         
      } else {
         currentTreeNode = new TreeNode(rawNodes[i], null);
         roots.push( currentTreeNode );         
      }
      
      visitIdToTreeNodeMap[curVisId] = currentTreeNode;                            
   }
   
   return roots;   
}



function testTree( rawNodes ) {
   
   roots = ForestBuilder(rawNodes);
   
   alert(roots.length);
   alert(roots[0].childrenArray.length)
}



