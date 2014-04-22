     
// static class     
var GetRawNodes;
   
   
// static function in class Get
var applyFunction = function (text, startTime, endTime, maxResults, main_callback ) {

   getRawNodes( main_callback );
   
   
   //private             
   
   function pairToRawNodes(histItem, visitItems) {
      resRawNodes = [];
      for(var i=0; i < visitItems.length; i++){
         resRawNodes.push( {HistoryItem: histItem, VisitItem: visitItems[i]} );
      }
      return resRawNodes;
   }
   
   
   function zip(arr1, arr2, coverFun) {
      arrRes = [];
      if( arr1.length != arr2.length ) {
      
         console.log("error ZIP: diff length");
         return null;
      }
      for(var i=0; i < arr1.length; i++) {
         arrRes.push( coverFun( arr1[i],arr2[i] ) );
      }
      
      return arrRes;
   }
   
   
   function getRawNodes( callback ) 
   {   
      chrome.history.search({
               'text': text,
               'startTime': startTime,
               'endTime': endTime,
               'maxResults': maxResults       
               },
               function ( arrHistoryItems  ) 
               {
                  async.map
                  (
                     arrHistoryItems, 
                           
                     function(historyItem, doneCallback ) 
                     {
                        chrome.history.getVisits
                        ( 
                         {'url' : historyItem.url },
                                                
                         function (arrVisitItems) 
                         { 
                           doneCallback(null, arrVisitItems ); 
                         }
                        );
                     },
                           
                     function(err, arrArraysVisitItems) 
                     {  
                      async.concat
                      (
                           //arrArraysRawNodes
                           zip( arrHistoryItems, arrArraysVisitItems, pairToRawNodes ) ,
                           
                           function(itemArrRawNodes, doneCallback ) 
                           {
                              doneCallback(null, itemArrRawNodes )
                           },
                           
                           function(err, allArrRawNodes) 
                           {
                              async.filter
                              (
                                    allArrRawNodes, 
                                    
                                    function( rawNode, doneCallback ) 
                                    {
                                       
                                      doneCallback( startTime <= rawNode.VisitItem.visitTime && rawNode.VisitItem.visitTime <= endTime ) 
                                    },
                                    
                                    function(filterArrRawNodes) 
                                    {
                                       async.sortBy
                                       (
                                             filterArrRawNodes, 
                                             
                                             function( rawNode, doneCallback ) 
                                             {
                                                doneCallback(null, rawNode.VisitItem.visitTime )
                                             },
                                             
                                             function(err, sortArrRawNodes) 
                                             {
                                                callback(sortArrRawNodes)
                                                ///////////////////////////////////////
                                             }   
                                        ) 
                                    }   
                               )               
                           }   
                        )           
                     }   
                  )            
               }
      );       
   }


}



GetRawNodes = {
        'applyFunction' : applyFunction 
      }


   
         
                    
