var $ = require('jquery');

var getViewportWidth = function getViewportWidth() {
    return $(window).width();
};

var getViewportHeight = function getViewportHeight() {
    return $(window).height();
}

var makeTriangle = function makeTriangle() {
    var newTriangleElement = $('<div class="triangle"></div>');
    var x = Math.round(Math.random() * getViewportWidth() - 15);
    var y = Math.round(Math.random() * getViewportHeight() - 15);
    var z = Math.round(Math.random() * -10) - 1;
    var turns = Math.random();

    newTriangleElement.css({
        'top': y + 'px',
        'left': x + 'px',
        'z-index': z,
        'transform': 'rotate(' + turns + 'turn)'
    });

    $('.shapes').append(newTriangleElement);
};

var numTriangles = Math.round(Math.sqrt(getViewportWidth() * getViewportHeight()) / 100);

for (var i = 0; i < numTriangles; i++) {
    makeTriangle();
}
