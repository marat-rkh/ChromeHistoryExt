"use strict";

function drawSomeTree( rawNodes ) {
    
       var mainContainer = document.createElement('div');
       var dateBuf = null;
       roots = ForestBuilder(rawNodes);
       
       for(var i = roots.length-1; i >= 0; i--) {
       
          if( roots[i].childrenArray.length > 0) {  
            if(dateBuf != roots[i].getDate()) {
               dateBuf = roots[i].getDate();
               var dayStrElem = document.createElement('div');
               dayStrElem.innerText = dateBuf;
               mainContainer.appendChild(dayStrElem);
            }
            
            var defStrategy = new DefaultStrategy(4, 2);
            var visualTree = TreeVisualizer.buildTree(roots[i], defStrategy);  
            mainContainer.appendChild(visualTree);
          }
       }
       
       document.body.appendChild(mainContainer);

    
}

window.onload = function() {

   var element = document.createElement('input');
   document.body.appendChild(element);
   
   GetRawNodes.applyFunction('', 0, 100000000000000, 1000,
   drawSomeTree);                        
};






/*
function drawSomeTree() {
    var defStrategy = new DefaultStrategy(4, 2);
    var visualTree = TreeVisualizer.buildTree(Branch7(), defStrategy);
    document.body.appendChild(visualTree);
}

function Branch7 () {
    var root = new TreeNode(null, 'roooooooooooooooooooooooooooooooooooooooooooot', 'http://vk.com', 1);
    var inner1 = new TreeNode(root, 'inner1', 'http://ya.ru', 2);
    root.childrenArray = [inner1];
    var inner2 = new TreeNode(inner1, 'inner2', 'http://google.com', 3);
    inner1.childrenArray = [inner2];
    var inner3 = new TreeNode(inner2, 'inner3', 'http://google.com', 4);
    inner2.childrenArray = [inner3];
    var inner4 = new TreeNode(inner3, 'inner4', 'http://google.com', 5);
    inner3.childrenArray = [inner4];
    var inner5 = new TreeNode(inner4, 'inner5', 'http://habrahabr.ru', 6);
    inner4.childrenArray = [inner5];
    var leaf = new TreeNode(inner5, 'leaf', 'http://google.com', 7);
    inner5.childrenArray = [leaf];
    return root;
}

window.onload = function() {
    drawSomeTree();
};
*/
