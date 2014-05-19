
function ForestBuilder( rawNodes ) {
 
   var arrayTreeNodes = [];
   var hashMapVisitIdToTreeNode = {};
   var roots = [];
  
   for(var i=0; i < rawNodes.length; i++) {
      
      var currentTreeNode = null;
      var curVisId = rawNodes[i].VisitItem.visitId; 
      var refVisId = rawNodes[i].VisitItem.referringVisitId;      
      
      /* предок не содержится в нашей hashmap, но есть некая информация в хранилище */
      if( ( refVisId == 0 || !(refVisId in hashMapVisitIdToTreeNode) ) 
            && window.localStorage.getItem(curVisId) !== null ) {   
         refVisId = window.localStorage.getItem(curVisId);     
      }
         
      if(refVisId in hashMapVisitIdToTreeNode) {   
      
         currentTreeNode = new TreeNode( rawNodes[i], hashMapVisitIdToTreeNode[refVisId] );           
         hashMapVisitIdToTreeNode[refVisId].childrenArray.push( currentTreeNode );
               
      } else {
         currentTreeNode = new TreeNode(rawNodes[i], null);
         roots.push( currentTreeNode );         
      }
      
      hashMapVisitIdToTreeNode[curVisId] = currentTreeNode;                            
   }
   
   return roots;   
}



function testTree( rawNodes ) {
   
   roots = ForestBuilder(rawNodes);
   
   alert(roots.length);
   alert(roots[0].childrenArray.length)
}



