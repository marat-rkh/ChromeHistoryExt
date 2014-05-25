"use strict";

window.onload = function() {
    var interfaceBuilder = new InterfaceBuilder();
    var pageWrapper = DomElemsFactory.createPageWrapper();
    interfaceBuilder.setInterfaceWrapper(pageWrapper);
    interfaceBuilder.buildTitleForm();
    pageWrapper.appendChild(DomElemsFactory.createLoadingGif());
    document.body.appendChild(pageWrapper);
    interfaceBuilder.start();
};

window.onresize = function() {
    var histContainerHeight = window.innerHeight - InterfaceBuilder.SEARCH_FIELD_HEIGHT;
    var historyContainer = document.getElementById(InterfaceBuilder.HISTORY_CONTAINER_ID);
    historyContainer.setAttribute("style","height:" + histContainerHeight + "px");
};
