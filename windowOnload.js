"use strict";

window.onload = function() {
    var interfaceBuilder = new InterfaceBuilder(); 
    //interfaceBuilder.buildSearchForm(document.body);
    interfaceBuilder.buildTitleForm(document.body);
    interfaceBuilder.start(document.body);
//    document.body.onresize = windowResizeHandler;
};

function windowResizeHandler() {
    InterfaceBuilder.resizeHistoryContainer();
}
