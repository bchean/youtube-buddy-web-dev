var express = require('express'),
    serveIndex = require('serve-index');

var app = express();
var PORT = 5000;

app.use(express.static('public'));
app.use('/', serveIndex('public', {icons: true}));

app.listen(PORT, function() {
    console.log('App started on port ' + PORT);
});
