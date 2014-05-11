
function ForestBuilder( rawNodes ) {
   
   arrayTreeNodes = [];
   roots = [];
  
   for(var i=0; i < rawNodes.length; i++) {
      
      var currentTreeNode;
      refVisId = rawNodes[i].VisitItem.referringVisitId; 
      var haveParent = true;
      
      for(var j=0; j < arrayTreeNodes.length; j++) {
        
         if( refVisId == arrayTreeNodes[j].rawNode.VisitItem.visitId ) {
            
             currentTreeNode = new TreeNode(rawNodes[i], arrayTreeNodes[j]);
             
             // because we must have one child 
             if( arrayTreeNodes[j].childrenArray.length == 1 ) {
               arrayTreeNodes[j].childrenArray[0] = currentTreeNode;        
             } else {
               arrayTreeNodes[j].childrenArray.push( currentTreeNode );
             }
             
             haveParent = false;
             break;                   
         }      
      }
      
      if(haveParent) {
         currentTreeNode = new TreeNode(rawNodes[i], null);
         roots.push( currentTreeNode );      
      }   
      
      arrayTreeNodes.push( currentTreeNode );              
   }
   
   return roots;   
}



function testTree( rawNodes ) {
   
   roots = ForestBuilder(rawNodes);
   
   alert(roots.length);
   alert(roots[0].childrenArray.length)
}



