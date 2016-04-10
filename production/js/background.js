var $ = require('jquery');

var viewport = {
    width: $(window).width(),
    height: $(window).height()
};

// For various reasons, only part of the shapes div is visible. See background.scss.
// scale = 1 - (translateZ / perspective)
var shapesLayerScale = 2/3;
var shapesLayer = {
    width: viewport.width * shapesLayerScale,
    height: viewport.height * shapesLayerScale,
    x: viewport.width * (1 - shapesLayerScale) / 2,
    y: viewport.height * (1 - shapesLayerScale) / 2,
};

var makeTriangle = function makeTriangle() {
    var newTriangleElement = $('<div class="triangle"></div>');
    var x = shapesLayer.x + Math.floor(Math.random() * shapesLayer.width - 20);
    var y = shapesLayer.y + Math.floor(Math.random() * shapesLayer.height - 20);
    var deg = Math.floor(Math.random() * 4) * 30 + 15;

    newTriangleElement.css({
        'top': y + 'px',
        'left': x + 'px',
        'transform': 'rotate(' + deg + 'deg)'
    });

    $('.shapes').append(newTriangleElement);
};

$(function() {
    var numTriangles = Math.floor(Math.sqrt(shapesLayer.width * shapesLayer.height) / 100);

    for (var i = 0; i < numTriangles; i++) {
        makeTriangle();
    }
});
