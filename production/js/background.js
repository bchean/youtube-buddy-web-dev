var $ = require('jquery');

var viewport = {
    width: $(window).width(),
    height: $(window).height()
};

// For various reasons, only part of the shapes div is visible. See index.scss.
// scale = 1 - (translateZ / perspective)
var shapesLayerScale = 3/5;
var shapesLayer = {
    width: viewport.width * shapesLayerScale,
    height: viewport.height * shapesLayerScale,
    x: viewport.width * (1 - shapesLayerScale) / 2,
    y: viewport.height * (1 - shapesLayerScale) / 2,
};

var makeTriangle = function makeTriangle(minY, maxY) {
    var newTriangleElement = $('<div class="triangle"></div>');
    var x = shapesLayer.x + randomInt(shapesLayer.width) - 20;
    var rangeY = maxY - minY;
    var y = minY + randomInt(rangeY) - 20;
    var deg = randomInt(4) * 30 + 15;

    newTriangleElement.css({
        'top': y + 'px',
        'left': x + 'px',
        'transform': 'rotate(' + deg + 'deg)'
    });

    $('.shapes').append(newTriangleElement);
};

var randomInt = function randomInt(max) {
    return Math.floor(Math.random() * max);
};

var makeTriangles = function makeTriangles(minY, maxY) {
    var rangeY = maxY - minY;
    var numTriangles = Math.floor(Math.sqrt(shapesLayer.width * rangeY) / 60);
    for (var i = 0; i < numTriangles; i++) {
        makeTriangle(minY, maxY);
    }
};

var enlargeShapesDiv = function enlargeShapesDiv() {
    var oldHeight = $('.shapes').height();
    var newHeight = $('.content').height();
    $('.shapes').css('height', newHeight + 'px');
    makeTriangles(oldHeight, newHeight);
};

$(function() {
    makeTriangles(shapesLayer.y, shapesLayer.height);

    enlargeShapesDiv();
    $(window).on('ytb_pingListLoad', enlargeShapesDiv);
});
