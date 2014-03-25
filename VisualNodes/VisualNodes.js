"use strict";

function VisualNode () {
    this._drawBasic = function (cell, txt) {
        cell.innerHTML = txt;
    }
}

SimpleNode.prototype = new VisualNode();
function SimpleNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
    };

    var txt = "node";
}

FoldedNode.prototype = new VisualNode();
function FoldedNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
        cell.onclick = function() {
            alert("unfolded");
        };
    };

    var txt = "...";
}

LinkNode.prototype = new VisualNode();
function LinkNode() {
    this.drawIn = function (cell) {
        this._drawBasic(cell, txt);
    };

    var txt = "\\";
}