var React = require('react'),
    ReactDOM = require('react-dom'),
    ListOfPingStat = require('prod-components').ListOfPingStat;

var MS_PER_DAY = 24*60*60*1000;
var now_ms = Date.now();
var oneDayAgo = new Date(now_ms - MS_PER_DAY).toISOString();
var oneWeekAgo = new Date(now_ms - 7*MS_PER_DAY).toISOString();

var REST_ENDPOINT = 'https://youtube-buddy.herokuapp.com/api/pings';

ReactDOM.render(
    <ListOfPingStat restEndpoint={REST_ENDPOINT}
                    sinceDateTime={oneDayAgo}
                    numPingsUpperBound={800} />,
    document.getElementById('pings-last-24-hrs'));

ReactDOM.render(
    <ListOfPingStat restEndpoint={REST_ENDPOINT}
                    sinceDateTime={oneWeekAgo}
                    numPingsUpperBound={5000} />,
    document.getElementById('pings-last-7-days'));
