"use strict";

var CssUtils = {
    'elemHasClass' : function (elem, className) {
        return new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
    },

    'changeCssClass' : function (elem, oldCssClass, newCssClass) {
        var re = new RegExp("(^|\\s)(" + oldCssClass + ")(\\s|$)");
        var modifiedClassString = elem.className.replace(re, '$1'+newCssClass+'$3');
        elem.className = modifiedClassString;
    },

    'addCssClass' : function (elem, cssClass) {
        elem.className += (' ' + cssClass);
    },

    'removeCssClass' : function (elem, cssClass) {
        var classesStr = elem.className;
        var endIndex = classesStr.indexOf(cssClass);
        if(endIndex > -1) {
            if(endIndex != 0 && classesStr[endIndex - 1] === ' ') {
                endIndex = endIndex - 1;
            }
            elem.className = classesStr.substr(0, endIndex);
        }
    }
};