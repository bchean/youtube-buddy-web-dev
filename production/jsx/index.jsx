var React = require('react'),
    ReactDOM = require('react-dom'),
    ListOfPingStat = require('prod-components').ListOfPingStat;

ReactDOM.render(
    <ListOfPingStat pingStatPropsList={[
        {
            numPings: 19,
            numPingsUpperBenchmark: 21,
            youtubeId: 'a',
            title: 'Lorem ipsum dolor',
            dateTimeLastPing: Date.now()
        },
        {
            numPings: 5,
            numPingsUpperBenchmark: 21,
            youtubeId: 'b',
            title: 'sit amet, consectetur adipiscing elit',
            dateTimeLastPing: Date.now()
        }]} />,
    document.getElementById('pings-last-24-hrs'));
