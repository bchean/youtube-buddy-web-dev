var express = require('express');

var app = express();
var PORT = 5000;

// Root directory serves static files.
app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('App started on port ' + PORT);
});
