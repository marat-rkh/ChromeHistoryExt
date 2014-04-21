      
function Get(text_, startTime_, endTime_, maxResults_) {
   
   //constructor
   var text = text_
   var startTime = startTime_
   var endTime = endTime_
   var maxResults = maxResults_
   
   
   //public
   this.applyFunction = function ( main_callback ) {
   
      getHistoryItems( curry_snd( getVisitItems, curry_snd( sortRawNodes, main_callback )  )  );
   }
   

   //private             
   function getHistoryItems( callback ) {
      
      chrome.history.search({
               'text': text,
               'startTime': startTime,
               'endTime': endTime,
               'maxResults': maxResults       
               },
               callback
      );       
   }



   function getVisitItems( array, callback ) {
      
         async.concat
         (
               array, 
               
               function(item, doneCallback ) 
               {
               
                   chrome.history.getVisits( 
                                    {
                                     'url' : item.url 
                                    }
                                    
                                   , function (arrVisitItems) 
                                      {
                                          arrRawNodes = []
                                          for(var i=0; i < arrVisitItems.length; i++) {
                                             
                                             if( startTime <= arrVisitItems[i].visitTime && arrVisitItems[i].visitTime <= endTime ) {  // where startTime and endTime ?
                                                
                                                arrRawNodes.push(  { HistoryItem : item , VisitItem : arrVisitItems[i] }  )   // this.item ?
                                             }
                                          }
                                          doneCallback(null, arrRawNodes )
                                      }
                   );
               },
               
               function(err, results) 
               {
                  callback(results)
               }   
          )      
   }



   function sortRawNodes (array, callback) {
         
         async.sortBy
         (
               array, 
               
               function(item, doneCallback ) 
               {
                   doneCallback(null, item.VisitItem.visitTime )
               },
               
               function(err, results) 
               {
                  callback(results)
               }   
          )  
   }


   function curry_snd ( function_with_two_args , snd_arg ) {
      
      return function(fst_arg) { function_with_two_args (fst_arg, snd_arg) }
   }


}

         
                    
