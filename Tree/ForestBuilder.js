
function ForestBuilder( rawNodes ) {
 
   var arrayTreeNodes = [];
   var visitIdToTreeNodeMap = {};
   var redirectTempMap = {};
   var roots = [];
  
   for(var i=0; i < rawNodes.length; i++) {
      
      var currentTreeNode = null;
      var curVisId = rawNodes[i].VisitItem.visitId; 
      var refVisId = window.localStorage.getItem(curVisId);
      
      if( rawNodes[i].VisitItem.transitionType == 'reload' &&  window.localStorage.getItem(rawNodes[i].VisitItem.referringVisitId) !== null ) {
         redirectTempMap[rawNodes[i].VisitItem.visitId] = window.localStorage.getItem(rawNodes[i].VisitItem.referringVisitId);
         
         var time = rawNodes[i].VisitItem.visitTime;
         var curRealoadVisitId = rawNodes[i].VisitItem.visitId;
         while(redirectTempMap[curRealoadVisitId] !== null) {
            curRealoadVisitId = redirectTempMap[curRealoadVisitId];
         }
         visitIdToTreeNodeMap[curRealoadVisitId].rawNode.VisitItem.visitTime = time;
         
         continue;
      }
      
      if( window.localStorage.getItem(curVisId) == null ) {   
         refVisId = rawNodes[i].VisitItem.referringVisitId;      
      }

         
      if(refVisId in visitIdToTreeNodeMap) {   
         currentTreeNode = new TreeNode( rawNodes[i], visitIdToTreeNodeMap[refVisId] );           
         visitIdToTreeNodeMap[refVisId].childrenArray.push( currentTreeNode );
         
      } else if (refVisId in redirectTempMap) {
         var curRealoadVisitId = refVisId;
         while(redirectTempMap[curRealoadVisitId] !== null) {
            curRealoadVisitId = redirectTempMap[curRealoadVisitId];
         }
         currentTreeNode = new TreeNode( rawNodes[i], visitIdToTreeNodeMap[curRealoadVisitId] );
         visitIdToTreeNodeMap[curRealoadVisitId].childrenArray.push( currentTreeNode );
         
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



