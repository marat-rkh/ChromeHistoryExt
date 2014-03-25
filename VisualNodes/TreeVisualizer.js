"use strict";

function TreeVisualizer () {
    this.drawIn = function (tab, y0, x0, nodes) {
        for (var i = 0; i < nodes.length; i++, y0++, x0++) {
            var currentCell = tab.rows[y0].cells[x0];
            nodes[i].drawIn(currentCell);
        }
    };
}