function handleSearchAction() {
    var userInputStr = document.getElementById(InterfaceBuilder.searchFieldID).value;
    // search userInputStr using Chrome History API
    InterfaceBuilder.removeHistoryArea(document.body);
}