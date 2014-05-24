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
        var startIndex = classesStr.indexOf(cssClass);
        if(startIndex > -1) {
            var endIndex = classesStr.indexOf(' ', startIndex);
            if(startIndex != 0 && classesStr[startIndex - 1] === ' ') {
                startIndex = startIndex - 1;
            }
            var newClassesStr = classesStr.substr(0, startIndex);
            if(endIndex > -1) {
                newClassesStr += classesStr.substr(endIndex);
            }
            elem.className = newClassesStr;
        }
    }
};